import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth, notify } from "../helpers";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            // notify(
            //   "Error",
            //   "Your session expired, please log in again",
            //   "danger"
            // );
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
