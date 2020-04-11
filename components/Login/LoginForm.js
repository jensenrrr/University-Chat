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
            onPress={this.handleLogin}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#FFF" }}>
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
    flex: 1,
    paddingTop: 20,
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
