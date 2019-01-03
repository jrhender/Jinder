import * as React from 'react'

const JinderProfileImage = ({imageUrl}) => {
    if(imageUrl) {
        return(
            <img src={imageUrl} />
        );
    }
    else {
        return(
            <p>No profile image</p>
        )
    }
}

export default JinderProfileImage