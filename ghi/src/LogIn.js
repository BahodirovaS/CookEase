import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "./auth/authApi";
import { eventTargetSelector as target, preventDefault } from "./auth/utils";
import { showModal, updateField, LOG_IN_MODAL } from "./auth/accountSlice";

function LogIn() {
  const dispatch = useDispatch();
  const { show, username, password } = useSelector((state) => state.account);
  const modalClass = `modal ${show === LOG_IN_MODAL ? "is-active" : ""}`;
  const [logIn, { isLoading: logInLoading }] = useLogInMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <div className={modalClass} key="login-modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box content">
          <h3>Log In</h3>
          <form method="POST" onSubmit={preventDefault(logIn, target)}>
            <div className="field">
              <label className="label" htmlFor="username">
                Username
              </label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={username}
                  name="username"
                  className="input"
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={password}
                  name="password"
                  className="input"
                  type="password"
                  placeholder="secret..."
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button disabled={logInLoading} className="button is-primary">
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  onClick={() => dispatch(showModal(null))}
                  className="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
