import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF3csQeyGYWNY5NvjiMVLNjb1cINv7B60",
  authDomain: "mymarket-8ce8c.firebaseapp.com",
  projectId: "mymarket-8ce8c",
  storageBucket: "mymarket-8ce8c.appspot.com",
  messagingSenderId: "444068780256",
  appId: "1:444068780256:web:1f44adf00094e2c8495885",
};

firebase.initializeApp(firebaseConfig);
const dbh = firebase.firestore();

export default dbh;