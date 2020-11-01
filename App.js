import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import { Icon } from 'react-native-elements';
import Home from "./components/Home";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
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
import firebaseConfig from "./config/firebase";
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
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="ChatPage"
                component={ChatPage}
                options={({ navigation, route }) => ({
                  headerTitle: () => {
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

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
