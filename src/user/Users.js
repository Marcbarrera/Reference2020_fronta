import React, { Component } from 'react'
import {list} from "./apiUser"
import {Link} from 'react-router-dom'
import DefaultUserImage from '../images/User_placeholder_image.png'

 class Users extends Component {
    state = {
        users: []
    }


    componentDidMount () {
        list().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({users: data})
            }
        });
    }

    render() {
        const {users} = this.state;
        return (
            <div className="users-section">
                <h2>users</h2>
                <div className="container">
                    <div className="users-row-wrapper">
                            {users.map((user, i) =>(
                            <div key={i} className="users-card">
                                <div className="users-card-top">
                                    <img className="card-image-top" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                                    onError={i => (i.target.src = `${DefaultUserImage}`)}
                                    alt={user.name} picture style={{width: "100%"}}/>
                                </div>
                                <div className="users-card-bottom">
                                    <p>{user.name}</p>
                                    <p>{user.bio}</p>
                                    <Link to={`/user/${user._id}`} className="view-profile-button">
                                    view Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        );
    }
}
export default Users;