import React from 'react';
import {withRouter, Link,} from 'react-router-dom';
import {isAuthenticated, signout} from '../../auth/index';


const userSideDrawer = (props) => {
    let userDrawerClasses = 'user-side-drawer';
    if (props.show) {
        userDrawerClasses = 'user-side-drawer open';
    }

    return(
        <nav className={userDrawerClasses}>
            <ul className="">
                <li className="nav-items" onClick={() => props.close()}>
                    <Link to="/user/:userId">Profile</Link>
                </li>
                <li className="nav-items" onClick={() => props.close()}>
                    <Link to="/user/:userId">Profile</Link>
                </li>
                <li className="nav-items" onClick={() => props.close()}>
                  <Link to="/user/edit/:userId">Edit profile</Link>
                </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/adeu">Settings</Link>
            </li>
            <li onClick={() => props.close()}>
            {/* <Link to={`/user/${isAuthenticated().user._id}`}> */}
                     
            {/* {isAuthenticated().user.name} */}

                    {/* </Link>     */}
            </li>     
            <li className="logout-in">
                <span style={{cursor:"pointer",color:"#000000"}}
                    onClick={() =>signout(() => props.history.push('/'))}>
                    Signout
                </span> 
            </li>
        </ul>
        </nav>

    )
};

export default withRouter(userSideDrawer);