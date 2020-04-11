import React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to OS"
        onPress={() => navigation.navigate("ChatPage", { name: "OS" })}
      />
      <Text>sssss</Text>
      <Button
        title="Go to AI"
        onPress={() => navigation.navigate("ChatPage", { name: "AI" })}
      />
      <Text>sssss</Text>
      <Button
        title="Go to HCI"
        onPress={() => navigation.navigate("ChatPage", { name: "HCI" })}
      />
    </View>
  );
}

export default Home;
