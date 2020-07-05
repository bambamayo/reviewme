import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";
import { UIContext } from "../../shared/context/ui-context";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Button from "../../shared/components/UI/Button/Button";
import Message from "../../shared/components/Message/Message";

const Signup = () => {
  const auth = useContext(AuthContext);
  const uictxt = useContext(UIContext);
  const history = useHistory();
  return (
    <section className="signup section--page section--greybg">
      <PageHeader title="create account" />
      <div className="grid-width signup__container">
        <Card cardClass="card__form">
          {uictxt.show && (
            <Message
              iconClicked={uictxt.handleClose}
              msg={uictxt.msg}
              bgColor="#cc0000"
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
              const data = { ...values };
              try {
                const response = await axios.post(
                  "http://localhost:5000/api/users/signup",
                  data
                );
                const res = response.data;
                console.log(res);
                resetForm();
                setSubmitting(false);
                auth.login();
                history.push("/bambam/profile");
              } catch (error) {
                uictxt.handleShow(error.response.data.message);
              }
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
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit "
                    className="btn btn--blue btn--form"
                  >
                    <p className="btn__text">Signup</p>
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
