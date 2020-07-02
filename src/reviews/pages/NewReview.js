import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../shared/components/FormElements/Select/Select";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Button from "../../shared/components/UI/Button/Button";

const NewReview = () => {
  const [showMsg, setShowMsg] = useState(false);

  const handleHideMsg = () => {
    setShowMsg(false);
  };

  const categories = [
    {
      name: "restuarants",
      id: 1,
    },
    {
      name: "bars",
      id: 2,
    },
    {
      name: "hotels",
      id: 3,
    },
    {
      name: "clubs",
      id: 4,
    },
    {
      name: "schools",
      id: 5,
    },
    {
      name: "games",
      id: 6,
    },
    {
      name: "gadgets",
      id: 7,
    },
    {
      name: "books",
      id: 8,
    },
  ];
  return (
    <section className="new-review section--page section--greybg">
      <PageHeader title="New Review" />
      <div className=" grid-width new-review__container">
        <Card cardClass="card__form">
          {showMsg && (
            <Message
              bgColor="green"
              msg="New review submitted successfully"
              iconClicked={handleHideMsg}
            />
          )}
          <Formik
            initialValues={{
              reviewedName: "",
              reviewedCat: "",
              tagline: "",
              reviewedImages: "",
              address: "",
              telephone: "",
              website: "",
            }}
            validationSchema={Yup.object({
              reviewedName: Yup.string()
                .lowercase()
                .required("Please enter a name"),
              reviewedCat: Yup.string()
                .lowercase()
                .required("Please enter a category name"),
              tagline: Yup.string()
                .lowercase()
                .required("Please enter a tagline"),
              userReview: Yup.string()
                .lowercase()
                .required("This field is required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              let fileElement = document.getElementById("reviewedImages");
              setTimeout(() => {
                console.log(values);
                console.log(fileElement.files);
                resetForm();
                setSubmitting(false);
                setShowMsg(true);
                window.scroll(0, 0);
              }, 400);
            }}
          >
            {({
              setFieldValue,
              isValid,
              dirty,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="new-review__form">
                <div className="input-group">
                  <TextInput
                    label="Name"
                    name="reviewedName"
                    type="text"
                    placeholder="Enter name"
                  />
                </div>
                <div className="input-group">
                  <Select label="Select category" name="reviewedCat">
                    <option value="">select option</option>
                    {categories.map((category) => (
                      <option value={category.name} key={category.id}>
                        {category.name.toLowerCase()}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="input-group">
                  <TextInput
                    label="Tagline (enter a short intro)"
                    name="tagline"
                    type="text"
                    placeholder="Enter tagline"
                  />
                </div>
                <div className="input-group input-group--textarea">
                  <label className="input-group__label" htmlFor="userReview">
                    Your review
                  </label>
                  <Field
                    name="userReview"
                    component="textarea"
                    placeholder="Enter review"
                    className={
                      errors.userReview && touched.userReview
                        ? "input-group__input input-group__input--error"
                        : "input-group__input"
                    }
                    rows="5"
                  />
                  <ErrorMessage name="userReview">
                    {(msg) => <span className="input-group__error">{msg}</span>}
                  </ErrorMessage>
                </div>
                <div className="input-group">
                  <TextInput
                    label="Website"
                    name="website"
                    type="text"
                    placeholder="Enter website"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Telephone"
                    name="telephone"
                    type="text"
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="input-group">
                  <TextInput
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Enter address"
                  />
                </div>
                <div className="input-group">
                  <label
                    className="input-group__label"
                    htmlFor="reviewedImages"
                  >
                    Add image(s)
                  </label>
                  <input
                    id="reviewedImages"
                    name="reviewedImages"
                    type="file"
                    className="input-group__input"
                    value={Formik.reviewedImages}
                    multiple
                    onChange={(e) => {
                      setFieldValue("reviewedImages", e.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage name="reviewedImages" />
                </div>
                <div className="input-group">
                  <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit"
                    className="btn btn--blue btn--form"
                  >
                    <p className="btn__text">submit</p>
                    {isSubmitting && <Loader />}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </section>
  );
};

export default NewReview;
