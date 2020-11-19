import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import {read} from "./apiUser"
import DefaultUserImage from '../images/User_placeholder_image.png'
import DeleteUser from './DeleteUser'
import {listByUser} from '../post/apiPost'



class Profile extends Component {
    state = {
        user: '',
        redirectToSignin: false,
        error:"",
        posts: []
    }
 
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true});
            } else {
                this.setState({user: data});
                // this.loadPosts(data._id)
            }
        })
    }

    // loadPosts = userId => {
    //     const token = isAuthenticated().token;
    //     listByUser(userId, token).then(data => {
    //         if(data.error){
    //             console.log(data.error);
    //         } else {
    //             this.setState({ posts:data})
    //         }
    //     })

    // }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId); 
        console.log("holaaaaa")     
        console.log(this.props)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);      
    }




    render() {

    const {redirectToSignin, user, posts} = this.state;
    if(redirectToSignin) return <Redirect to="/signin"/> 


    const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
    : DefaultUserImage; 


    return (

        <section className="profile">
                                <h2>Profile</h2>

            <div className="container">
                <div className="first-column">
                    <div className="users-list-image">
                        <img className="card-image-top" src={photoUrl}
                        onError={i => (i.target.src = `${DefaultUserImage}`)}
                        alt={user.name} picture style={{width: "100%"}}/>
                    </div>
                    <div className="users-card-body">
                    <p>Hello {user.name}{" "}{user.last_name}</p>
                        <p>Email {user.email}</p>
                        <p>Bio {user.bio}</p>
                        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                        <div>
                            posts={posts}
                        </div>
                    </div>
                </div>
                <div className="second-column">
                    {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
                        <div className="options-profile-buttons">
                            <button><Link 
                                className="edit-button" 
                                to={`/user/edit/${this.state.user._id}`}>
                                Edit profile
                            </Link>
                            </button>
                            <DeleteUser userId={user._id}/>
                                
                        </div>
                    )}
                    </div>
                    
             </div>
        </section>
        )
    }
}

export default Profile;