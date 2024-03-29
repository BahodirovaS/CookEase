import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "./auth/authApi";
import { updateField, SIGN_UP_MODAL } from "./auth/accountSlice";
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './assets/css/main.css'


function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, username, password, first_name, last_name } = useSelector(
    (state) => state.account
  );
  const modalClass = `my-modal ${show === SIGN_UP_MODAL ? "is-active" : ""}`;
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    signUp({
      username,
      password,
      first_name,
      last_name,
    }).then((response) => {
      if (response.error) {
        setErrorMessage(response.error);
      }
      else {
        navigate("/")
      }
    })
  },
    [username, password, first_name, last_name, navigate, signUp]
  )

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <section className="sign-up section">
      <div className={modalClass} key="signup-modal">
        <div className="account-form-container">
          <div className="account-container">
            <h2 className="text-center mkb-5">Create An Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <div className="control">
                  <input
                    required
                    onChange={field}
                    value={username}
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                  // placeholder="Username"
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    required
                    onChange={field}
                    value={password}
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                  // placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <label className="label">First name</label>
                <div className="control">
                  <input
                    required
                    onChange={field}
                    value={first_name}
                    name="first_name"
                    className="form-control form-control-lg"
                    type="text"
                  // placeholder="Your First Name"
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <label className="label">Last name</label>
                <div className="control">
                  <input
                    required
                    onChange={field}
                    value={last_name}
                    name="last_name"
                    className="form-control form-control-lg"
                    type="text"
                  // placeholder="Your Last Name"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="control">
                  <button disabled={signUpLoading} className="account-btn">
                    Sign up!
                  </button>
                </div>
              </div>
              {errorMessage && <div className="error">{errorMessage}
              </div>}
            </form>
          </div>
        </div>
      </div>
    </section >
  );
}

export default SignUp;
