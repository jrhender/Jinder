import React from 'react';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import JinderProfileImage from './JinderProfileImage.jsx';
import paneImageService from '../Services/paneImageService';
import {IceCream} from 'react-kawaii';

class JinderSetup extends React.Component {
    state = {
        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        imagesAreLoaded: false,
        images : []
    };

    componentDidMount() {
        if(this.state.imagesAreLoaded === false) {
            paneImageService.getImagesOfCurrentUser().then((returnedImages) => {
                if(returnedImages.length > 0) {
                    this.setState({
                        images: returnedImages,
                        imagesAreLoaded : true
                    });
                }
                else
                {
                    this.setState({
                        imagesAreLoaded : true
                    });
                }
            });
        }
    }

    handleChangeUsername = event =>
        this.setState({ username: event.target.value });
    
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => 
                paneImageService.addNewPaneImage(url, filename)
                .then(() => {
                    let newPaneImage = {
                        imageUrl : url,
                        fileName : filename
                    };
                    this.setState((prevState) => { 
                        return {
                            images: [...prevState.images, newPaneImage],
                        } 
                    })
                })
            );
    };

    deleteImage = imageName => {
        paneImageService.deletePaneImage(imageName)
            .then(() => {
                indexOfImageToRemove = images.map(x => x.fileName).indexOf(imageName);
                this.setState((prevState) => { 
                    return {
                        images: prevState.images.splice(indexOfImageToRemove, 1),
                    } 
                })
            })
            .catch((error) => {
                console.log("error deleting image " + error);
            })
    }

    render() {
        return (
            <div>
                <h2>Manage your images</h2>
                <div style={{margin: '50px'}}>
                    <h4>Only have upload at the moment. More functionality coming soon!</h4>
                    <IceCream size={50} mood="lovestruck" color="#FDA7DC" />
                </div>
                <div>
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                    <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </div>
                {this.state.imagesAreLoaded && this.state.images.length > 0
                    && <JinderProfileImage imageUrl={this.state.images[0].imageUrl}/>}
            </div>
        );
    }
}
    

export default JinderSetup;