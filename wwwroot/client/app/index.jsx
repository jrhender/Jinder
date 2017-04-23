import React from 'react';
import {render} from 'react-dom';

import JTinderComponent from './JTinderComponent.jsx';

class App extends React.Component {
  render () {
    return (
        <div>
            <JTinderComponent threshold="1" animationRevertSpeed="200" animationSpeed="400"/>
        </div>
    )
  }
}

render(<App/>, document.getElementById('app'));