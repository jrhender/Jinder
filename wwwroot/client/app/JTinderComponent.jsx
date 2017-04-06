import React from 'react';

import JTinderPane from './JTinderPane.jsx';

class JTinderComponent extends React.Component {

    contructor(props) {
        this.state = {
            currentPane : 0,
            xStart : 0,
            yStart : 0,
            posX : 0,
            posY : 0,

        }
    }

    render() {
        return (
        //start padding container
        <div className="wrap">
            {
                //start jTinder container
            }
            <div id="slideOuter">
            <div id="Tinderslide">
                <ul>
                    <JTinderPane paneNumber="1"/>
                    <JTinderPane paneNumber="2"/>
                </ul>
            </div>
            </div>
            {
                //end jTinder container
            }
        </div>
        //end padding container
        );
    }

}

export default JTinderComponent;