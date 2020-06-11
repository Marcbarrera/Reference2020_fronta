import React, { Component } from 'react'
import {list} from "./apiPost"
import {Link} from 'react-router-dom'
import DefaultPost from '../images/defaulPostImg.jpg'

 class Posts extends Component {
    state = {
        posts: []
    }


    componentDidMount () {
        list().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data});
            }
        });
    }

    renderPosts = posts => {
        return (

        <ul className="posts-row">
            
            
            {posts.map((post, i) => {

                const posterId = post.postedBy ? post.postedBy._id : "";
                const posterName = post.postedBy ? post.postedBy.name : " Unknown";
               
            
            return (

                <li className="card col-md-4" key={i}>
                    <Link to={`/post/${post._id}`} className="post-url">
                    <div className="card-wrapper">

                                <div className={`col-category ${post.category}`}>
                                <p>{post.category}</p>
                                </div>

                                <div className="col-card-body">  
                                <h4 className="card-title">{post.title.substring(0,42)}</h4>

                                    <div className="images-card-wrapper">
                                                <img className="first-thumbnail"
                                                    src={`${
                                                        process.env.REACT_APP_API_URL
                                                    }/post/photo1/${post._id}`}
                                                    alt={post.title}
                                                    onError={i =>
                                                        (i.target.src = `${DefaultPost}`)
                                                    }

                                                />
                                                <img className="second-thumbnail"
                                                    src={`${
                                                        process.env.REACT_APP_API_URL
                                                    }/post/photo2/${post._id}`}
                                                    alt={post.title}
                                                    onError={i =>
                                                        (i.target.src = `${DefaultPost}`)
                                                    }
                                                    
                                                />
                                    </div>
                                    
                                    <div className="post-info">
                                        {/* <p className="card-text"><strong>{post.category}</strong></p> */}
                                        {/* <div className="card-text" dangerouslySetInnerHTML={{__html: post.body.substring(0,100)}}/> */}
                                        {/* <p className="card-text">{post.body.substring(0,100)}></p>  */}
                                        
                                        <p className="font-italic mark">
                                            Posted by {" "}{posterName}{" "}
                                            {/* on {new Date (post.created).toDateString()} */}
                                        </p>
                                        <p className="card-text">{post.likes.length} likes</p> 
                                    </div>    
                                        {/* <Link
                                            to={`/post/${post._id}`}
                                            className="btn btn-raised byn-primary btn-sm"
                                        >
                                            Read more
                                        </Link> */}
                            </div>
                    </div>
                    </Link>
                </li>
            )
 })}
        

        </ul>
        )
    }

    render() {
        const { posts } = this.state;
        
        return (
            <section className="post-section">
            <div className="container">
             <h2> {!posts.length? 'Loading...' : "Latest posts" } </h2>
                {this.renderPosts(posts)}
                
            </div>
            </section>
        );
    }
}
export default Posts;