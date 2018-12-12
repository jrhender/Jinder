import React from 'react';
import JinderMenu from './JinderMenu.jsx';
import JTinderWrapper from './JTinderWrapper.jsx';

class CoreFunctionality extends React.Component {

    constructor() {
        super();
    }

    render () {
        if (this.props.isSignedIn) {
            return (
                <div className={'layoutGrid wrapper'}>
                    <div >
                        <JinderMenu/>  
                    </div>
                    <div> 
                        <JTinderWrapper/>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div/>
            )
        }
    }
}

export default CoreFunctionality;