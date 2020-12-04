import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { signOut } from "../../redux/actions";

export default class Settings extends Component {
  state = {
    profilePicture: "",
  };

  constructor(props) {
    super(props);
    this.getUserProfilePicture = this.getUserProfilePicture.bind(this);
  }

  componentDidMount() {
    this.getUserProfilePicture();
  }

  getUserProfilePicture = () => {
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
    firebase
      .database()
      .ref("/Users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val().profilePicture != undefined) {
          this.setState({ profilePicture: snapshot.val().profilePicture });
          this.props.route.params.updateProfilePicture(
            snapshot.val().profilePicture
          );
        }
      });
  };

  render() {
    const navigation = this.props.navigation;
    let { email } = this.props.route.params;
    let { name } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: this.state.profilePicture }}
            style={styles.userPicture}
          />
          <Text style={styles.userEmail}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              navigation.navigate("Update Profile Picture", {
                updateParentProfilePicture: this.getUserProfilePicture,
              })
            }
          >
            <Text style={styles.buttonText}>Update Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Update Password")}
          >
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={signOut}
          >
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingTop: 60,
    marginHorizontal: 30,
  },
  userPicture: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50,
  },
  userEmail: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: "#C09BD8",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "500",
  },
});
