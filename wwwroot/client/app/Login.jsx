import React from 'react';
import firebase from '../../firebaseInitialization';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

class Login extends React.Component {

    constructor() {
        super();

        // The component's Local state.
        this.state = {
            isSignedIn: false // Local signed-in state.
        };
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
            <div>
                <h1>Welcome To Jinder!</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            );
        }
        return (
            <div>
                <h1>My App</h1>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
            </div>
        );
    }
}

Login.propTypes = {
};

export default Login;