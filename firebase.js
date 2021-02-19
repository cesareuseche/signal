import * as firebase from 'firebase';
import "firebase/firestore";
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB4TPumN3bIeSYEIEBadYgOWcoo2cgHoZE",
    authDomain: "signal-26d0f.firebaseapp.com",
    projectId: "signal-26d0f",
    storageBucket: "signal-26d0f.appspot.com",
    messagingSenderId: "383121509911",
    appId: "1:383121509911:web:997c43ab9dfc5168869652"
};


let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
