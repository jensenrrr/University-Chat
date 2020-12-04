import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { getUserData, signOut } from "../../redux/actions";
import { Icon, Header } from "react-native-elements";
import SubscribedCourses from "./SubscribedCourses";
import SubscribedGroupChats from "./SubscribedGroupChats";

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
    borderColor: "#9F84BD",
    borderBottomWidth: 2,
    marginTop: "1%",
  },
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.account);

  useEffect(() => {
    if (!userData || !userData.firstName) {
      getUserData(dispatch);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        rightComponent={
          <TouchableOpacity
            style={{
              marginRight: 0,
              backgroundColor: "#9F84BD",
              height: 40,
              width: 60,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => signOut(dispatch)}
          >
            <Text style={{ fontSize: 16, color: "#fff" }}>Sign out</Text>
          </TouchableOpacity>
        }
        centerComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Add")}>
            <Text style={styles.buttonText}> Add Chat </Text>
          </TouchableOpacity>
        }
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Settings", {
                email: userData.email,
                name: userData.name,
                updateProfilePicture: function meme() {
                  console.log("unimplemented");
                },
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
      <SubscribedCourses navigation={navigation} courses={userData.courses} />
      <SubscribedGroupChats
        dms={userData.dms}
        navigation={navigation}
        id={firebase.auth().currentUser.uid}
      />
    </View>
  );
};

export default Home;
