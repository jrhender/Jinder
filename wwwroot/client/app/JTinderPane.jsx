import React from 'react';
import {Motion} from 'react-motion';

class JTinderPane extends React.Component {

    constructor(props) {
        super(props);
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
                            <div className="img"></div>
                            <div className="like" style={likeOpacity}></div>
                            <div className="dislike" style={dislikeOpacity}></div>
                        </li>
                    )}}
            </Motion>
        )
                                
    }
}

export default JTinderPane;