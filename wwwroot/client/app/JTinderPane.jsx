import React from 'react';

class JTinderPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let paneNumber = this.props.paneNumber;
        let transformStyle = this.props.style;
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