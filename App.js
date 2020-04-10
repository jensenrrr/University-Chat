import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import Home from "./components/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ChatPage from "./components/ChatPage";
import ChatSelection from "./components/ChatSelection";
import Add from "./components/Add";

import { StyleSheet, Text, View } from "react-native";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLoggedIn: user ? true : false });
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "Welcome" }}
              />
              <Stack.Screen
                name="ChatPage"
                component={ChatPage}
                options={({ route }) => ({ title: route.params.chat })}
              />
              <Stack.Screen name="ChatSelection" component={ChatSelection} />
              <Stack.Screen name="Add" component={Add} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyA_39e6SCijA5UWOrLViU_169i7DCpw1iE",
  authDomain: "universitychat-9a9c8.firebaseapp.com",
  databaseURL: "https://universitychat-9a9c8.firebaseio.com",
  projectId: "universitychat-9a9c8",
  storageBucket: "universitychat-9a9c8.appspot.com",
  messagingSenderId: "378196588409",
  appId: "1:378196588409:web:1916dfb21986d052f061a8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
