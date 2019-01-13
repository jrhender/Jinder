import React from 'react';
import JTinderPaneWrapper from './JTinderPaneWrapper.jsx';
import MatchModal from './MatchModal.jsx';
import paneImageService from '../Services/paneImageService';
import {SpeechBubble} from 'react-kawaii';

class JTinderWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagesAreLoaded : false
        };
    }

    async componentDidMount() {
        if(this.state.imagesAreLoaded === false) {
            const profileImagesPromise =  paneImageService.getProfileImagesOfCurrentUser();
            const jinderImagesPromise = paneImageService.getJohnImages();
            const profileImages = await profileImagesPromise;
            const jinderImages = await jinderImagesPromise;

            if(jinderImages.length > 0) {
                this.paneCount = jinderImages.length;
                this.initializingArray = [];
                for(let i =0; i < this.paneCount; i++ ){
                    this.initializingArray.push(0);
                }

                this.setState({
                    paneImages : jinderImages,
                    profileImages : profileImages,
                    currentPane : this.paneCount - 1,
                    // likeStatusArray possible statuses: 0->neutral, -1->disliked, 1->liked
                    likeStatusArray : this.initializingArray,
                    imagesAreLoaded : true
                });
            }
            else
            {
                this.setState({
                    imagesAreLoaded : true
                });
            }
        }
    }

    updatePaneStatusForLike() {
        let paneNumberOfNewCurrentPane = this.getNumberOfNewCurrentPane();
        let newLikeStatusArray = this.getNewLikeStatusArray();
        this.setState((prevState) => {
            return {
                previousPane : prevState.currentPane,
                currentPane : paneNumberOfNewCurrentPane,
                likeStatusArray : newLikeStatusArray,
                likeModalIsOpen: true
            }
        });
    }

    updatePaneStatusForDislike() {
        let paneNumberOfNewCurrentPane = this.getNumberOfNewCurrentPane();
        let newLikeStatusArray = this.getNewLikeStatusArray();
        this.setState((prevState) => {
            return {
                previousPane : prevState.currentPane,
                currentPane : paneNumberOfNewCurrentPane,
                likeStatusArray : newLikeStatusArray,
            }
        });
    }

    getNumberOfNewCurrentPane() {
        if (this.state.currentPane != 0) {
            return this.state.currentPane - 1
        }
        else {
            return this.paneCount - 1 //Go back to the beginning
        }
    }
    
    getNewLikeStatusArray() {
        let currentPane = this.state.currentPane;
        if (currentPane != 0) {
            return this.state.likeStatusArray.map(function(item, index) { 
                return (index == currentPane ? -1 : item);
            });
        }
        else {
            return this.initializingArray;
        }
    }

    toggleModal(ev){
        this.setState((prevState) => { 
            return {
                //likeModalIsOpen: !prevState.likeModalIsOpen 
                likeModalIsOpen: false
            }
        });
    }

    render () {
        if(this.state.imagesAreLoaded){
            if(this.state.profileImages.length <= 0) {
                return (
                    <div>
                        <SpeechBubble size={170} mood="sad" color="#83D1FB" />
                        <h3>Please upload a profile image</h3>
                    </div>
                )
            }
            else if(this.state.paneImages.length <= 0)
            {
                return (
                    <div>
                        <SpeechBubble size={170} mood="sad" color="#83D1FB" />
                        <h3>We weren't able to load the John images due to a beauty overload</h3>
                    </div>
                )
            }
            else {
                return (
                    <div className="customStyle">
                        <JTinderPaneWrapper 
                            threshold="1" 
                            paneCount={this.paneCount}
                            currentPane={this.state.currentPane}
                            likeStatusArray={this.state.likeStatusArray}
                            updatePaneStatusForLike = {this.updatePaneStatusForLike.bind(this)}
                            updatePaneStatusForDislike = {this.updatePaneStatusForDislike.bind(this)}
                            imageUrls = {this.state.paneImages ? this.state.paneImages.map(x => x.imageUrl) : []}
                        />
                        <MatchModal 
                            show={this.state.likeModalIsOpen}
                            onClose={this.toggleModal.bind(this)}
                            profileImageUrl = {this.state.profileImages[0] != undefined ? 
                                this.state.profileImages[0].imageUrl : ""}  
                            imageUrl = {this.state.paneImages[this.state.previousPane] != undefined ? 
                                this.state.paneImages[this.state.previousPane].imageUrl : ""}                        
                        />
                    </div>
                )
            }
        }
        else{
            return (
                <div>
                    <SpeechBubble size={150} mood="happy" color="#83D1FB" />
                    <h3>Your love has not loaded yet... please wait</h3>
                </div>
            )
        }
    }
}

export default JTinderWrapper;