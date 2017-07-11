import React from 'react';

class JTinderButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="actions-wrap"> 
                <div className="actions">
                    <a href="#" className="profile"><img src="../img/happyFace.png"/></a>
                    <a href="#" className="dislike"><img onClick={this.props.handleDislike} src="../img/dislike_button.png"/></a>
                    <a href="#" className="like"><img onClick={this.props.handleLike} src="../img/like_button.png"/></a>
                </div>
            </div>
        )
                                
    }
}

export default JTinderButtons;