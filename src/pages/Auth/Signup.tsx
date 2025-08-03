import { Formik, Form, Field, ErrorMessage } from "formik";
// import './Auth.css';
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../lib/api";

interface SignupValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validate = (values: SignupValues) => {
  const errors: Partial<SignupValues> = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const register = async(payload: any) => {
  let res = await api.post('/auth/signup', payload);
  console.log(res)
}

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="title">Create Account </div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validate}
        onSubmit={(values) => {
          const {confirmPassword, ...payload} = values
          register(payload)
        }}
      >
        <Form className="auth-form">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="auth-control">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="auth-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>

          <button type="submit">Signup</button>

          <div className="auth-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
