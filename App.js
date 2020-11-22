import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import firebaseConfig from "./config/firebase";
import { Provider } from "react-redux";
import { createStore } from "redux";
import accountReducer from "./redux/reducer";
import GettingStarted from "./components/Account/GettingStarted";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import Home from "./components/HomePage/Home";
import CourseChat from "./components/Chat/CourseChat";
import ChatHeader from "./components/Chat/ChatHeader";
import Settings from "./components/Account/Settings";
import UpdateProfilePicture from "./components/Account/UpdateProfilePicture";
import UpdatePassword from "./components/Account/UpdatePassword";
import Add from "./components/Courses/Add";
import DM from "./components/Chat/DM";
import Pins from "./components/Chat/Pins";

const Stack = createStackNavigator();
const store = createStore(
  accountReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const MyTheme = {
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "#C09BD8",
    text: "rgb(242, 242, 242)",
    border: "transparent",
  },
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) setUserInfo(true);
      else setUserInfo(false);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {userInfo ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Getting Started" component={GettingStarted} />
              <Stack.Screen
                name="CourseChat"
                component={CourseChat}
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
    </Provider>
  );
};

export default App;
