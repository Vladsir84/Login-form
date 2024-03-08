import * as Yup from "yup";
import axios from "axios";

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("No email provided."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const validationForgotPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("No email provided."),
});

export const validationResetPassSchema = Yup.object().shape({
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  duplicatePassword: Yup.string()
    .required("No duplicate password provided.")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(8, "Duplicate password is too short - should be 8 chars minimum."),
});

export const regExpMail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";

export const togglePasswordVisibility = (inputElementId) => {
  const passwordInput = document.getElementById(inputElementId);
  if (passwordInput) {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  }
};

const instance = axios.create({
  baseURL: "https://auth-qa.qencode.com",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("appToken");
  return config;
});

export default instance;
