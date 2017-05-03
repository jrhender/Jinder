import React from 'react';

class JTinderButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="actions-wrap"> 
                <div className="actions">
                    <a href="#" className="profile"><i></i></a>
                    <a href="#" className="dislike"><i></i></a>
                    <a href="#" className="like"><i></i></a>
                </div>
            </div>
        )
                                
    }
}

export default JTinderButtons;