import React from 'react';

import JTinderPaneWrapper from './JTinderPaneWrapper.jsx';
import MatchModal from './MatchModal.jsx';

class JTinderWrapper extends React.Component {

    constructor() {
        super();
        this.paneCount = 5;

        this.initializingArray = [];
        for(let i =0; i < this.paneCount; i++ ){
            this.initializingArray.push(0);
        }

        this.state = {
            currentPane : this.paneCount-1,
            likeModalIsOpen : false,

            // likeStatusArray possible statuses: 0->neutral, -1->disliked, 1->liked
            likeStatusArray : this.initializingArray
        }
    }

    updatePaneStatusForLike() {
        let newPaneCount = this.getNewPaneCount();
        let newLikeStatusArray = this.getNewLikeStatusArray();
        this.setState((prevState) => {
            return {
                currentPane : newPaneCount,
                likeStatusArray : newLikeStatusArray,
                likeModalIsOpen: true
            }
        });
    }

    updatePaneStatusForDislike() {
        let newPaneCount = this.getNewPaneCount();
        let newLikeStatusArray = this.getNewLikeStatusArray();
        this.setState((prevState) => {
            return {
                currentPane : newPaneCount,
                likeStatusArray : newLikeStatusArray,
            }
        });
    }

    getNewPaneCount() {
        if (this.state.currentPane != 0) {
            return this.state.currentPane - 1
        }
        else {
            return this.paneCount - 1
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
        return (
            <div>
                <JTinderPaneWrapper 
                    threshold="1" 
                    paneCount={this.paneCount}
                    currentPane={this.state.currentPane}
                    likeStatusArray={this.state.likeStatusArray}
                    updatePaneStatusForLike = {this.updatePaneStatusForLike.bind(this)}
                    updatePaneStatusForDislike = {this.updatePaneStatusForDislike.bind(this)}
                />
                <MatchModal show={this.state.likeModalIsOpen} onClose={this.toggleModal.bind(this)} currentPane={this.state.currentPane+1}/>
            </div>
        )
    }
}

export default JTinderWrapper;