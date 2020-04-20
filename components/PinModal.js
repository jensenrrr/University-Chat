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

class PinModal extends React.Component {
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
  on = (callback) =>
    firebase
      .database()
      .ref("Chats/" + this.props.code + this.props.number + "/PinnedMessages/")
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  setModalVisible() {
    this.setState({
      modalVisible: !modalVisible,
    });
  }
  componentDidMount() {
    console.log(this.props);

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
    var modalVisible = false;
    function setModalVisible() {
      console.log("modal change");
      modalVisible = !modalVisible;
    }
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.props.name}</Text>
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

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PinModal;
