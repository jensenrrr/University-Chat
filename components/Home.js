import React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Text>sssss</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Text>sssss</Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate("ChatSelection")}
      />
       <Text>sssss</Text>
       <Button
        title="Go to Add Chat"
        onPress={() => navigation.navigate("Add")}
      />
    </View>
  );
}

export default Home;
