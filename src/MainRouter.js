import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from "./core/Header";
import Signup from "./user/Signup";
import Signin from "./user/Signin";


const MainRouter = () => (
    <div>
        <Header/>
        <Switch>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
        </Switch>
    </div>
)

export default MainRouter;