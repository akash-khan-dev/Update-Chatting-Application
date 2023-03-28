import * as Yup from "yup";

export const SignUp = Yup.object({
  fullname: Yup.string().min(3).max(15).required("full name is required"),
  email: Yup.string().required("email is required"),
  password: Yup.string().min(6).max(15).required("password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password don't match")
    .required("please confirm your password"),
});
