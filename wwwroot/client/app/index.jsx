import React from 'react';
import {render} from 'react-dom';

import JTinderPaneWrapper from './JTinderPaneWrapper.jsx';
import JTinderButtons from './JTinderButtons.jsx';

class App extends React.Component {

    constructor() {
        super();
        this.paneCount = 2;

        let initializingArray = [];
        for(let i =0; i < this.paneCount; i++ ){
            initializingArray.push(0);
        }

        this.state = {
            currentPane : this.paneCount-1,

            // likeStatusArray possible statuses: 0->neutral, -1->disliked, 1->liked
            likeStatusArray : initializingArray
        }
    }

    handleLike() {
        this.setState((prevState) => {
            return {
                currentPane : (prevState.currentPane - 1),
                likeStatusArray : prevState.likeStatusArray.map(function(item, index) { 
                    return (index == prevState.currentPane ? 1 : item);
                })
            }
        });
    }

    handleDislike() {
        this.setState((prevState) => {
            return {
                currentPane : (prevState.currentPane - 1),
                likeStatusArray : prevState.likeStatusArray.map(function(item, index) { 
                    return (index == prevState.currentPane ? -1 : item);
                })
            }
        });
    }

    render () {
        return (
            <div>
                <JTinderPaneWrapper 
                    threshold="1" 
                    animationRevertSpeed="200" 
                    animationSpeed="400" 
                    paneCount="2" 
                    likeStatusArray={this.state.likeStatusArray}
                    handleLike = {this.handleLike.bind(this)}
                    handleDislike = {this.handleDislike.bind(this)}
                />

                <JTinderButtons />
            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));