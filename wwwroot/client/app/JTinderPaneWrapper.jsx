import React from 'react';

import JTinderPane from './JTinderPane.jsx';
import Measure from 'react-measure';

class JTinderPaneWrapper extends React.Component {
    
    constructor(props) {
        super(props);

        this.paneCount = 2;

        let initializingArray = [];
        for(let i =0; i < this.paneCount; i++ ){
            initializingArray.push({});
        }

        this.state = {
            currentPane : 1,
            paneWidth : 0,
            touchStart : false,
            xStart : 0, yStart : 0,
            posX : 0, posY : 0, lastPosX : 0, lastPosY : 0,
            dimensions: {
                width: -1,
                height: -1
            },
            paneStyles : initializingArray,
            likeOpacityArray : initializingArray,
            dislikeOpacityArray : initializingArray
        };


    }

    mousedown(ev) {
        if(this.state.touchStart === false) {
            this.setState({
                touchStart : true,
                xStart : ev.pageX,
                yStart : ev.pageY,
            });
        }
    }

    mouseup(ev) {
        let pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
        let pageY = (typeof ev.pageY == 'undefined') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
        let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
        let deltaY = parseInt(pageY) - parseInt(this.state.yStart);

        this.setState({
            touchStart: false,
            posX : deltaX + this.state.lastPosX,
            posY : deltaY + this.state.lastPosY
        })

        let opa = Math.abs((Math.abs(deltaX) / this.props.threshold) / 100 + 0.2);     
        

        if (opa >= 1) {
                 
            if (this.state.posX > 0) {

                //It's a like so show the match modal
                //showMatchModal();
                
                // let paneStylesVar = this.state.paneStyles; 
                // paneStylesVar[this.state.currentPane] = {
                //     transform: 
                //         'translate(' + this.state.dimensions.pane_width + 'px, ' + (this.state.posY + this.state.dimensions.pane_width) + 'px)' +
                //         ' ' + 
                //         'rotate(60deg)'
                // } 

                this.nextPane();

                // if($that.settings.onLike) {
                //     $that.settings.onLike(panes.eq(current_pane));
                // }
                // $that.next();
            } else {

                // let paneStylesVar = this.state.paneStyles;
                // paneStylesVar[this.state.currentPane] = {
                //     transform: 
                //         'translate(-' + this.state.dimensions.pane_width + 'px, ' + (this.state.posY + this.state.dimensions.pane_width) + 'px)' +
                //         ' ' + 
                //         'rotate(-60deg)'
                // } 
                
                this.nextPane();

                // if($that.settings.onDislike) {
                //     $that.settings.onDislike(panes.eq(current_pane));
                // }
                // $that.next();
            }

        } else {
            this.setState((prevState) => {
                return {
                    lastPosX : 0,
                    lastPosY : 0,
                    paneStyles : prevState.paneStyles.map(function(item, index) {
                        return index == prevState.currentPane ? {transform: 'translate(0px,0px) rotate(0deg)'} : item 
                        }),
                    likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) { 
                            return index == prevState.currentPane ? {opacity: 0} : item
                        }),
                    dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) { 
                            return index == prevState.currentPane ? {opacity: 0} : item
                        })
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
            let percent = ((100 / this.state.dimensions.width) * deltaX) / this.paneCount;

            let translateTransform = 'translate(' + this.state.posX + 'px, ' + this.state.posY + 'px)';
            let rotateTransform = 'rotate(' + (percent / 2) + 'deg)';
            let concatTransform = translateTransform + ' ' + rotateTransform;
            let paneStylesVar = this.state.paneStyles;
            paneStylesVar[this.state.currentPane] = {
                transform: concatTransform
            }

            let opa = (Math.abs(deltaX) / this.props.threshold) / 100 + 0.2;
            if(opa > 1.0) {
                opa = 1.0;
            }
            if (this.state.posX >= 0) {
                this.setState((prevState) => {
                    return {
                        posX : deltaX + this.state.lastPosX,
                        posY : deltaY + this.state.lastPosY,
                        paneStyles: paneStylesVar,
                        likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) { 
                            return index == prevState.currentPane ? {opacity: opa} : item
                        }),
                        dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) { 
                            return index == prevState.currentPane ? {opacity: 0} : item
                        })
                    }
                });
            } else if (this.state.posX < 0) {
                this.setState((prevState) => {
                    return {
                        posX : deltaX + this.state.lastPosX,
                        posY : deltaY + this.state.lastPosY,
                        paneStyles: paneStylesVar,
                        likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) { 
                            return (index == prevState.currentPane ? {opacity: 0} : item);
                        }),
                        dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) { 
                            return (index == prevState.currentPane ? {opacity: opa} : item);
                        })
                    }
                });
            }
        }
    }

    nextPane() {
        this.setState((prevState) => {
            return {
                currentPane : (prevState.currentPane - 1),
                paneStyles : prevState.paneStyles.map(function(item, index) { 
                    return (index == prevState.currentPane ? {visibility: 'hidden'} : item);
                })
            }
        });
    }    

    render() {
        let panes = new Array(this.paneCount)
        for (var i=0; i < this.paneCount; i++) {
            panes.push(<JTinderPane key={i}
                            paneNumber={i} 
                            transformStyle={this.state.paneStyles[i]} 
                            likeOpacity={this.state.likeOpacityArray[i]} 
                            dislikeOpacity={this.state.dislikeOpacityArray[i]}
                        />);
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