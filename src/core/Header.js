
import React from "react";
import User_navbar_out from './User_navbar_out';
import User_navbar_in from './User_navbar_in';
import Post_navbar from './Post_navbar'
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import DrawerToggleButton from './SideDrawer/DrawerToggleBurger'
import UserSideDrawer from './SideDrawer/UserSideDrawer'
import SignInModal from './Modals/SignInModal'

import ProfilePicture from '../user/ProfilePicture'


const Header = props => (
    <header>
        <div className="header-wrapper">
                <div className="top-header">
                    <div className="b-menu-mv">
                        <DrawerToggleButton click={props.drawerClickHandler}/>
                    </div>
                    <div className="header-title">
                        <h1><Link to="/">Reference</Link></h1>
                    </div>
                    <div className="u-menu-mv">
                    
                   {isAuthenticated()? <button className="profile-mov-menu" onClick={props.userClickHandler}> <ProfilePicture user={isAuthenticated().user}/>  </button>: <User_navbar_out/> }

                    {/* <ProfilePicture user={isAuthenticated().user}/> */}
                        
                    </div>
                </div>
            <div className="bottom-header">
                       
             <Post_navbar/> <DrawerToggleButton click={props.drawerClickHandler} /> <div className="spacer"></div>  {isAuthenticated()? <User_navbar_in/>  : <User_navbar_out click={props.SignInModal}/> }
            </div>
       </div>
    </header>
)

export default withRouter(Header);