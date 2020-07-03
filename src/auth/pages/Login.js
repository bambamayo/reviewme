import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Button from "../../shared/components/UI/Button/Button";
import { AuthContext } from "../../shared/context/auth-context";

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  console.log(auth);
  return (
    <section className="login section--page section--greybg">
      <PageHeader title="login" />
      <div className="grid-width login__container">
        <Card cardClass="card__form">
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            validationSchema={Yup.object({
              userName: Yup.string().required("Please enter your username"),
              password: Yup.string()
                .min(6, `password should be 6 characters or more`)
                .required("Please enter your password"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                console.log(values);
                resetForm();
                setSubmitting(false);
                auth.login();
                history.push("/");
              }, 3000);
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="login__form">
                <div className="input-group">
                  <TextInput
                    label="Username"
                    name="userName"
                    type="text"
                    placeholder="Enter username"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="input-group">
                  <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit"
                    className="btn btn--blue btn--form"
                  >
                    <p className="btn__text">Login</p>
                    {isSubmitting && <Loader />}
                  </Button>
                  <Link className="calltoaction__link" to="/signup">
                    or create account
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </section>
  );
};

export default Login;
