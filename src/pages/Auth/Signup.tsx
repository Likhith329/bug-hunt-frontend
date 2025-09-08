import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
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
<div className={styles.authPage}>
  <div className={styles.authContainer}>
    <div className={styles.title}>Bug Hunt</div>
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validate={validate}
      onSubmit={(values) => {
        const { confirmPassword, ...payload } = values;
        register(payload);
        console.log("Submitted:", payload);
      }}
    >
      <Form className={styles.authForm}>
        <div className={styles.formControl}>
          <label htmlFor="username">Username</label>
          <Field type="text" name="username" />
          <ErrorMessage
            name="username"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage
            name="email"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field type="password" name="confirmPassword" />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className={styles.error}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Signup
        </button>

        <div className={styles.authLink}>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </Form>
    </Formik>
  </div>
</div>

  );
};

export default Signup;
