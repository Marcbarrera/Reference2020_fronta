import React from 'react';
import {Link,} from 'react-router-dom';

const userSideDrawer = props => {
    let userDrawerClasses = 'user-side-drawer';
    if (props.show) {
        userDrawerClasses = 'user-side-drawer open';
    }

    return(
        <nav className={userDrawerClasses}>
            <ul className="">
                <li className="nav-items" onClick={() => props.close()}>
                    <Link to="/categories">Profile</Link>
                </li>
                <li className="nav-items" onClick={() => props.close()}>
                    <Link to="/categories">Profile</Link>
                </li>
                <li className="nav-items" onClick={() => props.close()}>
                  <Link to="/newestposts">Edit profile</Link>
                </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/adeu">Settings</Link>
            </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/users">LogOut</Link>
            </li>
        </ul>
        </nav>

    )
};

export default userSideDrawer;