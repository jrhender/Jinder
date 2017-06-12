import React from 'react';

import JTinderPane from './JTinderPane.jsx';
import Measure from 'react-measure';
import {Motion} from 'react-motion';

class JTinderPaneWrapper extends React.Component {
    
    constructor(props) {
        super(props);

        let initializingArray = [];
        for(let i =0; i < this.props.paneCount; i++ ){
            initializingArray.push({});
        }

        this.state = {
            touchStart : false,
            xStart : 0, yStart : 0,
            posX : 0, posY : 0, lastPosX : 0, lastPosY : 0,
            dimensions: {
                width: -1,
                height: -1
            },
            likeOpacityArray : initializingArray,
            dislikeOpacityArray : initializingArray,
            xTranslateArray : initializingArray.map(()=>0),
            yTranslateArray : initializingArray.map(()=>0),
            rotationArray : initializingArray.map(()=>0),
        };

    }

    mousedown(ev) {
        if(this.state.touchStart === false) {
            let pageXVal = ev.pageX;
            let pageYVal = ev.pageY;
            this.setState((prevState) => {return {
                touchStart : true,
                xStart : pageXVal,
                yStart : pageYVal
            }});
        }
    }

    mouseup(ev) {
        let pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
        let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
        let opa = Math.abs((Math.abs(deltaX) / this.props.threshold) / 100 + 0.2);
        

        if (opa >= 1) {
                 
            if (this.state.xTranslateArray[this.state.currentPane] > 0) {

                //It's a like so show the match modal
                //showMatchModal();
                
                // let paneStylesVar = this.state.paneStyles; 
                // paneStylesVar[this.state.currentPane] = {
                //     transform: 
                //         'translate(' + this.state.dimensions.pane_width + 'px, ' + (this.state.posY + this.state.dimensions.pane_width) + 'px)' +
                //         ' ' + 
                //         'rotate(60deg)'
                // } 
                this.props.handleLike();
                //this.nextPane();

            } else {

                // let paneStylesVar = this.state.paneStyles;
                // paneStylesVar[this.state.currentPane] = {
                //     transform: 
                //         'translate(-' + this.state.dimensions.pane_width + 'px, ' + (this.state.posY + this.state.dimensions.pane_width) + 'px)' +
                //         ' ' + 
                //         'rotate(-60deg)'
                // } 
                this.props.handleDislike();
                //this.nextPane();
            }

        } else {
            this.setState((prevState) => {
                return {
                    touchStart: false,
                    lastPosX : 0,
                    lastPosY : 0,
                    xTranslateArray: prevState.xTranslateArray.map(function(item, index) {return index == this.props.currentPane ? 0 : item }, this),
                    yTranslateArray: prevState.yTranslateArray.map(function(item, index) {return index == this.props.currentPane ? 0 : item }, this),
                    rotationArray: prevState.rotationArray.map(function(item, index) {return index == this.props.currentPane ? 0 : item }, this),
                    likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 0} : item}, this),
                    dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 0} : item}, this)
                }           
            });
        }
    }

    mousemove(ev) {
        if(this.state.touchStart === true) {
            let pageX = typeof ev.pageX == 'undefined' ? ev.originalEvent.touches[0].pageX : ev.pageX;
            let pageY = typeof ev.pageY == 'undefined' ? ev.originalEvent.touches[0].pageY : ev.pageY;
            let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
            let deltaY = parseInt(pageY) - parseInt(this.state.yStart);
            let percent = ((100 / this.state.dimensions.width) * deltaX) / this.props.paneCount;

            let opa = (Math.abs(deltaX) / this.props.threshold) / 100 + 0.2;
            if(opa > 1.0) {
                opa = 1.0;
            }
            if (deltaX > 0) {
                this.setState((prevState) => {
                    return {
                        xTranslateArray: prevState.xTranslateArray.map(function(item, index) {return index == this.props.currentPane ? deltaX : item }, this),
                        yTranslateArray: prevState.yTranslateArray.map(function(item, index) {return index == this.props.currentPane ? deltaY : item} , this),
                        rotationArray: prevState.rotationArray.map(function(item, index) {return index == this.props.currentPane ? percent/2 : item }, this),
                        likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: opa} : item}, this),
                        dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 0} : item}, this)
                    }
                });
            } else if (deltaX < 0) {
                this.setState((prevState) => {
                    return {
                        xTranslateArray: prevState.xTranslateArray.map(function(item, index) {return index == this.props.currentPane ? deltaX : item }, this),
                        yTranslateArray: prevState.yTranslateArray.map(function(item, index) {return index == this.props.currentPane ? deltaY : item }, this),
                        rotationArray: prevState.rotationArray.map(function(item, index) {return index == this.props.currentPane ? percent/2 : item }, this),
                        likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 0} : item}, this),
                        dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: opa} : item}, this)
                    }
                });
            }
        }
    }

    // nextPane() {
    //     this.setState((prevState) => {
    //         return {
    //             paneStyles : prevState.paneStyles.map(function(item, index) { 
    //                 return (index == this.props.currentPane ? {visibility: 'hidden'} : item);
    //             }, this)
    //         }
    //     });
    // }    

    render() {
        let panes = new Array(this.props.paneCount)
        for (var i=0; i < this.props.paneCount; i++) {
            panes.push(
                <JTinderPane
                    key={i}  
                    paneNumber={i}
                    xTranslateVal={this.state.xTranslateArray[i]}
                    yTranslateVal={this.state.yTranslateArray[i]}
                    rotationVal={this.state.rotationArray[i]}
                    likeOpacity={this.state.likeOpacityArray[i]} 
                    dislikeOpacity={this.state.dislikeOpacityArray[i]}
                    likeStatus={this.props.likeStatusArray[i]}
                />
            );
        }

        return (
        //start padding container
        <div className="wrap">
            {
                //start jTinder container
            }
            <div id="slideOuter">
            <div id="Tinderslide" 
                onMouseDown={this.mousedown.bind(this)}
                onMouseMove={this.mousemove.bind(this)}
                onMouseUp={this.mouseup.bind(this)}
            >
            <Measure
                onMeasure={(dimensions) => {
                    this.setState({dimensions})
                }}
            >
                <ul>
                    {panes}
                </ul>
            </Measure>
            </div>
            </div>
            {
                //end jTinder container
            }
        </div>
        //end padding container
        );
    }

}

export default JTinderPaneWrapper;