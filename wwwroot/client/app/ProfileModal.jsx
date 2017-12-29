import React from 'react';

class ProfileModal extends React.Component {

  constructor(props) {
    super(props);
  }

  stopEventPropagation(e) {
    e.stopPropagation();
  }

  getProfileText() {
    let currentPane = this.props.currentPane;
    if(currentPane == 4) {
        return "Nothing on his baby face is particularly pretty, but somehow it all just works together"
    }
    else if(currentPane == 3) {
        return "He's smarter than two dumb guys!"
    }
    else if(currentPane == 2) {
        return "He hates how intimidated people get when they see his muscular biceps."
    }
    else if(currentPane == 1) {
        return "He oozes class from every pore. No wonder his face is shiny"
    }
    else if(currentPane == 0) {
        return "Impossible to resist his unhinged joy!"
    }
    else {
        return "What a mystery man..."
    }
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
          <h3>{this.getProfileText()}</h3>
        </div>
      </div>
    );
  }
}

ProfileModal.propTypes = {
  closeModal: React.PropTypes.func.isRequired,
  profileText: React.PropTypes.string,
  show: React.PropTypes.bool
};

export default ProfileModal;