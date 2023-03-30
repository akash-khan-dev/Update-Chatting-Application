import React, { useState } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "../../Validation/Validation";
import { ImFacebook } from "react-icons/im";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../Features/Slice/UserSlice";
export const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignIn,
    onSubmit: () => {
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          if (user.emailVerified === true) {
            console.log(user);
            setLoading(false);
            navigate("/");
            dispatch(loggedIn(user));
            localStorage.setItem("chating", JSON.stringify(user));
          } else {
            toast.error("Email not varified!", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              theme: "colored",
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          toast.error("Email not found!", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
          setLoading(false);
        });
    },
  });
  const [showpass, setShowPass] = useState("password");
  const handleShowPassword = () => {
    if (showpass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  };
  return (
    <>
      <div className="login">
        <ToastContainer />
        <Grid container>
          <Grid item xs={6}>
            <div className="login-left">
              <div className="login-left-overlay">
                <div className="banner-content">
                  <h1>Hello World.</h1>
                  <p>
                    Epsum fectorial non deposit quid pro quo hic escorol.
                    olypian quarrels et gorlle congolium
                  </p>
                  <h4>Login with social media</h4>
                  <div className="banner-button">
                    <div className="google-button">
                      <Button variant="contained">
                        <AiFillGooglePlusCircle /> Google
                      </Button>
                    </div>
                    <div className="facebook-button">
                      <Button variant="contained">
                        <ImFacebook /> Facebook
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="log-main">
              <div className="form-box">
                <form onSubmit={formik.handleSubmit} className="forms">
                  <div className="login-headings">
                    <h1>Login</h1>
                    <p>
                      Don't hove an account? Create yout account .it takes less
                      than a minute
                    </p>
                  </div>
                  <TextField
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="errors">{formik.errors.email}</p>
                  )}
                  <div className="password">
                    <TextField
                      type={showpass}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      margin="normal"
                      fullWidth
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                    />
                    {showpass === "password" ? (
                      <div onClick={handleShowPassword} className="eye">
                        <AiFillEye />
                      </div>
                    ) : (
                      <div onClick={handleShowPassword} className="eye">
                        <AiOutlineEyeInvisible />
                      </div>
                    )}
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="errors">{formik.errors.password}</p>
                  )}

                  <div className="login-button-box">
                    <div className="all-button">
                      {loading ? (
                        <Button
                          disabled
                          type="submit"
                          className="login-button"
                          variant="contained"
                        >
                          <BeatLoader />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="login-button"
                          variant="contained"
                        >
                          sign in
                        </Button>
                      )}
                    </div>
                    <div className="reset">
                      <p>
                        <Link to="/forgot">Forgot Password</Link>
                      </p>
                    </div>
                  </div>
                  <div className="signup">
                    <p>
                      Already have an account ?
                      <span className="navigate">
                        <Link to="/registration">Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
