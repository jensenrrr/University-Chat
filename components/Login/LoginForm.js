import React, { Component } from "react";
import firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
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
            onPress={this.handleLogin}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#9F84BD" }}>
              Don't have an account? Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
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
    fontSize:20,
  },
  signUpText: {
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
