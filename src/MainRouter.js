import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from "./core/Header";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import Editprofile from "./user/Editprofile"
import Categories from "./pages/Categories"
import PrivateRoute from './auth/PrivateRoute'


const MainRouter = () => (
    <div>
        <Header/>
        <Switch>
            <Route exact path="/categories" component={Categories}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile}/>
            <PrivateRoute exact path="/user/edit/:userId" component={Editprofile}/>

        </Switch>
    </div>
)

export default MainRouter;