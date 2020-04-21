import React from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";

class DM extends React.Component {
  state = {
    messages: [],
  };

  parse = (snapshot) => {
    //console.log(snapshot.val());
    var { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    function chunk(str, n) {
      var ret = [];
      var i;
      var len;

      for (i = 0, len = str.length; i < len; i += n) {
        ret.push(str.substr(i, n));
      }

      return ret;
    }
    var temp = chunk(text, 30).join(String.fromCharCode(10));
    text = temp;
    const message = {
      _id,
      createdAt,
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
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      console.log(message);
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
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        renderUsernameOnMessage={false}
        renderAvatarOnTop={true}
        onSend={(messages) => this.onSend(messages)}
        multiline={false}
        user={{
          _id: firebase.auth().currentUser.uid,
          avatar: this.props.route.params.avatar,
          name: this.props.route.params.ourname,
        }}
      />
    );
  }
}

export default DM;
