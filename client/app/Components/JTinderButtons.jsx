import React from 'react';
import ProfileModal from './ProfileModal.jsx';

class JTinderButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileText : "",
            profileModalIsOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(ev) {
        this.setState((prevState) => { 
            return {
                profileModalIsOpen: !prevState.profileModalIsOpen
            }
        });
      }

    render() {
        return(
            <div className="actions-wrap"> 
                <div className="actions">
                    <div className="profile"><img onClick={this.toggleModal} src="img/happyFace.png"/></div>
                    <div className="dislike"><img onClick={this.props.handleDislike} src="img/dislike_button.png"/></div>
                    <div className="like"><img onClick={this.props.handleLike} src="img/like_button.png"/></div>
                </div>
                <ProfileModal currentPane={this.props.currentPane} closeModal={this.toggleModal} show={this.state.profileModalIsOpen}/>
            </div>
        )
                                
    }
}

export default JTinderButtons;