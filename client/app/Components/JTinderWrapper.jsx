import React from 'react';

import JTinderPaneWrapper from './JTinderPaneWrapper.jsx';
import MatchModal from './MatchModal.jsx';

import paneImageService from '../Services/paneImageService';

class JTinderWrapper extends React.Component {

    constructor() {
        super();
        this.state = {
            imagesAreLoaded : false
        };
    }

    componentDidUpdate() {
        if(this.props.isSignedIn && this.state.imagesAreLoaded === false) {
            paneImageService.getImagesOfCurrentUser().then((returnedImageUrls) => {
                if(returnedImageUrls.length > 0) {
                    this.initializingArray = [];
                    for(let i =0; i < this.paneCount; i++ ){
                        this.initializingArray.push(0);
                    }

                    this.paneCount = returnedImageUrls.length;
                    
                    this.setState({
                        imageUrls: returnedImageUrls,
                        currentPane: this.paneCount - 1,
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
            });
        }
    }

    updatePaneStatusForLike() {
        let paneNumberOfNewCurrentPane = this.getNumberOfNewCurrentPane();
        let newLikeStatusArray = this.getNewLikeStatusArray();
        this.setState((prevState) => {
            return {
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
        if (this.props.isSignedIn) {
            if(this.state.imagesAreLoaded){
                if(this.paneCount > 0) {
                    return (
                        <div className="customStyle">
                            <JTinderPaneWrapper 
                                threshold="1" 
                                paneCount={this.paneCount}
                                currentPane={this.state.currentPane}
                                likeStatusArray={this.state.likeStatusArray}
                                updatePaneStatusForLike = {this.updatePaneStatusForLike.bind(this)}
                                updatePaneStatusForDislike = {this.updatePaneStatusForDislike.bind(this)}
                                imageUrls = {this.state.imageUrls}
                            />
                            <MatchModal 
                                show={this.state.likeModalIsOpen}
                                onClose={this.toggleModal.bind(this)}
                                currentPane={this.state.currentPane+1}
                                imageUrl = {this.state.imageUrls != undefined ? 
                                    this.state.imageUrls[this.state.currentPane] : ""}                        
                            />
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            <p>You have no love options :(</p>
                        </div>
                    )
                }
            }
            else{
                return (
                    <div>
                        <p>Profiles have not loaded yet... (wannabe loading gif)</p>
                    </div>
                )
            }
        }
        else {
            return(
                <div/>
            )
        }
    }
}

export default JTinderWrapper;