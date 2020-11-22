import * as firebase from "firebase";
import { parseMessages } from "./random";

//used in Chat.js
export const chatListener = (chatPath, callback) =>
  firebase
    .database()
    .ref(chatPath + "/messages/")
    .limitToLast(20)
    .on("child_added", (snapshot) => callback(parseMessages(snapshot)));

export const chatListenerCleanup = (chatPath, listener) =>
  firebase
    .database()
    .ref(chatPath + "/messages/")
    .off("child_added", listener);

export const sendChatMessage = (chatPath, message) =>
  firebase
    .database()
    .ref(chatPath + "/messages/")
    .push(message);

export const pinChatMessage = (chatPath, message) =>
  firebase
    .database()
    .ref(chatPath + "/PinnedMessages/")
    .push(message);

export const timestamp = () => firebase.database.ServerValue.TIMESTAMP;

//misc.
export const getAuthId = () => firebase.auth().currentUser.uid;

export const uploadImageToStorage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = firebase
    .storage()
    .ref()
    .child("images/" + imageName);
  return storageRef.put(blob);
};
export const getImageURLFromStorage = (imageName) =>
  firebase
    .storage()
    .ref("images/" + imageName)
    .getDownloadURL();

export const signOutUser = () => {
  firebase.auth().signOut();
};
