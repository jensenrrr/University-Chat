import * as firebase from "firebase";
import { signOutUser } from "../utilities/dbInteraction"

//not an action -> due for refactor later
export const getUserData = (dispatch) => {
  firebase
    .database()
    .ref("/Users/" + firebase.auth().currentUser.uid)
    .on("value", (snapshot) => {
      const userData = {
        firstName: snapshot.val().firstName,
        lastName: snapshot.val().lastName,
        profilePicture: snapshot.val().profilePicture,
        courses: snapshot.val().courses,
        dms: snapshot.val().DMs,
      };

      dispatch(setUserData(userData));
    });
};

export const signOut = (dispatch) => {
  signOutUser();
  dispatch(signOutAction());
};

//action
export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});

export const signOutAction = () => ({
  type: "SIGN_OUT",
});