import React, { Component } from "react";
import { Button, View, Text } from "react-native";
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
  };

  componentDidMount() {
    const { email } = firebase.auth().currentUser;
    this.setState({ email });
    //console.log(firebase.auth().currentUser.uid);
    firebase
      .database()
      .ref("/Users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val().courses);
        //let carray = [];
        //for (var i in snapshot.val().courses) carray.push(i.course);
        //console.log(carray);
        this.setState({
          courses: snapshot.val().courses,
        });

        console.log(this.state.courses["Japanese Folklore"].course.course_name);
      });
  }

  ChatCreateFunction() {
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
        <div style={{ verticalAlign: top, alignItems: "left" }}>
          <Button
            title="Go to Add Chat"
            onPress={() => navigation.navigate("Add")}
          />
        </div>
        <div>
          {Object.keys(this.state.courses).map((chat, index) => (
            <div
              key={
                this.state.courses[chat].course.course_code +
                this.state.courses[chat].course.course_number
              }
            >
              {chat}
              {this.state.courses[chat].course.course_code}
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
            </div>
          ))}
        </div>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Hello, {this.state.email}
        </Text>
        <Text>Home Screen</Text>
        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate("ChatSelection")}
        />
        <Text>sssss</Text>
        <Button
          title="Run Create Chat Script"
          onPress={() => this.ChatCreateFunction()}
        />
        <Text>sssss</Text>
        <Button title="Sign Out" onPress={() => this.signOutUser()} />
      </View>
    );
  }
}
