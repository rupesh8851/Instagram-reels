import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp(
    {
        apiKey: "AIzaSyAeAA7-NzhHfMx_MdevadAC9koUJhi6oks",
        authDomain: "reels-ac84d.firebaseapp.com",
        projectId: "reels-ac84d",
        storageBucket: "reels-ac84d.appspot.com",
        messagingSenderId: "256019488611",
        appId: "1:256019488611:web:ac0c2b2fc05a7fb19bfd56",
        measurementId: "G-WTDLLSHSRW"
      }
)


let auth = firebase.auth();

export default auth;
export const firestore = firebase.firestore();
export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();