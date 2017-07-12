import React from 'react';

class JTinderButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="actions-wrap"> 
                <div className="actions">
                    <div className="profile"><img src="../img/happyFace.png"/></div>
                    <div className="dislike"><img onClick={this.props.handleDislike} src="../img/dislike_button.png"/></div>
                    <div className="like"><img onClick={this.props.handleLike} src="../img/like_button.png"/></div>
                </div>
            </div>
        )
                                
    }
}

export default JTinderButtons;