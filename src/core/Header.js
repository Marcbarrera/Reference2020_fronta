
import React from "react";
import User_navbar_out from './User_navbar_out';
import User_navbar_in from './User_navbar_in';
import Post_navbar from './Post_navbar'
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import DrawerToggleButton from './SideDrawer/DrawerToggleBurger'
import UserSideDrawer from './SideDrawer/UserSideDrawer'
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
                    
                   <button className="profile-mov-menu" onClick={props.userClickHandler}> {isAuthenticated()? <ProfilePicture user={isAuthenticated().user}/>  : <User_navbar_out/> }</button>

                    {/* <ProfilePicture user={isAuthenticated().user}/> */}
                        
                    </div>
                </div>
            <div className="bottom-header">
                       
             <Post_navbar/> <DrawerToggleButton click={props.drawerClickHandler} /> <div className="spacer"></div>  {isAuthenticated()? <User_navbar_in/>  : <User_navbar_out/> }
            </div>
       </div>
    </header>
)

export default withRouter(Header);