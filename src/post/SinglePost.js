import React, { Component } from 'react'
import { singlePost } from './apiPost'
import DefaultPost from '../images/defaulPostImg.jpg'
import {Link} from 'react-router-dom'

class SinglePost extends Component {

state = {
    post:''

} 

componentDidMount = () => {
    const postId = this.props.match.params.postId
    singlePost(postId).then(data => {
        if (data.error){
            console.log(data.error);
        } else {
            this.setState({post: data})
        }

    });
};


renderPost = (post) => {

    const posterId = post.postedBy ? post.postedBy._id : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    return (
        <div className="card col-md-4">

            <div className="card-body">
            <p className="card-text">{post.title}</p> 

            <img
                src={`${
                    process.env.REACT_APP_API_URL
                }/post/photo1/${post._id}`}
                alt={post.title}
                onError={i =>
                    (i.target.src = `${DefaultPost}`)
                }
                
            />
              <img
                    src={`${
                        process.env.REACT_APP_API_URL
                    }/post/photo2/${post._id}`}
                    alt={post.title}
                    onError={i =>
                        (i.target.src = `${DefaultPost}`)
                    }
                    
                />
                <img
                    src={`${
                        process.env.REACT_APP_API_URL
                    }/post/photo_target/${post._id}`}
                    alt={post.title}
                    onError={i =>
                        (i.target.src = 'null')
                    }
                    
                />
                <img
                    src={`${
                        process.env.REACT_APP_API_URL
                    }/post/photo_reference/${post._id}`}
                    alt={post.title}
                    onError={i =>
                        (i.target.src = 'null')
                    }
                    
                />



                <p className="card-text">{post.body}</p> 
                {/* substring es per previsualitar els primers 100 caracters a la carta */}

                <p className="font-italic mark">

                    Posted by {" "}
                    <Link to={`user/${posterId}`}>
                        {posterName}{" "}
                    </Link>
                    on {new Date (post.created).toDateString()}
                </p>
                <Link to={`/`} className="button-backToPost">
                    Back to Home
                </Link>
                        
            </div>
        </div>
    )
    
}

    render() {

        const { post } = this.state;

        return (

            <div className="container">
                {post ? (
                <div>
                    <h2>single post</h2>
                    {this.renderPost(post)}
                    
                </div>
                ) : (this.renderPost(post)
                )}

            </div>
        )
    }
}
export default SinglePost;

