import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";

const Login = () => {
  const navigate = useNavigate();

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const login = async (payload: any) => {
    try {
      const res = await api.post('/auth/login', payload);
      localStorage.setItem("token", res.data.token);
      navigate("/lobby");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.title}>Bug Hunt</div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={(values) => {
            login(values);
            console.log("Submitted:", values);
          }}
        >
          <Form className={styles.authForm}>
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

            <button type="submit" className={styles.submitButton}>
              Login
            </button>

            <div className={styles.authLink}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
