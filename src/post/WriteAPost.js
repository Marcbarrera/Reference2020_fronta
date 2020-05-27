import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {create, addPhoto} from './apiPost'
import { Redirect } from 'react-router-dom'
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




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
    this.postData.set('preorder', e.target.value);
    const token = isAuthenticated().token;
    addPhoto(token, this.postData)
        .then(r => this.setState({[name]: r.image}))
        .catch(e => console.log(e))
   }

    handleOnChange = (e, editor) => {
    console.log(editor.getData())
    this.setState({body:editor.getData})
}
   



    

    // newPostForm = (title, body) => (
        
    // )

    render() {
        const {  title, body, user, category, target_content,reference_content, error, youtube_target, youtube_reference, loading, redirectToProfile} = this.state;
        console.log(this.state)
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
                        <label className="text-muted"><h3>Title</h3>Title</label>
                        <input onChange={this.handleChange ("title")} type="text" value={title} className="form-control" />
                    </div> 
                    <div className="form-group">
                        <label className="text-muted">Category</label>
                            <select name='category' value={category} onChange = {this.DropdownChange}>
                                <option value = "Music" selected>Music</option>
                                <option value = "Cinema">Cinema</option>
                                <option value = "Fine Arts">Fine Arts</option>
                                <option value = "Fashion">Fashion</option>
                                <option value = "Literature">Literature</option>
                                <option value = "Photography">Photography</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">first Picture</label>
                        <input onChange={this.handleChange("photo1")} type="file" accept="image/*" className="form-control" />
                    </div> 
                    <div className="form-group">
                        <label className="text-muted">second Picture</label>
                        <input onChange={this.handleChange("photo2")} type="file" accept="image/*" className="form-control" />
                    </div> 

                    <h3>Content</h3>
                    <h4>Select the type of content of the <strong>TARGET</strong></h4>
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
                        <label className="text-muted">Body</label>
                        {/* <textarea id="mytextarea" onChange={this.handleChange("body")} type="text" value={body} className="form-control"/> */}
                        <textarea onChange={this.handleChange("body")} type="text" value={body} className="form-control"/>

                        
                        {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Write a post!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> */}


                {/* <CKEditor
                editor={ClassicEditor}
                onChange={this.handleOnChange}
                 /> */}
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