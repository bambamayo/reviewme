import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import SectionHeader from "../../../shared/components/SectionHeader/SectionHeader";
import TextInput from "../../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../../shared/components/FormElements/Select/Select";
import Card from "../../../shared/components/UI/Card/Card";
import Loader from "../../../shared/components/UI/Loader/Loader";

const NewCategoryReq = () => {
  return (
    <section className="new-category section--page section--greybg">
      <SectionHeader>Request for a category</SectionHeader>
      <div className="grid-width new-category__container"></div>
      <Card cardClass="card__form">
        <Formik
          initialValues={{ categoryName: "", visited: "", writeReview: "" }}
          validationSchema={Yup.object({
            categoryName: Yup.string()
              .lowercase()
              .required("Please enter a category name"),
            writeReview: Yup.string()
              .oneOf(["yes", "no"], "Invalid option type")
              .required("This field is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isValid, dirty, isSubmitting }) => (
            <Form className="new-category__form">
              <div className="input-group">
                <TextInput
                  label="Category Name"
                  name="categoryName"
                  type="text"
                  placeholder="Enter new category name"
                />
              </div>
              <div className="input-group">
                <Select
                  label="Will you like to write a review for it?"
                  name="writeReview"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </div>
              <div className="input-group">
                <button
                  disabled={!(isValid && dirty)}
                  type="submit "
                  className="btn btn--blue btn--form"
                >
                  <p className="btn__text">Submit</p>
                  {isSubmitting && <Loader />}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </section>
  );
};

export default NewCategoryReq;
