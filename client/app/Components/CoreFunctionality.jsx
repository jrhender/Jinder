import React from 'react';
import JinderMenu from './JinderMenu.jsx';
import JinderSetup from './JinderSetup.jsx';
import JTinderWrapper from './JTinderWrapper.jsx';

class CoreFunctionality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appArea : 'Jinder'
        };
        this.navigateToSetupArea = this.navigateToSetupArea.bind(this);
        this.navigateToJinderArea = this.navigateToJinderArea.bind(this);
    }

    navigateToSetupArea(event) {
        event.preventDefault();
        this.setState({
            appArea : 'Setup'
        })
    }

    navigateToJinderArea(event) {
        event.preventDefault();
        this.setState({
            appArea : 'Jinder'
        })
    }

    render () {
        if (this.props.isSignedIn) {
            if (this.state.appArea === 'Jinder') {
                return (
                    <div className={'layoutGrid wrapper'}>
                        <div >
                            <JinderMenu
                                navigateToJinderArea={this.navigateToJinderArea}
                                navigateToSetupArea={this.navigateToSetupArea}
                            />  
                        </div>
                        <div> 
                            <JTinderWrapper/>
                        </div>
                    </div>
                )
            }
            else if (this.state.appArea === 'Setup') {
                return (
                    <div className={'layoutGrid wrapper'}>
                        <div >
                            <JinderMenu
                                navigateToJinderArea={this.navigateToJinderArea}
                                navigateToSetupArea={this.navigateToSetupArea}
                            />  
                        </div>
                        <div style={{marginTop: '100px'}}> 
                            <JinderSetup/>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <p>You've navigated to a magically mystery area :O</p>
                )
            }
        }
        else {
            return(
                <div/>
            )
        }
    }
}

export default CoreFunctionality;