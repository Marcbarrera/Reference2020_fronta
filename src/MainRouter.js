import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import Editprofile from "./user/Editprofile"
import Categories from "./pages/Categories"
import Music from "./pages/Music"
import Painting from "./pages/Painting"
import Cinema from "./pages/Cinema"
import Photography from "./pages/Photography"
import Literature from "./pages/Literature"
import Fashion from "./pages/Fashion"
import NewestPosts from './pages/NewestPosts'
import WriteAPost from "./post/WriteAPost"
import PrivateRoute from './auth/PrivateRoute'
import Posts from "./post/Posts"
import TopPosts from "./post/TopPosts"
import SinglePost from "./post/SinglePost"
import PageNotFound from './pages/PageNotFound'
import EditPost from './post/EditPost'



const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/posts" component={Posts}></Route>
            <Route exact path="/topposts" component={TopPosts}></Route>
            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
            <Route exact path="/categories" component={Categories}></Route>
            <Route exact path="/categories/music" component={Music}></Route>
            <Route exact path="/categories/cinema" component={Cinema}></Route>
            <Route exact path="/categories/painting" component={Painting}></Route>
            <Route exact path="/categories/photography" component={Photography}></Route>
            <Route exact path="/categories/literature" component={Literature}></Route>
            <Route exact path="/categories/fashion" component={Fashion}></Route>
            <Route exact path="/newestposts" component={NewestPosts}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile}/>
            <PrivateRoute exact path="/user/edit/:userId" component={Editprofile}/>
            <PrivateRoute exact path="/writeapost" component={WriteAPost}/>
            <Route component={PageNotFound}/>
        </Switch>
    </div>

)

export default MainRouter;