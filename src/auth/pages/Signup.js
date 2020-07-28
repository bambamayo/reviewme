import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Button from "../../shared/components/UI/Button/Button";
import Message from "../../shared/components/Message/Message";
import { hideModal } from "../../redux/actions/modal";
import { signupUser } from "../../redux/actions/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  const { error, loading } = appState.auth;
  const showModal = appState.showModal;

  useEffect(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return (
    <section className="signup section--page section--greybg">
      <PageHeader title="create account" />
      <div className="grid-width signup__container">
        <Card cardClass="card__form">
          {showModal && (
            <Message
              iconClicked={() => dispatch(hideModal())}
              msg={error}
              bgColor={error ? "#cc0000" : "#008000"}
            />
          )}
          <Formik
            initialValues={{
              fullname: "",
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              fullname: Yup.string().required("Please enter your fullname"),
              username: Yup.string().required("please enter your username"),
              email: Yup.string()
                .email("invalid email")
                .required("please enter your email"),
              password: Yup.string()
                .min(6, `password should be 6 characters or more`)
                .required("Please enter your password of 6 characters or more"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              const data = { ...values };
              dispatch(signupUser(data));
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="signup__form">
                <div className="input-group">
                  <TextInput
                    label="Fullname"
                    name="fullname"
                    type="text"
                    placeholder="Enter fullname"
                  />
                </div>
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
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password of six or more characters"
                  />
                </div>
                <div className="input-group">
                  <Button
                    disabled={!(isValid && dirty) || isSubmitting || loading}
                    type="submit "
                    className="btn btn--blue btn--form"
                  >
                    {!loading && <p className="btn__text">Signup</p>}
                    {loading && <Loader />}
                  </Button>

                  <Link className="calltoaction__link" to="/login">
                    or login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
          )
        </Card>
      </div>
    </section>
  );
};

export default Signup;
