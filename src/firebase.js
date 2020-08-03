import firebase from 'firebase/app'
import 'firebase/firestore'

let config = {
    apiKey: "AIzaSyDTWdWyGfLpA57mF6rMRyRsCSw6-V581_0",
    authDomain: "react-movie-app-4d08f.firebaseapp.com",
    databaseURL: "https://react-movie-app-4d08f.firebaseio.com",
    projectId: "react-movie-app-4d08f",
    storageBucket: "react-movie-app-4d08f.appspot.com",
    messagingSenderId: "989189224241",
    appId: "1:989189224241:web:bbd5efaf972b9d5e1aa210"
}
firebase.initializeApp(config);
const db = firebase.firestore();



export default db;