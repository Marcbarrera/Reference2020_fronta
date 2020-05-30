import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import PropTypes from "prop-types";
import {read} from './apiUser'
import { withRouter, Redirect } from 'react-router-dom'
import DefaultUserImage from '../images/User_placeholder_image.png'

class ProfilePicture extends Component {
    state = {
        user:this.props.user,
        error:"",
    }
   
    render() {

    const {user} = this.state;

    const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`

    return (

  

                        <img  src={photoUrl} className="putafoto"
                        onError={i => (i.target.src = `${DefaultUserImage}`)}
                        alt={user.name} picture style={{width: "10%"}}/>
                    
                           
                                
                    
    
        )
    }
}
export default withRouter(ProfilePicture)







   

