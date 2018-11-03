import React from 'react';

import JTinderPane from './JTinderPane.jsx';
import JTinderButtons from './JTinderButtons.jsx';
import Measure from 'react-measure';
import {spring, presets} from 'react-motion';

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
            dimensions: {
                width: -1,
                height: -1
            },
            likeOpacityArray : initializingArray,
            dislikeOpacityArray : initializingArray,
            xTranslateArray : initializingArray.map(()=>0),
            yTranslateArray : initializingArray.map(()=>0),
            rotationArray : initializingArray.map(()=>0),
            motionRestCallbackArray : initializingArray.map(()=>{()=>undefined})
        };

    }

    mousedown(ev) {
        if(this.state.touchStart === false) {
            let pageX = typeof ev.pageX == 'undefined' ? ev.touches[0].pageX : ev.pageX;
            let pageY = typeof ev.pageY == 'undefined' ? ev.touches[0].pageY : ev.pageY;
            this.setState((prevState) => {return {
                touchStart : true,
                xStart : pageX,
                yStart : pageY
            }});
        }
    }

    mouseup(ev) {
        let pageX = (typeof ev.pageX == 'undefined') ? ev.changedTouches[0].pageX : ev.pageX;
        let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
        let opa = Math.abs((Math.abs(deltaX) / this.props.threshold) / 100 + 0.2);
        

        if (opa >= 1) {
                 
            if (this.state.xTranslateArray[this.props.currentPane] > 0) {
                this.handleLike();
            } else {
                this.handleDislike();
            }

        } else {
            this.setState((prevState) => {
                return {
                    touchStart: false,
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
            let pageX = typeof ev.pageX == 'undefined' ? ev.touches[0].pageX : ev.pageX;
            let pageY = typeof ev.pageY == 'undefined' ? ev.touches[0].pageY : ev.pageY;
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

    handleLike(){
        this.setState((prevState) => {
            return {
                touchStart : false,
                xTranslateArray: prevState.xTranslateArray.map(function(item, index) {return index == this.props.currentPane ? spring(this.state.dimensions.width/2, presets.wobbly) : item }, this),
                yTranslateArray: prevState.yTranslateArray.map(function(item, index) {return index == this.props.currentPane ? 0 : item} , this),
                rotationArray: prevState.rotationArray.map(function(item, index) {return index == this.props.currentPane ? 45 : item }, this),
                likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 1} : item}, this),
                dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 0} : item}, this),
                motionRestCallbackArray : prevState.motionRestCallbackArray.map(function(item, index) {return index == this.props.currentPane ? () => this.props.updatePaneStatusForLike() : item}, this)
            }
        });
    }

    handleDislike(){
        this.setState((prevState) => {
            return {
                touchStart : false,
                xTranslateArray: prevState.xTranslateArray.map(function(item, index) {return index == this.props.currentPane ? spring(-(this.state.dimensions.width/2), presets.wobbly) : item }, this),
                yTranslateArray: prevState.yTranslateArray.map(function(item, index) {return index == this.props.currentPane ? 0 : item} , this),
                rotationArray: prevState.rotationArray.map(function(item, index) {return index == this.props.currentPane ? -45 : item }, this),
                likeOpacityArray : prevState.likeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 0} : item}, this),
                dislikeOpacityArray : prevState.dislikeOpacityArray.map(function(item, index) {return index == this.props.currentPane ? {opacity: 1} : item}, this),
                motionRestCallbackArray : prevState.motionRestCallbackArray.map(function(item, index) {return index == this.props.currentPane ? () => this.props.updatePaneStatusForDislike() : item}, this)
            }
        });
    }

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
                    motionRestCallback={this.state.motionRestCallbackArray[i]}
                />
            );
        }

        return (
        <div>
            {
                //start padding container
            }
            <div className="wrap">
                {
                    //start jTinder container
                }
                <div id="slideOuter">
                <div id="Tinderslide" 
                    onMouseDown={this.mousedown.bind(this)}
                    onMouseMove={this.mousemove.bind(this)}
                    onMouseUp={this.mouseup.bind(this)}
                    onTouchStart={this.mousedown.bind(this)}
                    onTouchMove={this.mousemove.bind(this)}
                    onTouchEnd={this.mouseup.bind(this)}
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
            {
                //end padding container
            }
            <JTinderButtons handleLike={this.handleLike.bind(this)} handleDislike={this.handleDislike.bind(this)} currentPane={this.props.currentPane}/>
        </div>
        );
    }
}

export default JTinderPaneWrapper;