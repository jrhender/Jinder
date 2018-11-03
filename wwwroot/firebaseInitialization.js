import firebase from 'firebase'
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
export default firebase;