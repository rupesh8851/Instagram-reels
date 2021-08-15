import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp(
    {
        apiKey: "AIzaSyDSeECva7LxaNLnP83MTyyV_j_4LVS8DiU",
        authDomain: "fir-96e46.firebaseapp.com",
        projectId: "fir-96e46",
        storageBucket: "fir-96e46.appspot.com",
        messagingSenderId: "325781789442",
        appId: "1:325781789442:web:684a155937c9a34863001b"

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