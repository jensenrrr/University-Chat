import React from "react";
import { View, Text } from "react-native";
import { GiftedChat, Actions } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";
import CustomActions from "./CustomActions";

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
    this.onLongPress = this.onLongPress.bind(this);
    //this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    //this.renderBubble = this.renderBubble.bind(this);
    //this.renderFooter = this.renderFooter.bind(this);
  }
  parse = (snapshot) => {
    console.log(snapshot.val());
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);

    const message = {
      _id,
      createdAt,
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
    const options = {
      "Action 1": (props) => {
        alert("option 1");
      },
      "Action 2": (props) => {
        alert("option 2");
      },
      Cancel: () => {},
    };
    //return <Actions {...props} options={options} />;
  }
  onPressAvatar(user) {
    console.log("go to dm for" + user.name);
    const { navigation } = this.props;

    navigation.navigate("DirectMessage", {
      myid: firebase.auth().currentUser.uid,
      theirid: user._id,
      name: user.name,
    });
  }
  renderActions() {
    console.log("meme");
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
      console.log(message);
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
  onLongPress(context, message) {
    console.log(context, message);
    if (message.text) {
      const options = ["Copy Text", "Pin Message", "Cancel"];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              break;
            case 1:
              firebase
                .database()
                .ref(
                  "Chats/" +
                    this.props.route.params.code +
                    this.props.route.params.number +
                    "/PinnedMessages/"
                )
                .push(message);
              break;
          }
        }
      );
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
        onLongPress={this.onLongPress}
      />
    );
  }
}

export default ChatPage;
