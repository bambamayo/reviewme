import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../shared/components/FormElements/Select/Select";
import { Link } from "react-router-dom";
import Loader from "../../shared/components/UI/Loader/Loader";

const Signup = () => {
  return (
    <section className="signup section section--greybg">
      <PageHeader title="create account" />
      <div className="grid-width signup__container">
        <Card cardClass="card__form">
          <Formik
            initialValues={{
              fullName: "",
              userName: "",
              email: "",
              password: "",
              gender: "",
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
              gender: Yup.string()
                .oneOf(["female", "male", "other"], "Invalid option type")
                .required("This field is required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                console.log(values);
                resetForm();
                setSubmitting(false);
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
                  <Select label="Gender" name="gender">
                    <option value="">select option</option>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </Select>
                </div>
                <div className="input-group">
                  <button
                    disabled={!(isValid && dirty)}
                    type="submit "
                    className="btn btn--blue btn--form"
                  >
                    <p className="btn__text">Login</p>
                    {isSubmitting && <Loader />}
                  </button>
                  <Link className="calltoaction__link" to="/signup">
                    or login
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

export default Signup;
