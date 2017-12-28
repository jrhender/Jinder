import React from 'react';
import {render} from 'react-dom';

import JTinderPaneWrapper from './JTinderPaneWrapper.jsx';
import MatchModal from './MatchModal.jsx';

class App extends React.Component {

    constructor() {
        super();
        this.paneCount = 5;

        let initializingArray = [];
        for(let i =0; i < this.paneCount; i++ ){
            initializingArray.push(0);
        }

        this.state = {
            currentPane : this.paneCount-1,
            likeModalIsOpen : false,

            // likeStatusArray possible statuses: 0->neutral, -1->disliked, 1->liked
            likeStatusArray : initializingArray
        }
    }

    updatePaneStatusForLike() {
        this.setState((prevState) => {
            return {
                currentPane : (prevState.currentPane - 1),
                likeStatusArray : prevState.likeStatusArray.map(function(item, index) { 
                    return (index == prevState.currentPane ? 1 : item);
                }),
                likeModalIsOpen: true
            }
        });
    }

    updatePaneStatusForDislike() {
        this.setState((prevState) => {
            return {
                currentPane : (prevState.currentPane - 1),
                likeStatusArray : prevState.likeStatusArray.map(function(item, index) { 
                    return (index == prevState.currentPane ? -1 : item);
                }),
            }
        });
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

render(<App/>, document.getElementById('app'));