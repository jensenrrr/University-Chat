import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";

class Pins extends React.Component {
  state = {
    messages: [],
    modalVisible: true,
  };

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    console.log(message);
    return message;
  };
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  on = (callback) => {
    firebase
      .database()
      .ref(
        "Chats/" +
          this.props.route.params.code +
          this.props.route.params.number +
          "/PinnedMessages/"
      )
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  setModalVisible() {
    this.setState({
      modalVisible: !modalVisible,
    });
  }
  componentDidMount() {
    console.log(this.props);
    firebase
      .database()
      .ref(
        "Chats/" +
          this.props.route.params.code +
          this.props.route.params.number +
          "/PinnedMessages/"
      )
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
      });
    this.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  renderInputToolbar() {
    return null;
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        renderInputToolbar={this.renderInputToolbar}
        user={{
          _id: "1",
          avatar: "x",
          name: "N/A",
        }}
      />
    );
  }
}

export default Pins;
