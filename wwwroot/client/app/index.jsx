import React from 'react';
import {render} from 'react-dom';

import JTinderPaneWrapper from './JTinderPaneWrapper.jsx';
import JTinderButtons from './JTinderButtons.jsx';

class App extends React.Component {
  render () {
    return (
        <div>
            <JTinderPaneWrapper threshold="1" animationRevertSpeed="200" animationSpeed="400"/>

            <JTinderButtons />
        </div>
    )
  }
}

render(<App/>, document.getElementById('app'));