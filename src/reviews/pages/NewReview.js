import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Card from "../../shared/components/UI/Card/Card";
import categories from "../../categories";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Select from "../../shared/components/FormElements/Select/Select";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Button from "../../shared/components/UI/Button/Button";
import { addNewReview, removeError } from "../../redux/actions/reviews";

const NewReview = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.review);

  return (
    <section className="new-review section--page section--greybg">
      <PageHeader title="New Review" />
      <div className=" grid-width new-review__container">
        <Card cardClass="card__form">
          {error && (
            <Message
              error={true}
              iconClicked={() => dispatch(removeError())}
              msg={error}
            />
          )}
          <Formik
            initialValues={{
              reviewedName: "",
              category: "",
              introText: "",
              address: "",
              telephone: "",
              website: "",
              reviewDetails: "",
            }}
            validationSchema={Yup.object({
              reviewedName: Yup.string()
                .lowercase()
                .required("Please enter a name")
                .trim(),
              category: Yup.string()
                .lowercase()
                .required("Please enter a category name"),
              introText: Yup.string()
                .max(20, "intro text should not be more than 25 characters")
                .trim()
                .required("Please enter a tagline"),
              reviewDetails: Yup.string()
                .required("This field is required")
                .trim(),
              address: Yup.string().trim(),
              telephone: Yup.string().trim(),
              website: Yup.string().trim(),
            })}
            onSubmit={(values) => {
              const data = { ...values };
              dispatch(addNewReview(data));
            }}
          >
            {({ isValid, dirty, errors, touched }) => (
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
                    label="Tagline (enter a short intro, 20 characters)"
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
                    style={{ resize: "none" }}
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
                  <Button
                    disabled={!(isValid && dirty) || loading}
                    type="submit"
                    className="btn btn--blue btn--form"
                  >
                    <p className="btn__text">submit</p>
                    {loading && <Loader />}
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
