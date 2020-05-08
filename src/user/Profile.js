import React, { Component } from 'react'
import { isAuthenticated } from '../auth'

 class Profile extends Component {
    state = {
        user: "",
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <h2>Profile</h2>
        <p>Hello {isAuthenticated().user.name}</p>
        <p>Email {isAuthenticated().user.email}</p>

                 
                
                
            </div>
        )
    }
}

export default Profile