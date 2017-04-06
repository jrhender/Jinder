import React from 'react';
import {render} from 'react-dom';

import JTinderComponent from './JTinderComponent.jsx';

import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
  render () {
    return (
        <div>
            <JTinderComponent/>
        </div>
    )
  }
}

render(<App/>, document.getElementById('app'));