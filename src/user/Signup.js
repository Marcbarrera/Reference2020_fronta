import React, { Component } from 'react'

class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: "",
        open: false

    }

    handleChange = (name) => (event) => {
        this.setState({error:""}) //quan hi ha canvis al formulari els errors no es mostren si shavien mostrat abans
        this.setState({[name]: event.target.value})
    }
    

    clickSubmit = event => {
        event.preventDefault()
        const {name, email, password} = this.state;
        const user = {name, email, password};

       this.signup(user)
       .then(data => {
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

    signup = (user) => {
         return fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                Accept: "aplication/json",
                "content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log (err))
    }

    signupForm = (name, email, password) => (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange ("name")} type="text" value={name} className="form-control" />
                    </div> 
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

        const {name, email, password, error, open} = this.state;
        return (
            <div className="container">
                <h1>Signup</h1>
                <div className="alert alert-primary" style={{display:error ? "" : "none"}}>
                    {error}
                </div>
                <div className="alert alert-primary" style={{display:open ? "" : "none"}}>
                    New account created successfully. Please signin.
                </div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default Signup
