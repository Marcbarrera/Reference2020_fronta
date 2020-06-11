
import React, { Component } from 'react';
import { singlePost, remove,  like, unlike } from './apiPost';
import { withRouter, Link, Redirect } from 'react-router-dom';
import DefaultPost from '../images/defaulPostImg.jpg'
import ProfilePicture from '../user/ProfilePicture'
import DefaultUserImage from '../images/User_placeholder_image.png'


import { isAuthenticated } from '../auth';

class SinglePost extends Component {
    state = {
        user:this.props.user,
        post: '',
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        youtube_target:''

        // comments: []
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    componentDidMount = () => {

        const postId = this.props.match.params.postId;
       


        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                });

            }
        });
        
        
      
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token
        remove (postId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            }
            else {
                this.setState({redirectToHome:true})
            }
        })

        remove()
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete this post?")
        if (answer){
            this.deletePost()
        }

    }

 

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

    

 

    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';
        const {user} = this.state;
        // const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}`

        const { like, likes } = this.state;

        const youTarLink=(this.state.post.youtube_target)
        const id_You_Tar=youTarLink.substr(32);
        console.log(id_You_Tar)
        return (
            <div className="card-body">

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
                                                    {/* <ProfilePicture user={isAuthenticated().user}/> */}
          
                <div className="video1">
                <iframe width="1600"
    height="900"
    frameborder="0" classname="youtube_target_width" src={`https://youtube.com/embed/${id_You_Tar}` }></iframe>
                </div>
                <div className="card-text" dangerouslySetInnerHTML={{__html: post.body}}/>
                {/* <div>{post.body}</div> */}

                {like ? (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up text-success bg-dark"
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Likes
                    </h3>
                ) : (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up text-warning bg-dark"
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Likes
                    </h3>
                )}
                

                <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
                        Back to posts
                    </Link>
                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-5">
                                Update Post
                            </Link>
                            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                                Delete Post
                            </button>
                        </>
                    )}
                   
                    {/* <div>
                        {isAuthenticated().user &&  (
                            <div class="card mt-5">
                                <div className="card-body">
                                    <button >
                                    <Link
                                        to={`/post/edit/${post._id}`}
                                        className="btn btn-raised btn-warning btn-sm mr-5"
                                    >
                                        Update Post
                                    </Link>
                                    </button>
                                    <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                                        Delete Post
                                    </button>
                                </div>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        );
    };

    render() {

       

        const { post, redirectToHome, redirectToSignin  } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
        <section className="single-post-section">
                <div className="container">
                    <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

                    {!post ? (
                        <div className="jumbotron text-center">
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        this.renderPost(post)
                    )}

          

            </div>
        </section>

        );
    }
}

export default SinglePost;