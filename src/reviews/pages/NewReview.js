import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../shared/components/FormElements/Select/Select";
import PageHeader from "../../shared/components/PageHeader/PageHeader";

const NewReview = () => {
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
    <section className="new-review section">
      <PageHeader title="New Review" />
      <div className=" grid-width new-review__formcont">
        <Card cardClass="new-review__form-cont">
          <Formik
            initialValues={{
              reviewedName: "",
              reviewedCat: "",
              tagline: "",
              reviewedImages: "",
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
              }, 400);
            }}
          >
            {({ setFieldValue, isValid, dirty, errors, touched }) => (
              <Form className="new-review__form">
                <div className="new-review__form-comp">
                  <TextInput
                    label="Name"
                    name="reviewedName"
                    type="text"
                    placeholder="Enter name"
                  />
                </div>
                <div className="new-review__form-comp">
                  <Select label="Select category" name="reviewedCat">
                    <option value="">Select option</option>
                    {categories.map((category) => (
                      <option value={category.name} key={category.id}>
                        {category.name.toLowerCase()}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="new-review__form-comp">
                  <TextInput
                    label="Tagline (enter a short intro)"
                    name="tagline"
                    type="text"
                    placeholder="Enter tagline"
                  />
                </div>
                <div className="new-review__form-comp">
                  <label htmlFor="userReview">Your review</label>
                  <Field
                    name="userReview"
                    component="textarea"
                    className={
                      errors.userReview && touched.userReview
                        ? "input input-error"
                        : "input"
                    }
                    rows="5"
                  />
                  <ErrorMessage name="userReview">
                    {(msg) => <span className="error">{`*${msg}`}</span>}
                  </ErrorMessage>
                </div>
                <div className="new-review__form-comp">
                  <label htmlFor="re">Add image(s)</label>
                  <input
                    id="reviewedImages"
                    name="reviewedImages"
                    type="file"
                    className="input"
                    value={Formik.reviewedImages}
                    multiple
                    onChange={(e) => {
                      setFieldValue("reviewedImages", e.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage name="reviewedImages" />
                </div>
                <div className="new-review__form-comp">
                  <button
                    disabled={!(isValid && dirty)}
                    type="submit "
                    className="btn btn--blue"
                  >
                    Submit
                  </button>
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
