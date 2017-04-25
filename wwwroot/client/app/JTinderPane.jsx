import React from 'react';

class JTinderPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let paneNumber = this.props.paneNumber;
        let transformStyle = this.props.transformStyle;
        let likeOpacity = this.props.likeOpacity;
        let dislikeOpacity = this.props.dislikeOpacity;

        return(
            <li className={"pane"+paneNumber} style={transformStyle}>
                <div className="img"></div>
                <div>Miami Beach</div>
                <div className="like" style={likeOpacity}></div>
                <div className="dislike" style={dislikeOpacity}></div>
            </li>
        )
                                
    }
}

export default JTinderPane;