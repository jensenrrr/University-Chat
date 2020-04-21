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
          <TextInput
            placeholder="profile picture url"
            placeholderTextColor="#C09BD8"
            onChangeText={(newProfilePicture) =>
              this.setState({ newProfilePicture })
            }
            value={this.state.newProfilePicture}
            autoCorrect={false}
            style={styles.input}
          />
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
    backgroundColor: "#fff",
  },
  content: {
    paddingTop: 250,
    marginHorizontal: 30,
  },
  input: {
    height: 40,
    marginBottom: 30,
    borderColor: "#9F84BD",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    backgroundColor: "#C09BD8",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "500",
  },
});
