import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

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

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database ={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
// export default firebase;