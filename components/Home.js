import React, { Component } from "react";
import { Button, View, Text, Image } from "react-native";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import data from "./data/courses.json";
export default class Home extends Component {
  state = {
    email: "",
    displayName: "",
    classes: "",
    courses: [],
    hasCourses: false,
    profilePicture: "",
    name: "",
  };

  constructor(props) {
    super(props);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);
  }

  navChatBar({ navigation }) {
    const [count, setCount] = React.useState(0);

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
        ),
      });
    }, [navigation, setCount]);
    return <Text>Count: {count}</Text>;
  }

  componentDidMount() {
    const { email } = firebase.auth().currentUser;
    this.setState({ email });
    //console.log(firebase.auth().currentUser.uid);
    firebase
      .database()
      .ref("/Users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val().courses != undefined) {
          this.setState({
            hasCourses: true,
          });
        }
        if (snapshot.val().profilePicture != undefined) {
          this.setState({ profilePicture: snapshot.val().profilePicture });
        } else {
          this.setState({
            profilePicture: null,
          });
        }
        if (
          snapshot.val().firstName != undefined &&
          snapshot.val().lastName != undefined
        ) {
          this.setState({
            name:
              snapshot.val().firstName +
              " " +
              snapshot.val().lastName.charAt(0) +
              ".",
          });
        }
        //let carray = [];
        //for (var i in snapshot.val().courses) carray.push(i.course);
        //console.log(carray);
        this.setState({
          courses: snapshot.val().courses,
        });

        //console.log(this.state.courses["Japanese Folklore"].course.course_name);
      });
    console.log(Object.keys(this.state.courses).length);
    console.log(this.state);
  }

  updateProfilePicture = (url) => {
    this.setState({ profilePicture: url });
  };

  ChatCreateFunction() {
    /*
    firebase
      .database()
      .ref("/Chats/" + "JPT4502")
      .set({
        name: "Japanese Folklore",
        code: "JPT",
        number: "4502",
      });
*/

    data.forEach((chat) => {
      firebase
        .database()
        .ref("/Chats/" + chat.course_code + chat.course_number)
        .set({
          name: chat.course_name,
          code: chat.course_code,
          number: chat.course_number,
        });
    });
  }
  signOutUser = () => {
    firebase.auth().signOut();
  };
  // justifyContent: "center"
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#a29bfe" }}
      >
        <View style={{ verticalAlign: "top", alignItems: "left" }}>
          <div style={{ marginTop: "10%" }}>
            <Button
              title="Add Chat"
              color="green"
              onPress={() => navigation.navigate("Add")}
            />
          </div>
        </View>
        {this.state.hasCourses ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            {Object.keys(this.state.courses).map((chat, index) => (
              <View
                key={
                  this.state.courses[chat].course.course_code +
                  this.state.courses[chat].course.course_number
                }
              >
                <div
                  style={{
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "solid",
                    width: "80%",
                    borderRadius: "10%",
                    marginTop: "5%",
                    marginLeft: "10%",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                  onClick={() =>
                    navigation.navigate("ChatPage", {
                      name: this.state.courses[chat].course.course_name,
                      number: this.state.courses[chat].course.course_number,
                      code: this.state.courses[chat].course.course_code,
                      avatar: this.state.profilePicture,
                      username: this.state.name,
                    })
                  }
                >
                  <div style={{ display: "inline", justifyContent: "left" }}>
                    <Text>{chat}</Text>
                  </div>
                </div>
              </View>
            ))}
          </View>
        ) : (
          <Text>No classes added.</Text>
        )}
        <View style={styles.userProfile}>
          <Image
            style={styles.userPicture}
            source={{ uri: this.state.profilePicture }}
          />
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            {this.state.email}
          </Text>
        </View>
        <div style={{ marginTop: "1%" }}></div>
        <Button
          title="Run Create Chat Script"
          onPress={() => this.ChatCreateFunction()}
        />
        <div style={{ marginTop: "1%" }}></div>
        <Button
          title="Settings"
          onPress={() =>
            navigation.navigate("Settings", {
              email: this.state.email,
              updateProfilePicture: this.updateProfilePicture,
            })
          }
        />

        <Button title="Sign Out" onPress={() => this.signOutUser()} />
      </View>
    );
  }
}

const styles = {
  userProfile: {},
  userPicture: {
    width: 70,
    height: 70,
    justifyContent: "center",
    borderRadius: 50,
  },
};
