import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import {read} from "./apiUser"


class Profile extends Component {
    state = {
        user: '',
        redirectToSignin: false,
    }

 
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true});
            } else {
                this.setState({user: data});
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);      
    }


    render() {

    const redirectToSignin = this.state.redirectToSignin
    if(redirectToSignin) return <Redirect to="/signin"/> 

    return (

        <section className="profile">
                                <h2>Profile</h2>

            <div className="container">
                <div className="first-column">
                     <p>Hello {isAuthenticated().user.name}</p>
                     <p>Email {isAuthenticated().user.email}</p>
                     <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                </div>
                <div className="second-column">
                    {isAuthenticated().user && isAuthenticated().user._id == this.state.user._id && (
                        <div className="options-profile-buttons">
                            <button><Link 
                                className="edit-button" 
                                to={`/user/edit/${this.state.user._id}`}>
                                Edit profile
                            </Link>
                            </button>
                                
                        </div>
                    )}
                    </div>
                    
             </div>
        </section>
        )
    }
}

export default Profile;