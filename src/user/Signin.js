import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {signin, authenticate} from '../auth/index'
import SocialLogin from './SocialLogin'

class Signin extends Component {
    state = {
        email: "",
        password: "",
        error: "",
        redirectToReferer: false
    }

    handleChange = (name) => (event) => {
        this.setState({error:""}) //quan hi ha canvis al formulari els errors no es mostren si s'havien mostrat abans
        this.setState({[name]: event.target.value})
    }
    

    clickSubmit = event => {
        event.preventDefault()
        const {email, password} = this.state;
        const user = {email, password};

    signin(user).then(data => {
           if(data.error) {
           this.setState({error: data.error})
           }
            else {
                //autenticar
                authenticate(data, () => {
                this.setState({redirectToReferer: true})
                })
                //redirigir        
            }
       })
    };


    signinForm = (email, password) => (
        <form>
                    
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

        const {email, password, error, redirectToReferer} = this.state;

        if (redirectToReferer){
            return <Redirect to="/"/>
        }
        return (
            <div className="container-sign">
                <h2> SIGN IN</h2>
                <p> To keep enjoying our content</p>
                <div className="sign-form-box" style={{display:error ? "" : "none"}}>
                    {error}
                </div>
                {this.signinForm(email, password)}
            </div>
        )
    }
}

export default Signin