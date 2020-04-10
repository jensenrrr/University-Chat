import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import LoginForm from "./LoginForm";

function Login({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Text style={styles.title}>University Chat</Text>
        <LoginForm navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
  },
  title: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "700",
    alignSelf: "center",
    paddingTop: 150,
  },
});

export default Login;
