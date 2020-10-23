import React from "react";
import { View, Text, Platform } from "react-native";
import { GiftedChat, Actions, Bubble } from "react-native-gifted-chat"; // 0.3.0
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import CustomActions from "./CustomActions";

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      image: "",
      typingText: null,
      isLoadingEarlier: false,
    };

    //this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onPressAvatar = this.onPressAvatar.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    //this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.selectImage = this.selectImage.bind(this);
    //this.renderBubble = this.renderBubble.bind(this);
    //this.renderFooter = this.renderFooter.bind(this);
  }
  parse = (snapshot) => {
    //console.log(snapshot.val());
    var { timestamp: numberStamp, text, user, image } = snapshot.val();
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
      image,
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
    this.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  renderCustomActions(props) {
    const options = {
      "Send Image": (props) => {
        this.selectImage(props);
      },
      Cancel: () => {},
    };
    return <Actions {...props} options={options} />;
  }

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  selectImage = async (props) => {
    this.getPermissionAsync();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const imageName = result.uri.split("/").pop();
        this.uploadImage(result.uri, imageName)
          .then(() => {
            firebase
              .storage()
              .ref("images/" + imageName)
              .getDownloadURL()
              .then((url) => {
                this.setState({ image: url });
                const message = [
                  {
                    text: "",
                    user: props.user,
                  },
                ];
                this.onSend(message);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (E) {
      console.log(E);
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return storageRef.put(blob);
  };

  onPressAvatar(user) {
    // console.log("go to dm for" + user.name);
    const { navigation } = this.props;

    navigation.navigate("DirectMessage", {
      myid: firebase.auth().currentUser.uid,
      theirid: user._id,
      name: user.name,
      ourname: this.props.route.params.username,
      avatar: this.props.route.params.avatar,
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
        image: this.state.image,
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
        .push(message)
        .then(() => this.setState({ image: "" }));
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

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#DCDCDC",
          },
          right: {
            backgroundColor: "#C09BD8",
          },
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        renderUsernameOnMessage={true}
        //renderAvatarOnTop={true}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: firebase.auth().currentUser.uid,
          avatar: this.props.route.params.avatar,
          name: this.props.route.params.username,
        }}
        renderActions={this.renderCustomActions}
        onPressAvatar={(user) => this.onPressAvatar(user)}
        onLongPress={this.onLongPress}
        renderBubble={this.renderBubble.bind(this)}
      />
    );
  }
}

export default ChatPage;
