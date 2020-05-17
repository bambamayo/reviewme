import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import SectionHeader from "../../../../shared/components/SectionHeader/SectionHeader";
import TextInput from "../../../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../../../shared/components/FormElements/Select/Select";
import "./NewCategoryForm.css";

const NewCategoryReq = () => {
  return (
    <section className="new-category section section--greybg">
      <SectionHeader>Request for a category</SectionHeader>
      <div className="new-category__form-cont"></div>
      <Formik
        initialValues={{ categoryName: "", visited: "", writeReview: "" }}
        validationSchema={Yup.object({
          categoryName: Yup.string()
            .lowercase()
            .required("Please enter a category name"),
          visited: Yup.string()
            .oneOf(["yes", "no"], "Invalid option type")
            .required("This field is required"),
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
        <Form className="new-category__form">
          <div className="form__comp">
            <TextInput
              label="Category Name"
              name="categoryName"
              type="text"
              placeholder="Enter new category name"
            />
          </div>
          <div className="form__comp">
            <Select
              label="Have you visited a place in this category?"
              name="visited"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>
          <div className="form__comp">
            <Select
              label="Will you like to write a review for it?"
              name="writeReview"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>
          <div className="form__comp">
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default NewCategoryReq;
