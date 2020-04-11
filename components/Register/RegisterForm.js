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

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));

    firebase
      .database()
      .ref("Users/")
      .set({
        firstName,
        lastName,
        email,
      })
      .then((data) => {
        //success callback
        console.log("data ", data);
      })
      .catch((error) => {
        //error callback
        console.log("error ", error);
      });
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
              placeholder="first name"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
              placeholder="last name"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
              placeholder="email"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
              placeholder="password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
            <Text style={{ color: "#FFF" }}>
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
  container: {
    paddingTop: 100,
  },
  form: {
    marginHorizontal: 30,
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
  logInText: {
    height: 40,
    marginTop: 16,
    alignSelf: "center",
  },
  error: {
    color: "#fff",
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
