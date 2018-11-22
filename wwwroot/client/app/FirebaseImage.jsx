import React from 'react';
import firebase from '../../firebaseInitialization';

class FirebaseImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null
        };
    }

    componentDidMount() {
        this.loadImageFromFirebase();
    }

    loadImageFromFirebase() {
        // Points to the root reference
        let storageRef = firebase.storage().ref();

        // Points to 'images'
        let paneImagesRef = storageRef.child('paneImages');

        // Points to 'images/space.jpg'
        // Note that you can use variables to create child values
        let fileName = 'pane0.jpg';
        let paneRef = paneImagesRef.child(fileName);
        paneRef.getDownloadURL().then(url => {
            this.setState({
                imageUrl: url
            });
        });
    }

    render() {
        return(
            <img src={this.state.imageUrl || ""}/>
        )
                                
    }
}

export default FirebaseImage;