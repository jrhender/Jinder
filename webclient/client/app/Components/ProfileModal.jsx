import React from 'react';
import PropTypes from 'prop-types';

class ProfileModal extends React.Component {

  constructor(props) {
    super(props);
  }

  stopEventPropagation(e) {
    e.stopPropagation();
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 3
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: '90%',
      minHeight: 300,
      margin: '0 auto',
      padding: 20,
      zIndex: 4
    };

    const imgCircle = {
      borderRadius: 50,
      height: '30vw',
      width: '45%',
      marginLeft: '2%',
      marginRight: '2%'
    };

    return (
      <div className="backdrop" style={backdropStyle} onClick={this.props.closeModal}>
        <div style={modalStyle} onClick={this.stopEventPropagation.bind(this)}>
          <p onClick={this.props.closeModal} style={{fontWeight: "bold", cursor: "pointer", textAlign: 'right' }}>
            X
          </p>
          <h3>{this.props.profileText}</h3>
        </div>
      </div>
    );
  }
}

ProfileModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  profileText: PropTypes.string.isRequired,
  show: PropTypes.bool
};

export default ProfileModal;