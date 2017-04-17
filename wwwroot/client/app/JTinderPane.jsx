import React from 'react';

class JTinderPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var paneNumber = this.props.paneNumber;
        var transformStyle = this.props.style;
        return(
            <li className={"pane"+paneNumber} style={transformStyle}>
                <div className="img"></div>
                <div>Miami Beach</div>
                <div className="like"></div>
                <div className="dislike"></div>
            </li>
        )
                                

    }
}

export default JTinderPane;