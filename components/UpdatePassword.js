import React, { Component } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";

export default class UpdatePassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Update Password</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
  },
  content: {
    paddingTop: 60,
    marginHorizontal: 30,
  },
});
