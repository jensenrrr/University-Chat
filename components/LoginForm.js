import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
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
            returnKeyType="go"
            style={styles.input}
            ref={(input) => {
              this.passwordInput = input;
            }}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    alignItems: "stretch",
    height: 40,
    minWidth: 350,
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
    marginTop: 100,
    paddingVertical: 10,
    borderRadius: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "500",
  },
});
