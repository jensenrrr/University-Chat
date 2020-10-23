import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import { Icon } from 'react-native-elements';
import Home from "./components/Home";
import Login from "./components/Account/Login/Login";
import Register from "./components/Register/Register";
import ChatPage from "./components/Chat/ChatPage";
import ChatSelection from "./components/Chat/ChatSelection";
import ChatHeader from "./components/Chat/ChatHeader";
import Settings from "./components/Account/Settings";
import UpdateProfilePicture from "./components/Account/UpdateProfilePicture";
import UpdatePassword from "./components/Account/UpdatePassword";
import Add from "./components/Courses/Add";
import DM from "./components/Chat/DM";
import { StyleSheet, Button, Text, View } from "react-native";
import Pins from "./components/Chat/Pins";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const MyTheme = {
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: '#C09BD8',
    text: 'rgb(242, 242, 242)',
    border: 'transparent',
  },
};
export default class App extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLoggedIn: user ? true : false });
    });
  }

  LogoTitle() {
    return;
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator >
          {this.state.isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: "Welcome",
                }}
              />
              <Stack.Screen
                name="ChatPage"
                component={ChatPage}
                // options={({ route }) => ({ title: route.params.name })}
                options={({ navigation, route }) => ({
                  headerTitle: () => {
                    console.log(route);
                    return (
                      <ChatHeader
                        code={route.params.code}
                        number={route.params.number}
                        name={route.params.name}
                        navigation={navigation}
                      />
                    );
                  },
                })}
                /*
                options={({ navigation, route }) => ({
                  headerTitle: () => (
                    <PinModal
                      code={route.params.code}
                      number={route.params.number}
                      name={route.params.name}
                    />
                  ),
                })}*/
              />
              <Stack.Screen
                name="DirectMessage"
                component={DM}
                options={({ route }) => ({ title: route.params.name })}
              />
              <Stack.Screen
                name="Pins"
                component={Pins}
                options={({ route }) => ({ title: route.params.name })}
              />
              <Stack.Screen name="ChatSelection" component={ChatSelection} />
              <Stack.Screen name="Add" component={Add} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen
                name="Update Profile Picture"
                component={UpdateProfilePicture}
              />
              <Stack.Screen name="Update Password" component={UpdatePassword} />
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
    backgroundColor: "#a29bfe",
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
