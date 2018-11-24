import firebase from '../../../firebaseInitialization';

const getPaneImageUrl = () => {
    // Points to the root reference
    let storageRef = firebase.storage().ref();

    // Points to 'images'
    let paneImagesRef = storageRef.child('paneImages');

    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    let fileName : string = 'pane0.jpg';
    let paneRef = paneImagesRef.child(fileName);
    let downloadURLPromise : Promise<string> = paneRef.getDownloadURL();
    return downloadURLPromise;
}

const paneImageService = {
    getPaneImageUrl
}

export default paneImageService;