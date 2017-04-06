import React from 'react';

class JTinderPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var paneNumber = this.props.paneNumber;
        return(
            <li className={"pane"+paneNumber}>
                <div className="img"></div>
                <div>Miami Beach</div>
                <div className="like"></div>
                <div className="dislike"></div>
            </li>
        )
                                

    }
}

export default JTinderPane;