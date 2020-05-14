import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {read, update, updateUser} from './apiUser'
import { Redirect } from 'react-router-dom'
import DefaultUserImage from '../images/User_placeholder_image.png'


class Editprofile extends Component {
    state = {
        id: "",
        name: "",
        last_name:'',
        email: "",
        password: "",
        bio:"",
        redirectToProfile: false,
        error:"",
        fileSize: 0,
        loading: false,
        mini_description:""
    }




    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true});
            } else {
                this.setState({ id: data._id, name: data.name, email: data.email, error:'', bio:data.bio, mini_description: data.mini_description });
            }
        })
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);      
    }

    isValid = () => {
        const {name, email, password, fileSize} = this.state

        if (fileSize > 500000) {
            this.setState({error: "File size should be less than 500kb"})
            return false;
        }
        if (name.length === 0) {
            this.setState({error: "Name is required", loading:false})
            return false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({error: "A valid email is required", loading:false})
            return false;
        }

        if (password.length >= 1 && password.length <= 7) {
            this.setState({
              error: "Password must be at least 8 characters long", loading:false
        })
            return false;
        }
        return true
    }

    handleChange = name => event => {
        this.setState({error:''})
        const value = name ==='photo' ? event.target.files[0] : event.target.value

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        this.userData.set(name, value)
        this.setState({[name]: value, fileSize})
    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

        update(userId, token, this.userData).then(data => {
           if(data.error) this.setState({error: data.error});
                else
                updateUser(data, ()=> {
                    this.setState({
                    redirectToProfile: true
                }) 
               
            });
        })

        }
       
    };

    

    updateForm = (name, last_name, email, password, mini_description, facebook, twitter, youtube, instagram, linkedin, genre, bio) => (
        <form>
                    <div className="form-first-row">

                        <div className="form-first-row-first-column">
                        <div className="form-group">

                            <label className="text-muted">Profile Picture</label>
                            <input onChange={this.handleChange ("photo")} type="file" accept="image/*" className="form-control" />
                        </div>
                        </div>

                    
                        <div className="form-first-row-second-column"> 

                            <div className="form-group">
                               <label className="text-muted">Name</label>
                               <input onChange={this.handleChange ("name")} type="text" value={name} className="form-control" />
                            </div> 
                            <div className="form-group">
                                <label className="text-muted">Last name </label>
                                <input onChange={this.handleChange ("last_name")} type="text" value={last_name} className="form-control" />
                            </div>
                            <div className="form-group">
                             <label className="text-muted">Email</label>
                             <input onChange={this.handleChange ("email")} type="email" value={email}className="form-control"/>
                            </div>   
                            <div className="form-group">
                              <label className="text-muted">Password</label>
                              <input onChange={this.handleChange ("password")} type="password" value={password} className="form-control"/>
                            </div>
                            <div className="form-group">
                               <label className="text-muted">Mini description</label>
                               <input onChange={this.handleChange ("mini_description")} type="text" value={mini_description} className="form-control" />
                            </div>     
                            
                        </div> 
                    </div> 
                    <div className="form-second-row">
                        
                        <div className="form-second-row-first-column">

                            <div className="form-group">
                               <label className="text-muted">Facebook</label>
                               <input onChange={this.handleChange ("facebook")} type="text" value={facebook} className="form-control" />
                            </div>
                            <div className="form-group">
                               <label className="text-muted">Twitter</label>
                               <input onChange={this.handleChange ("twitter")} type="text" value={twitter} className="form-control" />
                            </div>
                            <div className="form-group">
                               <label className="text-muted">Youtube</label>
                               <input onChange={this.handleChange ("youtube")} type="text" value={youtube} className="form-control" />
                            </div>
                            <div className="form-group">
                               <label className="text-muted">Instagram</label>
                               <input onChange={this.handleChange ("instagram")} type="text" value={instagram} className="form-control" />
                            </div>
                            <div className="form-group">
                               <label className="text-muted">Linkedin</label>
                               <input onChange={this.handleChange ("linkedin")} type="text" value={linkedin} className="form-control" />
                            </div>
                        </div>
                        <div className="form-second-row-second-column"> 

                            <div className="form-group">
                               <label className="text-muted">Genre</label>
                               <input onChange={this.handleChange ("genre")} type="text" value={genre} className="form-control" />
                            </div> 
                            <div className="form-group">
                               <label className="text-muted">Bio</label>
                               <textarea onChange={this.handleChange ("bio")} type="text" value={bio} className="form-control-area" />
                            </div>
                            
                        </div> 
                    </div> 
                    <div className="edit-profile-button">
                            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                                Update
                            </button>
                    </div>
        </form>
    )

    render() {
        const {id, name, last_name, email, password, mini_description, facebook, twitter, youtube, instagram, linkedin, genre, bio, redirectToProfile, error, loading} = this.state;

        if (redirectToProfile){
            return <Redirect to={`/user/${id}`}/>
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
        : DefaultUserImage; 


        return (
            <section className="edit-profile-section">
                <div className="container">
                    <h2>Edit Profile</h2>
                    
                    <div className="alert" style={{display:error ? "" : "none"}}>
                        {error}
                    </div>

                
                    {loading ? (
                    <div className="text-center">
                        <h2>Loading...</h2>
                    </div>
                    ) : (
                    ""
                    )}

                    {/* <img src={photoUrl}
                    onError={i => (i.target.src = `${DefaultUserImage}`)}
                    alt={name}/> */}

                    {this.updateForm(name, last_name, email, password, mini_description, facebook, twitter, youtube, instagram, linkedin, genre, bio)}

                </div>
            </section>
        )
        
    }
}

export default Editprofile;