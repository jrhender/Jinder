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

const getProfileImagesOfCurrentUser = async () => {
    let images : object[] = new Array();
    let currentUserID : string = firebase.auth().currentUser.uid;
    let jinderImagesRef = firestoreDB.collection("ProfileImages");
    let userImagesQuery = jinderImagesRef.where("UserID","==",currentUserID);
    try {
        const querySnapshop = await userImagesQuery.get();
        querySnapshop.forEach((doc : any) => {
            images.push({
                imageUrl : doc.data().ImageUrl,
                fileName : doc.data().FileName
            });
        })
        return images;
    }
    catch (error) {
        throw Error("Error getting profile images: " + error);
    }
}

const getJohnImages = async () => {
    let images : object[] = new Array();
    let jinderImagesRef = firestoreDB.collection("PaneImages");
    try {
        const querySnapshop = await jinderImagesRef.get();
        querySnapshop.forEach((doc : any) => {
            images.push({
                imageUrl : doc.data().ImageUrl,
                fileName : doc.data().FileName,
                profileText : doc.data().ProfileText
            });
        })
        return images;
    }
    catch (error) {
        throw Error("Error getting john images: " + error);
    }
}

const addNewPaneImage = (downloadUrlOfNewImage : string, fileName : string) => {
    let currentUserID : string = firebase.auth().currentUser.uid;
    let jinderImagesRef = firestoreDB.collection("ProfileImages");
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

const deletePaneImage = (fileName : string) => {
    let jinderImagesRef = firestoreDB.collection("JinderImages");
    let recordsToDeleteQuery = jinderImagesRef.where("FileName","==",fileName);
    return new Promise<string[]>((resolve, reject) => {
        //Step 1: Delete db record
        recordsToDeleteQuery.get()
            .then((querySnapshop : any) => {
                querySnapshop.forEach((doc : any) => {
                    doc.delete();
                })
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
    getProfileImagesOfCurrentUser,
    addNewPaneImage,
    deletePaneImage,
    getJohnImages
}

export default paneImageService;