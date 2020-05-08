import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {signin, authenticate} from '../auth/index'

class Signin extends Component {
    state = {
        email: "",
        password: "",
        error: "",
        redirectToReferer: false


    }

    handleChange = (name) => (event) => {
        this.setState({error:""}) //quan hi ha canvis al formulari els errors no es mostren si shavien mostrat abans
        this.setState({[name]: event.target.value})
    }
    

    clickSubmit = event => {
        event.preventDefault()
        const {email, password} = this.state;
        const user = {email, password};

       signin(user)
       .then(data => {
           if(data.error) 
           this.setState({error: data.error})
            else {
                //autenticar
                authenticate(data, ()=>{
                this.setState({redirectToReferer:true})
                })
                //redirigir        
            }
       })
    };


    signinForm = (email, password) => (
        <form>
                    
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange ("email")} type="email" value={email}className="form-control"/>
                    </div>   
                    <div className="form-group">
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
            <div className="container">
                <h1>Signin</h1>
                <div className="alert alert-primary" style={{display:error ? "" : "none"}}>
                    {error}
                </div>
                {this.signinForm(email, password)}
            </div>
        )
    }
}

export default Signin
