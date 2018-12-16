import React from 'react';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import JinderPaneImageList from './JinderPaneImageList.jsx';
import paneImageService from '../Services/paneImageService';

class JinderSetup extends React.Component {
    state = {
        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        imagesAreLoaded: false,
        imageUrls : []
    };

    componentDidMount() {
        if(this.state.imagesAreLoaded === false) {
            paneImageService.getImagesOfCurrentUser().then((returnedImageUrls) => {
                if(returnedImageUrls.length > 0) {
                    this.setState({
                        imageUrls: returnedImageUrls,
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
                paneImageService.addNewPaneImage(url)
                .then(
                    this.setState((prevState) => { 
                        return {imageUrls: [...prevState.imageUrls, url]} 
                    })
                )
            );
    };

    render() {
        return (
            <div>
                <form>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChangeUsername}
                    />
                    <label>Avatar:</label>
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                    {/* {this.state.avatarURL && <img src={this.state.avatarURL} />} */}
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
                    {this.state.imagesAreLoaded && <JinderPaneImageList imageUrls={this.state.imageUrls}/>}
                </form>
            </div>
        );
    }
}
    

export default JinderSetup;