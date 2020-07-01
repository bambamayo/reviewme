import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import SectionHeader from "../../../shared/components/SectionHeader/SectionHeader";
import TextInput from "../../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../../shared/components/FormElements/Select/Select";
import Card from "../../../shared/components/UI/Card/Card";
import Loader from "../../../shared/components/UI/Loader/Loader";
import Button from "../../../shared/components/UI/Button/Button";
import Message from "../../../shared/components/Message/Message";

const NewCategoryReq = () => {
  const [showMsg, setShowMsg] = useState(false);

  const handleHideMsg = () => {
    setShowMsg(false);
  };
  return (
    <section className="new-category section--page section--greybg">
      <SectionHeader>Request for a category</SectionHeader>
      <div className="grid-width new-category__container"></div>
      <Card cardClass="card__form">
        {showMsg && (
          <Message
            bgColor="green"
            msg="You request has been submitted successfully, you'll be contacted with our decision soon"
            iconClicked={handleHideMsg}
          />
        )}
        <Formik
          initialValues={{ categoryName: "", writeReview: "" }}
          validationSchema={Yup.object({
            categoryName: Yup.string()
              .lowercase()
              .required("Please enter a category name"),
            writeReview: Yup.string()
              .oneOf(["yes", "no"], "Invalid option type")
              .required("This field is required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              console.log(values);
              resetForm();
              setSubmitting(false);
              setShowMsg(true);
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
                <Button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  className="btn btn--blue btn--form"
                >
                  <p className="btn__text">Submit</p>

                  {isSubmitting && <Loader />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </section>
  );
};

export default NewCategoryReq;
