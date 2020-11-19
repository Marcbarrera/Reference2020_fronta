import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DefaultUserImage from '../images/User_placeholder_image.png'

class ProfilePicture extends Component {
    state = {
        user:this.props.user,
        error:"",
    }
   
    render() {

    const {user} = this.state;
    const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}`

    return (
            <img  src={photoUrl} className="user-foto"
            onError={i => (i.target.src = `${DefaultUserImage } `)}
            alt={user.name} picture style={{width: "100%"}}/>

        )
    }
}
export default withRouter(ProfilePicture)







   

