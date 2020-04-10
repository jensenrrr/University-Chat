import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import RegisterForm from "./RegisterForm";

function Register({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <RegisterForm navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
  },
});

export default Register;
