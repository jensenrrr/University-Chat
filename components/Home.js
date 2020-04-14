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
  };

  constructor(props) {
    super(props);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);
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
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ verticalAlign: "top", alignItems: "left" }}>
          <Button
            title="Go to Add Chat"
            onPress={() => navigation.navigate("Add")}
          />
        </View>
        {this.state.hasCourses ? (
          <View>
            {Object.keys(this.state.courses).map((chat, index) => (
              <View
                key={
                  this.state.courses[chat].course.course_code +
                  this.state.courses[chat].course.course_number
                }
              >
                <Text>
                  {chat}
                  {this.state.courses[chat].course.course_code}
                </Text>
                <Button
                  title="Go"
                  onPress={() =>
                    navigation.navigate("ChatPage", {
                      name: this.state.courses[chat].course.course_name,
                      number: this.state.courses[chat].course.course_number,
                      code: this.state.courses[chat].course.course_code,
                    })
                  }
                />
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

        <Text>Home Screen</Text>

        <Button
          title="Run Create Chat Script"
          onPress={() => this.ChatCreateFunction()}
        />
        <Text>sssss</Text>
        <Button
          title="Settings"
          onPress={() =>
            navigation.navigate("Settings", {
              email: this.state.email,
              updateProfilePicture: this.updateProfilePicture,
            })
          }
        />
        <Text>ssss</Text>
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
