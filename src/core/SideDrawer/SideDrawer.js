import React from 'react';
import {Link,} from 'react-router-dom';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return(
        <nav className={drawerClasses}>
            <ul className="">
                <li className="nav-items" onClick={() => props.close()}>
                    <Link to="/categories">Categories</Link>
                </li>
                <li className="nav-items" onClick={() => props.close()}>
                  <Link to="/newestposts">Newest posts</Link>
                </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/topposts">Top post</Link>
            </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/users">Users</Link>
            </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/writeapost">Write a post</Link>
            </li>
            <li className="nav-items" onClick={() => props.close()}>
                <Link to="/myposts">My posts</Link>
            </li>
        </ul>
        </nav>

    )
};

export default sideDrawer;