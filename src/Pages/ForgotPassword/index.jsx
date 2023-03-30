import React from "react";
import "./style.css";
import forgot from "../../images/9111225_lock_circle_icon.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Reset } from "../../Validation/Validation";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

export const Forgot = () => {
  const auth = getAuth();
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Reset,
    onSubmit: () => {
      sendPasswordResetEmail(auth, formik.values.email).then(() => {
        toast.success("Chack your email!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
        });
        formik.resetForm();
      });
    },
  });
  console.log(formik);
  return (
    <>
      <div className="forgot-box">
        <div className="forgot-main">
          <ToastContainer />
          <div className="forgot-header">
            <h2>Forgot Password</h2>
          </div>
          <div className="forgot-icon">
            <img src={forgot} alt="" />
          </div>
          <div className="forgot-form">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="email"
                type="email"
                onChange={formik.handleChange}
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              {formik.errors.email && (
                <p className="error">{formik.errors.email}</p>
              )}
              <Button
                type="submit"
                className="forgot-button"
                variant="contained"
              >
                reset password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
