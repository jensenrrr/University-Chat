import React from "react";
import { Image, StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import LoginForm from "./LoginForm";


function Login({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Image style = {styles.logo} source={require('./UniversityChat.png')}/>
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
    
    height:100,
    width: 100,
    
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
