import React, { Component } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

export default class UpdateProfilePicutre extends Component {
  state = {
    newProfilePicture: "",
  };

  handleUpdate = () => {
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

    const db = firebase.database();
    const navigation = this.props.navigation;
    const userRef = db.ref("Users/" + firebase.auth().currentUser.uid);
    userRef.update({ profilePicture: this.state.newProfilePicture });
    this.props.route.params.updateParentProfilePicture();
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter Profile Picutre URL </Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="profile picture url"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              onChangeText={(newProfilePicture) =>
                this.setState({ newProfilePicture })
              }
              value={this.state.newProfilePicture}
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleUpdate}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
  },
  content: {
    paddingTop: 200,
    marginHorizontal: 30,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    marginBottom: 30,
    borderRadius: 40,
    color: "#FFF",
    paddingHorizontal: 15,
  },
  inputView: {
    backgroundColor: "rgba(108, 92, 231,0.6)",
    height: 40,
    borderRadius: 40,
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: "#6c5ce7",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingVertical: 10,
    borderRadius: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "500",
  },
});
