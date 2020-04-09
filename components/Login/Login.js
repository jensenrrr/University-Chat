import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import LoginForm from "./LoginForm";

function Login({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <LoginForm />
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

export default Login;
