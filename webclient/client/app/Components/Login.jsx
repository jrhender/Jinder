import React from 'react';
import firebase from '../Services/firebaseInitialization';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    credentialHelper: 'none',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }
  };

class Login extends React.Component {

    constructor() {
        super();
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                if(user !== undefined) {
                    var newState = !!user;
                    this.props.handleSignInChange(newState);
                }
            }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (!this.props.isSignedIn) {
            return (
            <div style={{marginTop: '100px'}}>
                <h1 style={loginStyle}>Welcome To Jinder!</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            );
        }
        return (
            null
        );
    }
}

var loginStyle = { 'textAlign' : 'center' };

Login.propTypes = {
};

export default Login;