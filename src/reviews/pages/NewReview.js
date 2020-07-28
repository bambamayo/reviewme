import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Card from "../../shared/components/UI/Card/Card";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../shared/components/FormElements/Select/Select";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Button from "../../shared/components/UI/Button/Button";
import reviewService from "../../services/review";

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
    <section className="new-review section--page section--greybg">
      <PageHeader title="New Review" />
      <div className=" grid-width new-review__container">
        <Card cardClass="card__form">
          {/* {uictxt.show && (
            <Message
              iconClicked={uictxt.handleClose}
              msg={uictxt.msg}
              bgColor={uictxt.error ? "#cc0000" : "#008000"}
            />
          )} */}
          <Formik
            initialValues={{
              reviewedName: "",
              category: "",
              introText: "",
              images: [],
              address: "",
              telephone: "",
              website: "",
              reviewDetails: "",
            }}
            validationSchema={Yup.object({
              reviewedName: Yup.string()
                .lowercase()
                .required("Please enter a name"),
              category: Yup.string()
                .lowercase()
                .required("Please enter a category name"),
              introText: Yup.string()
                .lowercase()
                .required("Please enter a tagline"),
              reviewDetails: Yup.string().required("This field is required"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              //let fileElement = document.getElementById("images");
              const data = { ...values };
              try {
                const response = await reviewService.createNewReview(data);
                console.log(response.data);
                resetForm();
                setSubmitting(false);

                window.scroll(0, 0);
              } catch (error) {}
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
                  <Select label="Select category" name="category">
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
                    name="introText"
                    type="text"
                    placeholder="Enter tagline"
                  />
                </div>
                <div className="input-group input-group--textarea">
                  <label className="input-group__label" htmlFor="reviewDetails">
                    Your review
                  </label>
                  <Field
                    name="reviewDetails"
                    component="textarea"
                    placeholder="Enter review"
                    className={
                      errors.reviewDetails && touched.reviewDetails
                        ? "input-group__input input-group__input--error"
                        : "input-group__input"
                    }
                    rows="5"
                  />
                  <ErrorMessage name="reviewDetails">
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
                  <label className="input-group__label" htmlFor="images">
                    Add image(s)
                  </label>
                  <input
                    id="images"
                    name="images"
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
