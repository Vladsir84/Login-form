import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  regExpMail,
  togglePasswordVisibility,
  validationLoginSchema,
} from "../utils";
import { loginUser } from "../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    try {
      dispatch(loginUser(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationLoginSchema}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <div className="form">
            <p className="form_subtitle">Log in to your account</p>
            <div className="form_buttons">
              <div className="form_btn">
                <img src="Google.png" alt="" className="btn_img" />
                Google
              </div>
              <div className="form_btn">
                <img src="Github.png" alt="" className="btn_img" />
                Github
              </div>
            </div>
            <div className="title">
              <span>OR</span>
            </div>
            <input
              className="form_input"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && errors.email}
            />
            {touched.email && <p className="error">{errors.email}</p>}
            {values.email.match(regExpMail) && (
              <div style={{ position: "relative" }}>
                <input
                  id="passwordInput"
                  className="form_input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                />
                <img
                  src="Pass_visible.png"
                  alt=""
                  className="visible"
                  onClick={() => togglePasswordVisibility("passwordInput")}
                />
                {touched.password && <p className="error">{errors.password}</p>}
                <p
                  className="fp_text"
                  onClick={() => navigate("/forgot_password")}
                >
                  Forgot your password?
                </p>
              </div>
            )}
            <button className="login_btn" type="submit">
              Log in to Qencode
            </button>
            <div className="signup_text">
              <p>Is your company new to Qencode?</p>
              <p className="signup_text__su">Sign up</p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
