import React from 'react';

class MatchModal extends React.Component {

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
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      zIndex: 4
    };

    const imgCircle = {
    borderRadius: 50,
    height: '30vw',
    width: '50%',
    };

    return (
      <div className="backdrop" style={backdropStyle} onClick={this.props.onClose}>
        <div style={modalStyle} onClick={this.stopEventPropagation.bind(this)}>
          {/*{this.props.children}*/}
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
              <h2>It's a Match!</h2>
          <h3>You and John have liked each-other</h3>
          <div>
              <img className="img-circle" src="/img/pane/matchFace.jpg" style={imgCircle}/>
              <img className="img-circle" src={"/img/pane/pane"+this.props.currentPane+".jpg"} style={imgCircle}/>
          </div>   
        </div>
      </div>
    );
  }
}

MatchModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};

export default MatchModal;