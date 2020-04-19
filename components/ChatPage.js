import React from "react";
import { View, Text } from "react-native";
import { GiftedChat, Actions } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";
import CustomActions from "./CustomActions";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingText: null,
      isLoadingEarlier: false,
    };

    //this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onPressAvatar = this.onPressAvatar.bind(this);

    //this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    //this.renderBubble = this.renderBubble.bind(this);
    //this.renderFooter = this.renderFooter.bind(this);
  }
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
    this.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  renderCustomActions(props) {
    //return <CustomActions {...props} />;

    const options = {
      "Action 1": (props) => {
        alert("option 1");
      },
      "Action 2": (props) => {
        alert("option 2");
      },
      Cancel: () => {},
    };
    return <Actions {...props} options={options} />;
  }
  onPressAvatar(user) {
    const { navigation } = this.props;

    console.log("go to dm for" + user.name);
    navigation.navigate("DirectMessage", {
      myid: firebase.auth().currentUser.uid,
      theirid: user._id,
      name: user.name,
      avatar: this.props.route.params.avatar,
      username: this.props.route.params.username,
    });
  }
  onPressActionButton() {
    console.log("action button");
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage);
    } else {
      if (this.props.currentMessage.text) {
        const options = ["Copy Text", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(this.props.currentMessage.text);
                break;
            }
          }
        );
      }
    }
  }
  onSend(messages) {
    for (let i = 0; i < messages.length; i++) {
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
        renderActions={this.renderCustomActions}
        onPressAvatar={(user) => this.onPressAvatar(user)}
      />
    );
  }
}

export default ChatPage;
