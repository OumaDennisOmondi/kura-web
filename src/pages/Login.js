import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/img/logo.png";
import Loader from "../assets/img/loader.svg";
import { Label, Input, Button } from "@windmill/react-ui";

import axios from "axios";
import { auth, notify } from "../helpers";
import { AUTH_URL } from "../urls";

function Login(props) {
  const [valid, setValid] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    mobile_number: "0799143482",
    password: "12345678",
  });

  const isLogedin = auth.isAuthenticated();

  useEffect(() => {
    if (isLogedin) {
      console.log(isLogedin);
      props.history.push("/app");
    } else {
      let redirectUrl = props.location.state;
      console.log(redirectUrl);
      if (redirectUrl !== undefined) {
        notify("Error", "Your session expired, please log in again", "danger");
      }
      console.log("User not logged in");
    }
  }, []);
  const login = () => {
    console.log("Sending..");
    setLoading(true);
    const params = new URLSearchParams();
    params.append("mobile_number", user.mobile_number);
    params.append("password", user.password);

    //const data = {
    //  mobile_number: user.mobile_number,
    //  password: user.password,
    //};
    const headers = {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(AUTH_URL + "/login/", params, { headers })
      .then((res) => {
        const data = res.data;
        if (data.status) {
          setValid(); //for otp field
          auth.saveToken(data);
          notify("Success", "Login successful!", "success");
          auth.login(() => {
            props.history.push("/app");
          });
        }
        console.log(data);
      })
      .catch((err) => {
        console.error(err.response);
        setValid(false);
        //notifications
        notify("Error", err.response.data.message, "danger");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-center align-center flex-col min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center h-full max-w-4xl sm:w-1/4 mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
              <div className="w-full">
                <h1 className="mb-4 text-xl text-center font-semibold text-gray-700 dark:text-gray-200">
                  Kura 2022.
                </h1>
                <hr className="mb-1" />

                <h1 className="mb-4 text-md text-center font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <Label>
                  <span>Username</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="0799143482"
                    valid={valid}
                    value={user.mobile_number}
                    onChange={(e) =>
                      setUser({ ...user, mobile_number: e.target.value })
                    }
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="********"
                    valid={valid}
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        login();
                      }
                    }}
                  />
                </Label>

                <Button
                  className="mt-4 bg-blue-500"
                  block
                  onClick={() => login()}
                  disabled={
                    user.password === null || user.mobile_number === null
                  }
                >
                  {loading && (
                    <span className="w-8 h-8">
                      <img src={Loader} alt="..."></img>
                    </span>
                  )}{" "}
                  Log in
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="flex flex-col items-center h-full mt-16 max-w-4xl mx-auto overflow-hidden">
          <p className="text-gray-500 text-sm dark:text-blue-200">
            Crafted with{" "}
            <i className="fas fa-heart text-red-600" aria-hidden="true"></i> by
            Omosh and Team.
          </p>
          <p className="text-gray-800 text-sm dark:text-gray-200">
            &copy; {new Date().getFullYear()} &nbsp; All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
