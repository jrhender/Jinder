import React from 'react';

import JTinderPane from './JTinderPane.jsx';
import Measure from 'react-measure';

var styles = {
    color1: {
        backgroundColor: 'red'
    },
    color2: {
        backgroundColor: 'green'
    }
}

class JTinderComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.paneCount = 2;

        let paneStylesVar = []
        let blankTranslate = {
            transform : ''
        }
        for (var i = 0; i < this.paneCount; i++){
            paneStylesVar.push(blankTranslate);
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
            paneStyles : paneStylesVar
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
        let paneStylesVar = this.state.paneStyles 

        if (opa >= 1) {
                 
            if (this.state.posX > 0) {

                //It's a like so show the match modal
                //showMatchModal();
                
                paneStylesVar[this.state.currentPane] = {
                    transform: 
                        'translate(' + this.state.dimensions.pane_width + 'px, ' + (this.state.posY + this.state.dimensions.pane_width) + 'px)' +
                        ' ' + 
                        'rotate(60deg)'
                } 


                // if($that.settings.onLike) {
                //     $that.settings.onLike(panes.eq(current_pane));
                // }
                // $that.next();
            } else {

                //panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
                
                paneStylesVar[this.state.currentPane] = {
                    transform: 
                        'translate(-' + this.state.dimensions.pane_width + 'px, ' + (this.state.posY + this.state.dimensions.pane_width) + 'px)' +
                        ' ' + 
                        'rotate(-60deg)'
                } 

                // if($that.settings.onDislike) {
                //     $that.settings.onDislike(panes.eq(current_pane));
                // }
                // $that.next();
            }

        } else {
            this.setState({
                lastPosX : 0,
                lastPosY : 0
            })

            paneStylesVar[this.state.currentPane] = {
                transform: 
                    'translate(0px,0px) rotate(0deg)'
            } 

            // panes.eq(current_pane).animate({"transform": "translate(0px,0px) rotate(0deg)"}, $that.settings.animationRevertSpeed);
            
            // panes.eq(current_pane).find($that.settings.likeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
            // panes.eq(current_pane).find($that.settings.dislikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
        }

        this.setState({
            paneStyles : paneStylesVar
        })
    }

    mousemove(ev) {
        if(this.state.touchStart === true) {
            let pageX = typeof ev.pageX == 'undefined' ? ev.originalEvent.touches[0].pageX : ev.pageX;
            let pageY = typeof ev.pageY == 'undefined' ? ev.originalEvent.touches[0].pageY : ev.pageY;
            let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
            let deltaY = parseInt(pageY) - parseInt(this.state.yStart);
            let percent = ((100 / this.state.dimensions.width) * deltaX) / this.paneCount;
            this.setState({
                posX : deltaX + this.state.lastPosX,
                posY : deltaY + this.state.lastPosY
            })

            let translateTransform = 'translate(' + this.state.posX + 'px, ' + this.state.posY + 'px)';
            let rotateTransform = 'rotate(' + (percent / 2) + 'deg)';
            let concatTransform = translateTransform + ' ' + rotateTransform;
            let paneStylesVar = this.state.paneStyles;
            paneStylesVar[this.state.currentPane] = {
                transform: concatTransform
            } 
            this.setState({
                paneStyles : paneStylesVar
            })
            //this.state.paneStyles[this.state.currentPane] = translateTransform + ' ' + rotateTransform;

            //panes.eq(current_pane).css("transform", "translate(" + posX + "px," + posY + "px) rotate(" + (percent / 2) + "deg)");

            let opa = (Math.abs(deltaX) / this.props.threshold) / 100 + 0.2;
            // if(opa > 1.0) {
            //     opa = 1.0;
            // }
            // if (posX >= 0) {
            //     panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', opa);
            //     panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);
            // } else if (posX < 0) {

            //     panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', opa);
            //     panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);
            // }
        }
    }

    

    render() {
        let panes = [];
        for (var i=0; i < this.paneCount; i++) {
            panes.push(<JTinderPane key={i} paneNumber={i} style={this.state.paneStyles[i]} />);
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

export default JTinderComponent;