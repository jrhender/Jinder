import {firestoreDB} from './firebaseInitialization';
import firebase from './firebaseInitialization';

const getPaneImageUrl = (paneNumber : number) => {
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

const getImagesOfCurrentUser = () => {
    let imageUrls : string[] = new Array();
    let currentUserID : string = firebase.auth().currentUser.uid;
    let jinderImagesRef = firestoreDB.collection("JinderImages");
    let userImagesQuery = jinderImagesRef.where("UserID","==",currentUserID);
    return new Promise<string[]>((resolve, reject) => {
        userImagesQuery.get()
            .then((querySnapshop : any) => {
                querySnapshop.forEach((doc : any) => {
                    imageUrls.push(doc.data().ImageUrl);
                })
                return resolve(imageUrls)
            })
            .catch((error : string) => {
                console.log("Error getting documents: ", error);
                return reject("Error getting documents: " + error);
        });
    });
}

const addNewPaneImage = (downloadUrlOfNewImage : string, fileName : string) => {
    let currentUserID : string = firebase.auth().currentUser.uid;
    let jinderImagesRef = firestoreDB.collection("JinderImages");
    return new Promise<string[]>((resolve, reject) => {
        jinderImagesRef.add({
            ImageUrl: downloadUrlOfNewImage,
            UserID: currentUserID,
            FileName: fileName
        })
        .then((docRef : any) => {
            console.log("Document written with ID: ", docRef.id);
            return resolve()
        })
        .catch((error : string) => {
            console.log("Error creating PaneImage record: ", error);
            return reject("Error creating PaneImage record: " + error);
        });
    });
}

const paneImageService = {
    getPaneImageUrl,
    getImagesOfCurrentUser,
    addNewPaneImage
}

export default paneImageService;