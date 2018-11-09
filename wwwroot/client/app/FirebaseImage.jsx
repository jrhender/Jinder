import React from 'react';
import firebase from '../../firebaseInitialization';

class FirebaseImage extends React.Component {

    constructor(props) {
        super(props);
    }

    loadImageFromFirebase() {
        // Points to the root reference
        var storageRef = firebase.storage().ref();

        // Points to 'images'
        var paneImagesRef = storageRef.child('paneImages');

        // Points to 'images/space.jpg'
        // Note that you can use variables to create child values
        var fileName = 'pane0.jpg';
        return paneRef = paneImagesRef.child(fileName);
    }

    render() {
        return(
            <img src={this.loadImageFromFirebase().bind(this) || ""}/>
        )
                                
    }
}

export default FirebaseImage;