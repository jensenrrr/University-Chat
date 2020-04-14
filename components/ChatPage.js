import React from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";

class ChatPage extends React.Component {
  state = {
    messages: [],
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
  on = (callback) =>
    firebase
      .database()
      .ref(
        "Chats/" +
          this.props.route.params.code +
          this.props.route.params.number +
          "/messages/"
      )
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  componentDidMount() {
    console.log(this.props);
    console.log(this.props.route.params.code + this.props.route.params.number);
    this.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
    /*
    firebase
      .database()
      .ref(
        "Chats/" +
          this.props.route.params.code +
          this.props.route.params.number +
          "/messages/"
      )
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        let messages = [];
        for (var msg in snapshot.val()) {
          console.log(msg);
          //messages.push(msg.message[0]);
        }
        this.setState({
          messages: messages,
        });
      });*/
  }
  onSend(messages) {
    //var messages = [];

    for (let i = 0; i < messages.length; i++) {
      console.log(messages[i]);
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      firebase
        .database()
        .ref(
          "Chats/" +
            this.props.route.params.code +
            this.props.route.params.number +
            "/messages/"
        )
        .push(message);
    }

    //console.log("Sent: " + message);
    /*
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));*/
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: firebase.auth().currentUser.uid,
          avatar: this.props.route.params.avatar,
          name: this.props.route.params.username,
        }}
      />
    );
  }
}

export default ChatPage;
