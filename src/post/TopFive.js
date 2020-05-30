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

    

    render() {
        const { posts } = this.state;
        const array = posts
        
        array.sort(function (a, b) {
            if (a.likes.length > b.likes.length) {
              return -1;
            }
            if (a.likes.length < b.likes.length) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
         console.log("despues")
         console.log(array)

         const b =array.slice(0, 1);
         console.log("holaaaa")
         console.log(b)
        
        return (
            <div className="container">
                <h2>Posts</h2>
                
        <ul className="row">
            
            {b.map((post, i) => {

                const posterId = post.postedBy ? post.postedBy._id : "";
                const posterName = post.postedBy ? post.postedBy.name : " Unknown";
               
            
            // console.log(post)
            return (
                <li className={`card col-md-4 ${post.category}`} key={i}>
 
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
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text"><strong>{post.category}</strong></p>
                    <p className="card-text">{post.body}</p> 
                    <p className="card-text">{post.likes.length} likes</p> 

                    <p className="font-italic mark">
                        Posted by {" "}
                        <Link to={`user/${posterId}`}>
                            {posterName}{" "}
                        </Link>
                        on {new Date (post.created).toDateString()}
                    </p>
                    <Link
                        to={`/post/${post._id}`}
                        className="btn btn-raised byn-primary btn-sm"
                    >
                        Read more
                    </Link>
                    </div>
                </li>
            )
 })}
        

        </ul>
        
                
            </div>
        );
    }
}
export default Posts;