import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat, Bubble, MesssageText } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";

class DM extends React.Component {
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
        "Users/" +
          this.props.route.params.myid +
          "/DMs/" +
          this.props.route.params.theirid +
          "/Messages"
      )
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  componentDidMount() {
    console.log(this.props);
    this.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
    const hello = firebase
      .database()
      .ref(
        "Users/" +
          this.props.route.params.myid +
          "/DMs/" +
          this.props.route.params.theirid
      )
      .update({ name: this.props.route.params.name });

    hello.then(() => {
      firebase
        .database()
        .ref(
          "Users/" +
            this.props.route.params.theirid +
            "/DMs/" +
            this.props.route.params.myid
        )
        .update({ name: this.props.route.params.ourname });
    });
  }

  onSend(messages) {
    var meme = [this.props.route.params.myid, this.props.route.params.theirid];
    meme.sort();
    console.log(messages);
    for (let i = 0; i < messages.length; i++) {
      console.log(messages[i]);
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      const hello = firebase
        .database()
        .ref(
          "Users/" +
            this.props.route.params.myid +
            "/DMs/" +
            this.props.route.params.theirid +
            "/Messages"
        )
        .push(message);

      hello.then(() => {
        firebase
          .database()
          .ref(
            "Users/" +
              this.props.route.params.theirid +
              "/DMs/" +
              this.props.route.params.myid +
              "/Messages/"
          )
          .push(message);
      });
    }
  }
 /* renderTime(props) {
    return (
      <Text
      {...props}
        {...this.timestamp}
  
       />
    );
  }*/
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle = {{
          left: {
              backgroundColor: '#DCDCDC',
          },
          right: {
            backgroundColor: '#C09BD8',
          }
  
    }
        }
       />
    );
  }

  render() {
    return (
      <GiftedChat
        renderBubble = {this.renderBubble.bind(this)}
        messages={this.state.messages}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: firebase.auth().currentUser.uid,
          avatar: this.props.route.params.avatar,
          name: this.props.route.params.ourname,
        }}
        //renderTime = {this.renderTime.bind(this)}
      />
    );
  }
}



export default DM;
