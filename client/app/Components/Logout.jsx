import React from 'react';
import firebase from '../Services/firebaseInitialization';

class Logout extends React.Component {

    render() {
        return (
            <div style={logoutStyle}>
                {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
            </div>
        );
    }
}

var logoutStyle = { 'textAlign' : 'center', 'marginTop':'30px' };

Logout.propTypes = {
};

export default Logout;