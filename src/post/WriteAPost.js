import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {create, addPhoto} from './apiPost'
import { Redirect } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';



class WriteAPost extends Component {
    state = {
        title:'',
        body:'',
        photo1:'',
        photo2:'',
        photo_target:'',
        photo_reference:'',
        error:'',
        user: {},
        fileSize : 0,
        category: '',
        target_content: '',
        reference_content:'',
        youtube_target:'',
        youtube_reference:'',
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
        
        // if (title.length === 0 || body.length === 0) {
            if (title.length === 0)  {
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

        if ((name === "photo1") || name === "photo2" || name === "photo_target" || name === "photo_reference") {
            value = event.target.files[0] 
        }else{
            value = event.target.value;
        }

       if ((name === "photo1") || name === "photo2" || name === "photo_target" || name === "photo_reference") {
            fileSize = event.target.files[0].size
        }else{
            fileSize = 0;
        } 
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
        // this.setState({ [name]: value1, fileSize1 });

    };

    DropdownChange = (e) =>{ 
        this.postData.set([e.target.name], e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }
    
    DropdownContentChangeTarget = (e) => {
        this.postData.set([e.target.name], e.target.value)
        this.setState({[e.target.name]: e.target.value})
        
    }

    DropdownContentChangeReference = (e) => {
        this.postData.set([e.target.name], e.target.value)
        this.setState({[e.target.name]: e.target.value})
        
    }


    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        
     
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;  //aquí estava l'error
            const token = isAuthenticated().token;
           
            create(userId, token, this.postData).then(data => {
                console.log(data)
                if (data.error){
                this.setState({ error: data.error });
                }
                
                else {
                    // console.log("new post",data)
                    this.setState({ loading:false, title: '', body:'', photo1: '', photo2: '', photo_target:'', redirectToProfile: true})
                }
            });
        }
    };
    
   handleUploadPhoto = name => e => {
    this.setState({ error: "" });
    this.postData.set(name, e.target.value);
    const token = isAuthenticated().token;
    addPhoto(token, this.postData)
        .then(r => this.setState({[name]: r.image}))
        .catch(e => console.log(e))
   }

    handleOnChange = (body) => {
        this.postData.set('body', body)
       this.setState({body})
}
   



    

    // newPostForm = (title, body) => (
        
    // )

    render() {
        const {  title, body, user, category, target_content,reference_content, error, youtube_target, youtube_reference, loading, redirectToProfile} = this.state;
        console.log(body)
        if (redirectToProfile){
            return <Redirect to={`/user/${user._id}`}/> 
        }


        // const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
        // : DefaultUserImage; 
     

        return (
           <section className="write-a-post-section"> 
            <div className="container">
                <h2>WRITE A POST</h2>
                
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

                {/* {this.newPostForm(title, body)} */}

                <form>
                    <div className="title-group">
                        <label className="text-muted"><h3>Title</h3></label>
                        <input onChange={this.handleChange ("title")} type="text" value={title} className="form-control" />
                    </div> 
                    <hr class="style7"/>


                    <div className="category-select-row">
                        <label className="text-muted"><h3>Category</h3></label>
                            <select className="select-input" name='category' value={category} onChange = {this.DropdownChange}>
                                <option value = "Music" selected>Music</option>
                                <option value = "Cinema">Cinema</option>
                                <option value = "Painting">Painting</option>
                                <option value = "Fashion">Fashion</option>
                                <option value = "Literature">Literature</option>
                                <option value = "Photography">Photography</option>
                            </select>
                    </div>
                    <hr class="style7"/>

                    <div className="presentation">
                        <h3>
                            Presentation
                        </h3>
                        <p>
                            Upload the thumbnail pictures that will show up as a presentation of your post
                        </p>
                    </div>
                    <div className="thumbnails-wrapper">
                        <div className="first-thumbnail">
                            <label className="text-muted">First thumbnail</label>
                            <input onChange={this.handleChange("photo1")} type="file" accept="image/*" className="form-control" />
                        </div> 
                        <div className="spacer-column">

                        </div>
                        <div className="second-thumbnail">
                            <label className="text-muted">Second thumbnail</label>
                            <input onChange={this.handleChange("photo2")} type="file" accept="image/*" className="form-control" />
                        </div> 
                    </div>
                   
                    <hr class="style7"/>

                    <h3 className="content-title">Content</h3>
                    <p className="content-explanation">Select the type of content of the <strong>TARGET</strong></p>
                    <div className="form-group">
                        <label className="text-muted">Target content</label>
                        <select name='target_content' value={target_content} onChange = {this.DropdownContentChangeTarget}>
                            <option value = ""></option>
                            <option value = "Youtube">Youtube video</option>
                            <option value = "Picture">Upload a Picture</option>
                        </select>
                    </div>
                    

                    {this.state.target_content==='Youtube' ?
                        <div className="form-group">
                            <label className="text-muted">Youtube link</label>
                            <input onChange={this.handleChange ("youtube_target")} type="text" value={youtube_target} className="form-control" />
                        </div> 

                     : 
                     
                     <div className="form-group">
                        <label className="text-muted">Target Picture</label>
                        <input onChange={this.handleChange("photo_target")} type="file" accept="image/*" className="form-control" />
                    </div> 
                    }
                    <hr class="style7"/>

                    <h4>Select the type of content of the <strong>REFERENCE</strong></h4>
                    <div className="form-group">
                        <label className="text-muted">Reference content</label>
                        <select name='reference_content' value={reference_content} onChange = {this.DropdownContentChangeReference}>
                            <option value = ""></option>
                            <option value = "Youtube">Youtube video</option>
                            <option value = "Picture">Upload a Picture</option>
                        </select>
                    </div>

                    {this.state.reference_content==='Youtube' ?
                        <div className="form-group">
                            <label className="text-muted">Youtube link</label>
                            <input onChange={this.handleChange ("youtube_reference")} type="text" value={youtube_reference} className="form-control" />
                        </div> 

                     : 
                     
                     <div className="form-group">
                        <label className="text-muted">Reference Picture</label>
                        <input onChange={this.handleChange("photo_reference")} type="file" accept="image/*" className="form-control" />
                    </div> 
                    }
                    

                   

                    <div className="form-group">
                    <hr class="style7"/>

                        <label className="text-muted"><h3>Explanation</h3></label>

                        {/* <textarea id="mytextarea" onChange={() => this.handleChange("body")} type="text" value={body} className="form-control"/> */}
                     <Editor
                        initialValue=""
                        init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={this.handleOnChange}
                    />
                       
                        {/* <textarea onChange={this.handleChange("body")} type="text" value={body} className="form-control"/> */}
                 
                    </div>  
                    
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Create Post
                    </button>
                </form>

            </div>
            </section>
        )
    }
}

export default WriteAPost;