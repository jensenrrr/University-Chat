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

export default class UpdatePassword extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    errorMessage: null,
  };

  handleUpdate = () => {
    const newPassword = this.state.newPassword;
    const confirmPassword = this.state.confirmPassword;
    const navigation = this.props.navigation;
    const user = firebase.auth().currentUser;

    // Check if password is >= 6 characters
    if (this.passwordLengthCheck(newPassword)) {
      // Check if passwords match
      if (this.passwordsMatch(newPassword, confirmPassword)) {
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Successfully updated password.");
            navigation.goBack();
          })
          .catch((error) => this.setState({ errorMessage: error.message }));
      } else {
        this.setState({
          errorMessage: "Passwords do not match. Re-enter passwords.",
        });
      }
    } else {
      this.setState({
        errorMessage: "Password must be greater than 5 characters.",
      });
    }
  };

  passwordsMatch(password1, password2) {
    return password1 == password2;
  }

  passwordLengthCheck(password) {
    return password.length >= 6;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>
          <TextInput
            placeholder="new password"
            placeholderTextColor="#C09BD8"
            secureTextEntry
            onChangeText={(newPassword) => this.setState({ newPassword })}
            value={this.state.newPassword}
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            placeholder="confirm password"
            placeholderTextColor="#C09BD8"
            secureTextEntry
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            value={this.state.confirmPassword}
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
    paddingTop: 150,
    marginHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center",
    marginVertical: 20,
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
