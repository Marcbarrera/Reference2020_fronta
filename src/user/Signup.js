import React, { Component } from 'react'
import { signup } from '../auth/index.js'
import {Link} from 'react-router-dom'

class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: "",
        open:false
    };

    handleChange = (name) => (event) => {
        this.setState({error:""}) //quan hi ha canvis al formulari els errors no es mostren si shavien mostrat abans
        this.setState({[name]: event.target.value})
    }

    clickSubmit = event => {
        event.preventDefault()
        const { name, email, password} = this.state;
        const user = { name, email, password};

    signup(user).then(data => {
           if(data.error) this.setState({error: data.error})
                else this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
            })
        })
       
    };

    signupForm = (name, email, password) => (
        <form>
                    <div className="name-column">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange ("name")} type="text" value={name} className="form-control" />
                    </div> 
                    <div className="email-column">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange ("email")} type="email" value={email}className="form-control"/>
                    </div>   
                    <div className="password-column">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange ("password")} type="password" value={password} className="form-control"/>
                    </div>     
                    
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
    )

    render() {

        const {name, email, password, error, open} = this.state;
        return (
            <div className="container-sign">
                <h2>SIGN UP</h2>
                <div className="sign-form-box" style={{display:error ? "" : "none"}}>
                    {error}
                </div>
                <div className="account-created" style={{display:open ? "" : "none"}}> 
                    New account created successfully. Please <Link to="/signin">Sign in</Link>.
                </div>
                {this.signupForm(name, email, password)}
            </div>
        );
    }
}


export default Signup;