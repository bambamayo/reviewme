import React from "react";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Button from "../../shared/components/UI/Button/Button";

const Signup = () => {
  const history = useHistory();
  return (
    <section className="signup section--page section--greybg">
      <PageHeader title="create account" />
      <div className="grid-width signup__container">
        <Card cardClass="card__form">
          <Formik
            initialValues={{
              fullName: "",
              userName: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Please enter your fullname"),
              userName: Yup.string().required("please enter your username"),
              email: Yup.string()
                .email("invalid email")
                .required("please enter your email"),
              password: Yup.string()
                .min(6, `password should be 6 characters or more`)
                .required("Please enter your password of 6 characters or more"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
                history.push("/bambam/profile");
              }, 3000);
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="signup__form">
                <div className="input-group">
                  <TextInput
                    label="Fullname"
                    name="fullName"
                    type="text"
                    placeholder="Enter fullname"
                  />
                </div>
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
                    placeholder="Enter password"
                  />
                </div>
                <div className="input-group">
                  <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit "
                    className="btn btn--blue btn--form"
                  >
                    <p className="btn__text">Login</p>
                    {isSubmitting && <Loader />}
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
