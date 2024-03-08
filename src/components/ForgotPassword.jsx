import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validationForgotPassSchema } from "../utils";
import { forgotPass } from "../redux/slices/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const handleSubmit = (values) => {
    try {
      dispatch(forgotPass(values));
      navigate("/reset_password");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationForgotPassSchema}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <div className="form">
            <p className="form_subtitle">Forgot Password?</p>
            <input
              className="form_input"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && errors.email}
            />
            {touched.email && <p className="error">{errors.email}</p>}
            <button className="login_btn" type="submit">
              Send
            </button>
            <button className="cancel_btn" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
