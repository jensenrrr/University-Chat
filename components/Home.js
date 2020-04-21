import React, { Component } from "react";
import { Button, View, Text, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import data from "./data/courses.json";
import { Icon, Header } from "react-native-elements";

export default class Home extends Component {
  state = {
    email: "",
    displayName: "",
    classes: "",
    courses: [],
    DMs: [],
    hasCourses: false,
    profilePicture: "",
    name: "",
    errorMessage: null,
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
      .on("value", (snapshot) => {
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
        if (snapshot.val().courses != undefined) {
          this.setState({
            courses: snapshot.val().courses,
          });
        }
        if (snapshot.val().DMs != undefined) {
          this.setState({
            DMs: snapshot.val().DMs,
          });
        }
      });

    //let carray = [];
    //for (var i in snapshot.val().courses) carray.push(i.course);
    //console.log(carray);

    //console.log(this.state.courses["Japanese Folklore"].course.course_name);
    console.log(Object.keys(this.state.courses).length);
    console.log(this.state);

    /*
    firebase
      .database()
      .ref("/Users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
      });*/
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
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    });
  }
  signOutUser = () => {
    firebase.auth().signOut();
  };
  // justifyContent: "center"
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          leftComponent={
            <TouchableOpacity>
              <Icon name="menu" color="#fff" />
            </TouchableOpacity>
          }
          centerComponent={
            <TouchableOpacity onPress={() => navigation.navigate("Add")}>
              <Text style={styles.buttonText}> Add Chat </Text>
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Settings", {
                  email: this.state.email,
                  updateProfilePicture: this.updateProfilePicture,
                })
              }
            >
              <Icon name="settings" color="#fff" />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: "#9F84BD",
          }}
        />
        <View style={{ verticalAlign: "top", alignItems: "center" }}></View>
        {this.state.hasCourses ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                color: "#9F84BD",
                fontWeight: "600",
                marginTop: "1%",
                marginBottom: "2%",
                textAlign: "center",
                borderColor: "#9F84BD",
                borderBottomWidth: 1,
              }}
            >
              Course Chats
            </Text>
            {Object.keys(this.state.courses).map((chat, index) => (
              <View
                key={
                  this.state.courses[chat].course.course_code +
                  this.state.courses[chat].course.course_number
                }
              >
                <TouchableOpacity
                  style={styles.courseContainer}
                  onPress={() =>
                    navigation.navigate("ChatPage", {
                      name: this.state.courses[chat].course.course_name,
                      number: this.state.courses[chat].course.course_number,
                      code: this.state.courses[chat].course.course_code,
                      avatar: this.state.profilePicture,
                      username: this.state.name,
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        backgroundColor: "#9F84BD",
                        borderRadius: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        marginBottom: "2%",
                        marginRight: "1%",
                        marginLeft: "1%",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>
                        {this.state.courses[chat].course.course_code}
                      </Text>
                    </View>

                    <Text style={{}}>
                      {this.state.courses[chat].course.course_code}
                      {this.state.courses[chat].course.course_number} - {chat}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No classes added.</Text>
        )}
        <View style={styles.userProfile}></View>
        <View>
          <Text
            style={{
              justifyContent: "center",
              color: "#9F84BD",
              fontWeight: "600",
              marginTop: "1%",
              marginBottom: "2%",
              textAlign: "center",
              borderColor: "#9F84BD",
              borderBottomWidth: 1,
            }}
          >
            Direct Messages
          </Text>
        </View>
        {Object.keys(this.state.DMs).map((chat, index) => (
          <View key={chat}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DirectMessage", {
                  name: this.state.DMs[chat].name,
                  theirid: chat,
                  avatar: this.state.profilePicture,
                  ourname: this.state.name,
                  myid: firebase.auth().currentUser.uid,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#9F84BD",
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    marginBottom: "2%",
                    marginRight: "1%",
                    marginLeft: "1%",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    {this.state.DMs[chat].name[0]}
                  </Text>
                </View>
                <Text style={{}}>{this.state.DMs[chat].name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "500",
    fontSize: 20,
  },
  courseContainer: {
    fontWeight: "500",
    borderColor: "#9F84BD",
    borderBottomWidth: 2,
    color: "#9F84BD",
    marginTop: "1%",
  },
};
