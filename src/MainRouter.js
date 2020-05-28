import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./core/Home";
// import Header from "./core/Header";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import Editprofile from "./user/Editprofile"
import Categories from "./pages/Categories"
import Music from "./pages/Music"
import NewestPosts from './pages/NewestPosts'
import WriteAPost from "./post/WriteAPost"
import PrivateRoute from './auth/PrivateRoute'
import Posts from "./post/Posts"
import TopPosts from "./post/TopPosts"

import SinglePost from "./post/SinglePost"


const MainRouter = () => (
    <div>
        {/* <Header/> */}
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/posts" component={Posts}></Route>
            <Route exact path="/topposts" component={TopPosts}></Route>
            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <Route exact path="/categories" component={Categories}></Route>
            <Route exact path="/categories/music" component={Music}></Route>
            <Route exact path="/newestposts" component={NewestPosts}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile}/>
            <PrivateRoute exact path="/user/edit/:userId" component={Editprofile}/>
            <PrivateRoute exact path="/writeapost" component={WriteAPost}/>

        </Switch>
    </div>
)

export default MainRouter;