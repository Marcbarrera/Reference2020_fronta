import React, { Component } from 'react'
import { isAuthenticated } from '../auth/index'
import {create} from './apiPost'
import { Redirect } from 'react-router-dom'
// import DefaultUserImage from '../images/User_placeholder_image.png'


class WriteAPost extends Component {
    state = {
        title:'',
        body:'',
        photo:'',
        error:'',
        user: {},
        prova:{},
        fileSize : 0,
        loading: false,
        redirectToProfile:false
    }


    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user})
        console.log(this.state)
        
    }

    isValid = () => {
        const { title, body, fileSize} = this.state

        if (fileSize > 1500000) {
            this.setState({error: "File size should be less than 1.5Mb"})
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({error: "All fields are required", loading:false})
            return false;
        }
        return true
    }

    handleChange = name => event => {
        this.setState({error:''})
        const value = name ==='photo' ? event.target.files[0] : event.target.value

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        this.postData.set(name, value)
        this.setState({[name]: value, fileSize})
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
    
     
        if (this.isValid()) {
            const userId = isAuthenticated().userId;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error){
                     this.setState({ error: data.error });
                }
                else {
                    this.setState({ loading:false, title: '', body:'', photo: ''})
                }
            });
        }
    };
    
   



    

    newPostForm = (title, body) => (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Profile Picture</label>
                        <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" />
                    </div> 
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange ("title")} type="text" value={title} className="form-control" />
                    </div> 
                      
                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange("body")} type="text" value={body} className="form-control" />
                    </div>  
                    
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Create Post
                    </button>
                </form>
    )

    render() {
        const { title, body, photo, user, error, loading, redirectToProfile} = this.state;

        if (redirectToProfile){
            return <Redirect to={`/user/${user._id}`}/>
        }

     

        return (
            <div className="container">
                <h2>Write a post</h2>
                
                <div className="alert" style={{display:error ? "" : "none"}}>
                    {error}
                </div>

               
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

                {/* <img src={photoUrl}
                onError={i => (i.target.src = `${DefaultUserImage}`)}
                alt={name}/> */}

                {this.newPostForm(title, body)}

            </div>
    )
    }
}

export default WriteAPost;