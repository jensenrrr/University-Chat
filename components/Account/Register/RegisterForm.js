import React, { Component } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    errorMessage: null,
  };

  handleRegister = () => {
    const { email, password, firstName, lastName } = this.state;
    // Default profile picture, user can update in settings
    const profilePicture =
      "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png";
    var courses = [];
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        var strang = "Users/" + user.user.uid;
        console.log(strang);
        firebase
          .database()
          .ref(strang)
          .set({
            firstName,
            lastName,
            email,
            courses,
            profilePicture,
          })
          .then((data) => {
            //success callback
            console.log("data ", data);
          })
          .catch((error) => {
            //error callback
            console.log("error ", error);
          });
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="First Name"
              returnKeyType="next"
              onSubmitEditing={() => this.lastNameInput.focus()}
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.firstName}
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Last Name"
              returnKeyType="next"
              onSubmitEditing={() => this.emailInput.focus()}
              onChangeText={(lastName) => this.setState({ lastName })}
              value={this.state.lastName}
              autoCorrect={false}
              style={styles.input}
              ref={(input) => {
                this.lastNameInput = input;
              }}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={(input) => {
                this.emailInput = input;
              }}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              returnKeyType="go"
              style={styles.input}
              ref={(input) => {
                this.passwordInput = input;
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logInText}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#9F84BD" }}>
              Already have an account? Log In!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RegisterForm;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 30,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderColor: "#9F84BD",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    fontSize: 20,
  },
  logInText: {
    height: 40,
    marginTop: 16,
    alignSelf: "center",
  },
  error: {
    color: "#C09BD8",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
});
