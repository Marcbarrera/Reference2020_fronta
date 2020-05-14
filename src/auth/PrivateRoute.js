
import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
// les props es refereixen a components passats al component de la ruta privada
<Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
