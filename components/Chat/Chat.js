import React, { useEffect, useState } from "react";
import { Clipboard } from "react-native";
import { GiftedChat, Actions, Bubble } from "react-native-gifted-chat"; // 0.3.0
import { useSelector } from "react-redux";
import {
  chatListener,
  chatListenerCleanup,
  sendChatMessage,
  pinChatMessage,
  getAuthId,
  timestamp,
} from "../../utilities/dbInteraction";
import { selectAndUploadImage } from "../../utilities/random";

const Chat = ({ navigation, chatPath, ...props }) => {
  const { profilePicture: avatar, firstName, lastName } = useSelector(
    (state) => state.account
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const listener = chatListener(chatPath, (message) =>
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      )
    );

    return function cleanup() {
      chatListenerCleanup(chatPath, listener);
    };
  }, []);

  const renderCustomActions = (props) => {
    const options = {
      "Send Image": (props) => {
        sendImage(props);
      },
      Cancel: () => {},
    };
    return <Actions {...props} options={options} />;
  };

  const sendImage = (props) => {
    selectAndUploadImage
      .then((url) => {
        onSend({ text: "", user: props.user, image: url });
      })
      .catch((error) => console.log(error));
  };

  const onPressAvatar = (user) => {
    navigation.navigate("DirectMessage", {
      myid: getAuthId(),
      theirid: user._id,
      name: user.name,
      ourname: firstName + " " + lastName.charAt(0) + ".",
      avatar: avatar,
    });
  };

  const onSend = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user, image } = messages[i];
      const message = {
        text,
        user,
        image: image,
        timestamp: timestamp(),
      };
      sendChatMessage(chatPath, message);
    }
  };
  const onLongPress = (context, message) => {
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
              pinChatMessage(chatPath, message);
              break;
          }
        }
      );
    }
  };
  const renderBubble = (props) => {
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
  };
  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: getAuthId(),
        name: firstName + " " + lastName.charAt(0) + ".",
        avatar: avatar,
      }}
      renderActions={renderCustomActions}
      onPressAvatar={(user) => onPressAvatar(user)}
      onLongPress={onLongPress}
      renderBubble={renderBubble}
    />
  );
};

export default Chat;
