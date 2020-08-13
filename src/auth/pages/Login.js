import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import { loginUser, clearError } from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  const { error, loading } = appState.auth;

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <section className="login section--page section--greybg">
      <PageHeader title="login" />
      <div className="grid-width login__container">
        <Card cardClass="card__form">
          {error && (
            <Message
              error={true}
              iconClicked={() => dispatch(clearError())}
              msg={error}
            />
          )}
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string().required("Please enter your username"),
              password: Yup.string()
                .min(6, `password should be 6 characters or more`)
                .required("Please enter your password"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              const data = { ...values };
              dispatch(loginUser(data));
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="login__form">
                <div className="input-group">
                  <TextInput
                    label="Username"
                    name="username"
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
                  <button
                    disabled={!(isValid && dirty) || isSubmitting || loading}
                    type="submit"
                    className="btn btn--blue btn--form"
                  >
                    {!loading && <p className="btn__text">Login</p>}
                    {loading && <Loader />}
                  </button>
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
