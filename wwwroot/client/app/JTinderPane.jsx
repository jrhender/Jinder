import React from 'react';

class JTinderPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let paneNumber = this.props.paneNumber;
        let likeOpacity = this.props.likeOpacity;
        let dislikeOpacity = this.props.dislikeOpacity;
        let likeStatus = this.props.likeStatus;

        let paneStyle = this.props.transformStyle;
        if(likeStatus == 1 || likeStatus == -1) {
            paneStyle = {visibility: 'hidden'};
        }

        return(
            <li className={"pane"+paneNumber} style={paneStyle}>
                <div className="img"></div>
                <div className="like" style={likeOpacity}></div>
                <div className="dislike" style={dislikeOpacity}></div>
            </li>
        )
                                
    }
}

export default JTinderPane;