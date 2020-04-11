import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyA_39e6SCijA5UWOrLViU_169i7DCpw1iE",
  authDomain: "universitychat-9a9c8.firebaseapp.com",
  databaseURL: "https://universitychat-9a9c8.firebaseio.com",
  projectId: "universitychat-9a9c8",
  storageBucket: "universitychat-9a9c8.appspot.com",
  messagingSenderId: "378196588409",
  appId: "1:378196588409:web:1916dfb21986d052f061a8",
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  // *** Auth API ***
  //...
}
export default Firebase;
