import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {create} from './apiPost'
import { Redirect } from 'react-router-dom'



class WriteAPost extends Component {
    state = {
        title:'',
        body:'',
        photo1:'',
        photo2:'',
        error:'',
        user: {},
        fileSize : 0,
        loading: false,
        redirectToProfile:false
    }


    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, body, fileSize} = this.state;
        if (fileSize > 1500000) {
            this.setState({
                error: "File size should be less than 1,5Mb",
                loading: false
            });
            return false;
        }
        
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

  

    // handleChange = name => event => {
    //     this.setState({ error: "" });
    //     const value =
    //         name === "1" ? event.target.files[0] : event.target.value;

    //     const fileSize = name === "photo" ? event.target.files[0].size : 0;
    //     this.postData.set(name, value);
    //     this.setState({ [name]: value, fileSize });
    // };

    handleChange = name => event => {
        this.setState({ error: "" });
        let value;
        let fileSize;
        
        if ((name === "photo1") || name === ("photo2")) {
             value = event.target.files[0] }
             else {
                value = event.target.value;}

       if ((name === "photo1") || name === ("photo2")) {
            fileSize = event.target.files[0].size}
            else{
            fileSize = 0;
            } 

        this.postData.set(name, value);


        this.setState({ [name]: value, fileSize });
        // this.setState({ [name]: value1, fileSize1 });


    };



    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
    
     
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;  //aquí estava l'error
            const token = isAuthenticated().token;
           


            create(userId, token, this.postData).then(data => {

                if (data.error){
                this.setState({ error: data.error });
                }
                
                else {
                    
                    console.log("new post",data)
                    this.setState({ loading:false, title: '', body:'', photo1: '', photo2: '', redirectToProfile: true})
                }
            });
        }
    };
    
   



    

    // newPostForm = (title, body) => (
        
    // )

    render() {
        const {  title, body, photo1, photo2, user, error, loading, redirectToProfile} = this.state;

        if (redirectToProfile){
            return <Redirect to={`/user/${user._id}`}/> 
        }


        // const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
        // : DefaultUserImage; 
     

        return (
            <div className="container">
                <h2>Write a post</h2>
                
                <div className="alert" style={{display:error ? "" : "none"}}>
                    {error}
                </div>
                {/* {loading ? (
                <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>
                ) : (
                ""
                )} */}

                {/* <img src={photoUrl}
                onError={i => (i.target.src = `${DefaultUserImage}`)}
                alt={name}/> */}

                {/* {this.newPostForm(title, body)} */}

                <form>
                    <div className="form-group">
                        <label className="text-muted">first Picture</label>
                        <input onChange={this.handleChange("photo1")} type="file" accept="image/*" className="form-control" />
                    </div> 
                    <div className="form-group">
                        <label className="text-muted">second Picture</label>
                        <input onChange={this.handleChange("photo2")} type="file" accept="image/*" className="form-control" />
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

            </div>
        )
    }
}

export default WriteAPost;