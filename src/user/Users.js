import React, { Component } from 'react'
// import {list} from "./apiUser"

 class Users extends Component {
    state = {
        users: []
    }


    componentDidMount () {
        this.list().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({users: data})
            }
        });
    }

    render() {
        return (
            <div className="container">
                <h2>users</h2>
                
            </div>
        )
    }
}
export default Users