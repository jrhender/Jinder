import {firestoreDB} from './firebaseInitialization';
import firebase from './firebaseInitialization';

const getProfileImagesOfCurrentUser = async () => {
    let images : object[] = new Array();
    let currentUserID : string = firebase.auth().currentUser.uid;
    let jinderImagesRef = firestoreDB.collection("ProfileImages");
    let userImagesQuery = jinderImagesRef.where("UserID","==",currentUserID);
    try {
        const querySnapshop = await userImagesQuery.get();
        const storage = firebase.storage();
        let imagePromises : Promise<string>[] = new Array();
        querySnapshop.forEach((doc : any) => {
            imagePromises.push(storage.ref('images/thumb@256_' + doc.data().FileName).getDownloadURL());
        });
        const imageDownloadUrls = await Promise.all<string>(imagePromises);
        let index = 0;
        querySnapshop.forEach((doc : any) => {
            images.push({
                imageUrl : imageDownloadUrls[index],
                fileName : doc.data().FileName
            });
            index++;
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
    getProfileImagesOfCurrentUser,
    addNewPaneImage,
    deletePaneImage,
    getJohnImages
}

export default paneImageService;