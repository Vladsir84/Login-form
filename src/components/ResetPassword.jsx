import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { validationResetPassSchema, togglePasswordVisibility } from "../utils";
import { resetPass } from "../redux/slices/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const initialValues = {
    password: "",
    duplicatePassword: "",
  };

  const handleSubmit = (values) => {
    try {
      dispatch(
        resetPass({
          token: "321323123123232",
          password: values.password,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationResetPassSchema}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <div className="form">
            <p className="form_subtitle">Create new Password?</p>
            <div style={{ position: "relative" }}>
              <p className="reset_input_text">Password</p>
              <input
                id="passwordInput"
                style={{ marginTop: 0 }}
                className="form_input"
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <img
                src="Pass_visible.png"
                alt=""
                className="visible"
                onClick={() => togglePasswordVisibility("passwordInput")}
              />
              {touched.password && <p className="error">{errors.password}</p>}
            </div>
            <div style={{ position: "relative" }}>
              <p className="reset_input_text">Confirm Password</p>
              <input
                id="passwordInputConf"
                style={{ marginTop: 0 }}
                className="form_input"
                name="duplicatePassword"
                type="password"
                placeholder="Password"
                value={values.duplicatePassword}
                onChange={handleChange}
              />
              <img
                src="Pass_visible.png"
                alt=""
                className="visible"
                onClick={() => togglePasswordVisibility("passwordInputConf")}
              />
              {touched.duplicatePassword && (
                <p className="error">{errors.duplicatePassword}</p>
              )}
            </div>
            <button className="login_btn" type="submit">
              Reset Password
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
