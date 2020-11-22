import React, { useState, useRef } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const RegisterForm = ({ navigation, ...props }) => {
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = async () => {
    const newUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password);
    await firebase
      .database()
      .ref("Users/" + newUser.user.uid)
      .set({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        profilePicture:
          "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png",
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.form}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => lastNameInput.current.focus()}
            onChangeText={(firstName) =>
              setUserData({ ...userData, firstName: firstName })
            }
            value={userData.firstName}
            autoCorrect={false}
            style={styles.input}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Last Name"
            returnKeyType="next"
            onSubmitEditing={() => emailInput.current.focus()}
            onChangeText={(lastName) =>
              setUserData({ ...userData, lastName: lastName })
            }
            value={userData.lastName}
            autoCorrect={false}
            style={styles.input}
            ref={lastNameInput}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current.focus()}
            onChangeText={(email) => setUserData({ ...userData, email: email })}
            value={userData.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            ref={emailInput}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) =>
              setUserData({ ...userData, password: password })
            }
            value={userData.password}
            returnKeyType="go"
            style={styles.input}
            ref={passwordInput}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleRegister}
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
};

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
