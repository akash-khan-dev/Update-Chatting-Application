import { Container } from "@mui/system";
import React, { useState } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { SignUp } from "../../Validation/Validation";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

export const Registration = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUp,
    onSubmit: () => {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: formik.values.fullname,
            }).then(() => {
              console.log(user);
              set(ref(db, "users/" + user.uid), {
                username: formik.values.fullname,
                email: formik.values.email,
              }).then(() => {
                setLoading(false);
                formik.resetForm();
                toast.success("Registration success chack your email!", {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: false,
                  draggable: true,
                });
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              });
            });
          });
        })
        .catch((error) => {
          toast.error("Email Already use!", {
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
  // handle Show pass
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
      <div className="registration">
        <Container fixed>
          <ToastContainer />
          <div className="form-box">
            <form onSubmit={formik.handleSubmit} className="forms">
              <div className="forms-heading">
                <h1>Registration</h1>
              </div>
              <TextField
                type="name"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                fullWidth
                id="standard-basic"
                label="Full Name"
                variant="standard"
                margin="normal"
              />
              {formik.errors.fullname && (
                <p className="errors">{formik.errors.fullname}</p>
              )}
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
              <TextField
                type="password"
                name="confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                margin="normal"
                fullWidth
                id="standard-basic"
                label="Confirm Password"
                variant="standard"
              />
              {formik.errors.confirmpassword &&
                formik.touched.confirmpassword && (
                  <p className="errors">{formik.errors.confirmpassword}</p>
                )}

              {loading ? (
                <Button
                  disabled
                  type="submit"
                  fullWidth
                  className="button"
                  variant="contained"
                >
                  <BeatLoader />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  className="button"
                  variant="contained"
                >
                  sign up
                </Button>
              )}
              <div className="signin">
                <p>
                  Already have an account ?{" "}
                  <span className="navigate">Sign In</span>{" "}
                </p>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};
