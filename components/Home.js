import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default class Home extends Component {
  state = {
    email: "",
    displayName: "",
    classes: "",
  };

  componentDidMount() {
    const { email } = firebase.auth().currentUser;
    this.setState({ email });
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
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Hello, {this.state.email}
        </Text>
        <Text>Home Screen</Text>
        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate("ChatSelection")}
        />
        <Text>sssss</Text>

        <Text>sssss</Text>
        <Button title="Sign Out" onPress={() => this.signOutUser()} />
      </View>
    );
  }
}
