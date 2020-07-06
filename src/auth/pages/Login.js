import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import userService from "../../services/user";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Button from "../../shared/components/UI/Button/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { UIContext } from "../../shared/context/ui-context";
import Message from "../../shared/components/Message/Message";

const Login = () => {
  const auth = useContext(AuthContext);
  const uictxt = useContext(UIContext);
  const history = useHistory();
  return (
    <section className="login section--page section--greybg">
      <PageHeader title="login" />
      <div className="grid-width login__container">
        <Card cardClass="card__form">
          {uictxt.show && (
            <Message
              iconClicked={uictxt.handleClose}
              msg={uictxt.msg}
              bgColor={uictxt.error ? "#cc0000" : "#008000"}
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const data = { ...values };
              try {
                const response = await userService.loginUser(data);
                auth.handleSetUserId(response.data.id);
                resetForm();
                setSubmitting(false);
                auth.login();
                history.goBack();
              } catch (error) {
                uictxt.handleShow(error.response.data.message);
                uictxt.handleErrorAvail();
              }
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
