import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDGkmGcCvF-zuTrfmHWKmeTy_wO0pRcG9c",
    authDomain: "jinder-157bf.firebaseapp.com",
    databaseURL: "https://jinder-157bf.firebaseio.com",
    projectId: "jinder-157bf",
    storageBucket: "jinder-157bf.appspot.com",
    messagingSenderId: "1020303948089"
};
firebase.initializeApp(config);

let firestoreDB = firebase.firestore();
// Disable deprecated features
firestoreDB.settings({
    timestampsInSnapshots: true
});

export {firestoreDB};
export default firebase;

// Good SO thread on the background on this file:
// https://stackoverflow.com/questions/53139432/importing-only-auth-package-from-firebase-module?noredirect=1&lq=1