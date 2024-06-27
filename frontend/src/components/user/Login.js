import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        if (isAuthenticated) {
          window.location.href = "/";
        } else {
          alert.error("Login failed");
          dispatch(clearErrors());
        }
      })
      .catch((error) => {
        alert.error("Login Failed");
        dispatch(clearErrors());
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5 login-form">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  {/* For email field */}
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                {/* For password field */}
                <div className="form-group ">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>

                <Link to="/users/forgetPassword" className="float-right mb-4">
                  Forgot Password
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py3"
                >
                  LOGIN
                </button>

                <Link to="/users/signup" className="float-right mt-3">
                  NEW USER?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
