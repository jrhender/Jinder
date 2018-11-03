import React from 'react';
import {render} from 'react-dom';

import JTinderWrapper from './JTinderWrapper.jsx';
import Login from './Login.jsx';

class App extends React.Component {

    constructor() {
        super();
    }

    render () {
        return (
            <div>
                <Login/>
                <JTinderWrapper/>
            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));