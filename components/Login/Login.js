import React from "react";
import { Image, StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import LoginForm from "./LoginForm";


function Login({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Image source = {'./UniversityChat.png'} style ={styles.logo} />
        <Text style={styles.title}>University Chat</Text>
        <LoginForm navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    flex: 1,
    width: "100%",
    marginTop: "10%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  title: {
    color: "#9F84BD",
    fontSize: 20,
    fontWeight: "100",
    alignSelf: "center",
    
  },
});

export default Login;
