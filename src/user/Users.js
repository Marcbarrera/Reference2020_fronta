import React, { Component } from 'react'
import {list} from "./apiUser"

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
        const {users} = this.state
        return (
            <div className="container">
                <h2>users</h2>
                <div className="card">
                    {users.map((user, i) =>(
                        <p>{user.name}</p>
                    ))}
                </div>
            </div>
        );
    }
}
export default Users