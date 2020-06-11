import React, { Component } from 'react';
import {singlePost} from './apiPost';
import { isAuthenticated } from '../auth'
import {create, addPhoto} from './apiPost'
import { Editor } from '@tinymce/tinymce-react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'

 class EditPost extends Component {

    state = {
        id:'',
        category: '',
        title:'',
        photo1:'',
        photo2:'',
        photo_target:'',
        photo_reference:'',
        target_content: '',
        reference_content:'',
        youtube_target:'',
        youtube_reference:'',
        body:'',
        redirectToProfile: false,
        error:'',
        user: {},
        fileSize : 0,
        loading: false,
        previews: {},
        src: {},
        crop:{ 
            photo1: {
              unit: "%",
            width: 30,
            aspect: 1 / 1
            },
            photo2: {
              unit: "%",
            width: 30,
            aspect: 1 / 1
            }
        },
        croppedImageUrl: {} 
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true});
            } else {
                this.setState({ id: data._id, body:data.body, category:data.category, title: data.title, error:'', photo1: data.photo1, photo2: data.photo2, photo_target: data.photo_target, photo_reference: data.photo_reference });
            }
        })
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);      
        
    }

    isValid = () => {
        const { title, body, fileSize, category, photo1, photo2} = this.state;
        if (category==='' || category==='Category') {
            this.setState({
                error: "You should select a category",
                loading: false
            });
            return false;
        }
        if (photo1==='') {
            this.setState({
                error: "You should upload the first thumbnail",
                loading: false
            });
            return false;
        }
        if (photo2==='') {
            this.setState({
                error: "You should upload the second thumbnail",
                loading: false
            });
            return false;
        }

        if (body==='') {
            this.setState({
                error: "You should enter some text on the textarea",
                loading: false
            });
            return false;
        }

        if (fileSize > 1500000) {
            this.setState({
                error: "File size should be less than 1,5Mb",
                loading: false
            });
            return false;
        }
        
        // if (title.length === 0 || body.length === 0) {
        if (title.length === 0)  {
            this.setState({ error: "You should write a title", loading: false });
            return false;
            }
        return true;
    };


    handleChange = name => event => {
        this.setState({ error: "" });
        let value;
        let fileSize;
        
        if(name.includes('photo')){
          value = event.target.files[0] 
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            name.includes('photo_') 
            ? this.setState({ previews: {...this.state.previews, [name]: fileReader.result} }) 
            : this.setState({src: {...this.state.src, [name]:fileReader.result} })
          }
          fileReader.readAsDataURL(value)
          fileSize = event.target.files[0].size
        } else {
          value = event.target.value;
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
   
onImageLoaded = (image, name) => {
  this[name] = image
}

onCropChange = (crop, name) => {
    this.setState({ crop: {...this.state.crop, [name]: crop} });
}

onCropComplete = (crop, name) => {
    if (this[name] && crop.width && crop.height) {
        const croppedImageUrl = this.getCroppedImg(this[name], crop, name)
        this.setState({ croppedImageUrl: {...this.state.croppedImageUrl, [name]: croppedImageUrl} })
    }
}

getCroppedImg(image, crop, name) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    
    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    )

    const reader = new FileReader()
    canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            this.dataURLtoFile(reader.result, 'cropped.jpg', name)
        }
    })
    }
    dataURLtoFile(dataurl, filename, name) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
              
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      let croppedImage = new File([u8arr], filename, {type:mime});
      this.postData.set(name, croppedImage)
      this.setState({[name]:croppedImage}) 
    }

    render() {
        const {  title, body, src, crop, user, category, previews, target_content,reference_content, error, youtube_target, youtube_reference, loading, redirectToProfile} = this.state;

        return (
            <section className="section-edit-post">
                <div className="container">
                    <h2>EDIT POST</h2>
                    {/* {JSON.stringify(this.state)} */}

                    <form>
                    <div className="title-group">
                        <label className="text-muted"><h3>Title</h3></label>
                        <input onChange={this.handleChange ("title")} type="text" value={title} className="form-control" />
                    </div> 
                    <hr class="style7"/>


                    <div className="category-select-row">
                        <label className="text-muted"><h3>Category</h3></label>
                            <select className="select-input" name='category' value={category} onChange = {this.DropdownChange}>
                                <option value = "Category">Select Category</option>
                                <option value = "Music">Music</option>
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
                            {src['photo1'] && (
                <ReactCrop
                  src={src['photo1']}
                  crop={crop['photo1']}
                  onImageLoaded={(e) => this.onImageLoaded(e, 'photo1')}
                  onComplete={(cr) => this.onCropComplete(cr, 'photo1')}
                  onChange={(e) => this.onCropChange(e, 'photo1')}
                 /> 
            )}
                        </div> 
                        <div className="spacer-column">

                        </div>
                        <div className="second-thumbnail">
                            <label className="text-muted">Second thumbnail</label>
                            <input onChange={this.handleChange("photo2")} type="file" accept="image/*" className="form-control" />
                            {src['photo2'] && (
                <ReactCrop
                  src={src['photo2']}
                  crop={crop['photo2']}
                  onImageLoaded={(e) => this.onImageLoaded(e, 'photo2')}
                  onComplete={(cr) => this.onCropComplete(cr, 'photo2')}
                  onChange={(e) => this.onCropChange(e, 'photo2')}
                 /> 
            )}
                        </div> 
                    </div>
                   
                    <hr class="style7"/>

                    <h3 className="content-title">Content</h3>
                    <p className="content-explanation">Select the type of content of the <strong>TARGET</strong></p>
                    <div className="form-group">
                        <label className="text-muted">Target content</label>
                        <select name='target_content' value={target_content} onChange = {this.DropdownContentChangeTarget}>
                            <option value = "None">None</option>
                            <option value = "Youtube">Youtube video</option>
                            <option value = "Picture">Upload a Picture</option>
                        </select>
                    </div>
                    

                    {this.state.target_content==='Youtube' &&
                        <div className="form-group">
                            <label className="text-muted">Youtube link</label>
                            <input onChange={this.handleChange ("youtube_target")} type="text" value={youtube_target} className="form-control" />
                        </div> 

                    }

                    {this.state.target_content==='Picture' &&
                       <div className="form-group">
                        <label className="text-muted">Target Picture</label>
                        <input onChange={this.handleChange("photo_target")} type="file" accept="image/*" className="form-control" />
                        {previews.photo_target && <img src={previews.photo_target} alt="thumb1"/>}
                    </div> 
                    
                    }

                    <hr class="style7"/>

                    <h4>Select the type of content of the <strong>REFERENCE</strong></h4>
                    <div className="form-group">
                        <label className="text-muted">Reference content</label>
                        <select name='reference_content' value={reference_content} onChange = {this.DropdownContentChangeReference}>
                            <option value = "None">None</option>
                            <option value = "Youtube">Youtube video</option>
                            <option value = "Picture">Upload a Picture</option>
                        </select>
                    </div>

                    {this.state.reference_content==='Youtube' &&
                        <div className="form-group">
                            <label className="text-muted">Youtube link</label>
                            <input onChange={this.handleChange ("youtube_reference")} type="text" value={youtube_reference} className="form-control" />
                        </div> 
                    }

                    {this.state.reference_content==='Picture' &&
                      <div className="form-group">
                        <label className="text-muted">Reference Picture</label>
                        <input onChange={this.handleChange("photo_reference")} type="file" accept="image/*" className="form-control" />
                        {previews.photo_reference && <img src={previews.photo_reference} alt="thumb1"/>}
                    </div> 
                    
                    }
                    
                    <div className="form-group">
                    <hr class="style7"/>

                        <label className="text-muted"><h3>Explanation</h3></label>

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
                       
                 
                    </div>  

                    
                    
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Update Post
                    </button>
                    <br></br>
                    <br></br>
                    <div className="write-post-error" style={{display:error ? "" : "none"},{color:"red"} }>
                    {error}
                    </div>
                </form>

                </div>
            </section>
        )
    }
}

export default EditPost;