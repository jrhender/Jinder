import React from 'react';
import {render} from 'react-dom';

import CoreFunctionality from './CoreFunctionality.jsx';
import Login from './Login.jsx';

class App extends React.Component {

    constructor() {
        super();
        this.handleSignInChange = this.handleSignInChange.bind(this);
        this.state = {
            isSignedIn: false // Local signed-in state.
        };
    }

    handleSignInChange(newSignInState) {
        this.setState({isSignedIn : newSignInState});
    }

    render () {
        return (
            <div style={{textAlign: 'center'}}>
                <Login isSignedIn={this.state.isSignedIn} handleSignInChange={this.handleSignInChange}/>
                <CoreFunctionality isSignedIn={this.state.isSignedIn} />
            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));