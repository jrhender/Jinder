import React from 'react';
import {Motion} from 'react-motion';
import firebase from '../../../firebaseInitialization';

class JTinderPane extends React.Component {

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
        let paneNumber = this.props.paneNumber;
        let likeOpacity = this.props.likeOpacity;
        let dislikeOpacity = this.props.dislikeOpacity;
        let likeStatus = this.props.likeStatus;

        return(
            <Motion
                defaultStyle={{xTranslateVal: 0, yTranslateVal: 0, rotationVal: 0}}
                style={{xTranslateVal: this.props.xTranslateVal, yTranslateVal: this.props.yTranslateVal, rotationVal: this.props.rotationVal}}
                onRest={this.props.motionRestCallback}
            >
                {({xTranslateVal, yTranslateVal, rotationVal}) => {
                    let paneStyle =
                        {transform: 'translate(' +xTranslateVal+ 'px, ' +
                        yTranslateVal + 'px) ' + 'rotate('+rotationVal+'deg)'};
                    if(likeStatus == 1 || likeStatus == -1) {
                        paneStyle = {visibility: 'hidden'};
                    }
                    return(
                        <li className={"pane"+paneNumber} style={paneStyle}>
                            <div 
                                className="img" 
                                style={this.state.imageUrl ? {backgroundImage: `url(${this.state.imageUrl})`} : {}}
                            />
                            <div className="like" style={likeOpacity}></div>
                            <div className="dislike" style={dislikeOpacity}></div>
                        </li>
                    )}}
            </Motion>
        )
                                
    }
}

export default JTinderPane;