import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import Select from "../../shared/components/FormElements/Select/Select";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import reviewService from "../../services/review";
import LoaderShine from "../../shared/loaders/LoaderShine";

const EditDialog = ({ loading, submitEditForm }) => {
  const [currentReview, setCurrentReview] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const appState = useSelector((state) => state);
  const { currentReviewId } = appState.dashboard;

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await reviewService.getReviewById(currentReviewId);
        setCurrentReview(response.review);
      } catch (error) {
        setFetchError(error.response.data.message);
      }
    };
    getReview();
  }, [currentReviewId]);

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

  if (fetchError)
    return (
      <div className="dashboard__modal-edit-form">
        <div class="dashboard__error-cont">
          Could not load review details, please try again
        </div>
      </div>
    );
  else if (currentReview === null) {
    return (
      <div className="dashboard__modal-edit-form">
        <div className="d-flex-btw mb-2">
          <div className="dashboard__modal-edit-form__group">
            <LoaderShine loaderClass="line-edit" />
          </div>
          <div className="dashboard__modal-edit-form__group">
            <LoaderShine loaderClass="line-edit" />
          </div>
        </div>
        <div className="d-flex-btw mb-2">
          <div className="dashboard__modal-edit-form__group">
            <LoaderShine loaderClass="line-edit" />
          </div>
          <div className="dashboard__modal-edit-form__group">
            <LoaderShine loaderClass="line-edit" />
          </div>
        </div>
        <div className="d-flex-btw mb-2">
          <div className="dashboard__modal-edit-form__group">
            <LoaderShine loaderClass="line-edit-tarea" />
          </div>
          <div className="dashboard__modal-edit-form__group">
            <LoaderShine loaderClass="line-edit" />
          </div>
        </div>
        <div className="d-flex-end">
          <div className="user-profile__form__options">
            <button type="submit" disabled={true}>
              <p className="btn__text">save</p>
              {loading && <Loader />}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Formik
      initialValues={{
        category: currentReview.category,
        introText: currentReview.introText,
        reviewDetails: currentReview.reviewDetails,
        address: currentReview.address,
        telephone: currentReview.telephone,
        website: currentReview.website,
      }}
      validationSchema={Yup.object({
        category: Yup.string().lowercase(),
        introText: Yup.string()
          .max(25, "intro text should not be more than 25 characters")
          .trim(),
        reviewDetails: Yup.string().required("This field is required").trim(),
        address: Yup.string().trim(),
        telephone: Yup.string().trim(),
        website: Yup.string().trim(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        submitEditForm(currentReviewId, values);
      }}
    >
      {({ initialValues, values }) => (
        <Form className="dashboard__modal-edit-form">
          <div className="d-flex-btw mb-2">
            <div className="dashboard__modal-edit-form__group">
              <Select label="Select category" name="reviewedCat">
                <option value={initialValues.category}>
                  {initialValues.category}
                </option>
                {categories
                  .filter(
                    (category) =>
                      category.name.toLocaleLowerCase !== values.category
                  )
                  .map((category) => (
                    <option value={category.name} key={category.id}>
                      {category.name.toLowerCase()}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Tagline (enter a short intro)"
                name="introText"
                type="text"
                value={values.introText}
              />
            </div>
          </div>
          <div className="d-flex-btw mb-2">
            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Telephone"
                name="telephone"
                type="text"
                value={values.telephone}
              />
            </div>
            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Website"
                name="website"
                type="text"
                value={values.website}
              />
            </div>
          </div>
          <div className="d-flex-btw mb-2">
            <div className="dashboard__modal-edit-form__group">
              <label className="input-group__label" htmlFor="userReview">
                Your review
              </label>
              <Field
                name="reviewDetails"
                component="textarea"
                rows="5"
                className="input-group__input"
                value={values.reviewDetails}
              />
            </div>

            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Address"
                name="address"
                type="text"
                value={values.address}
              />
            </div>
          </div>
          <div className="d-flex-end">
            <div className="user-profile__form__options">
              <button
                type="submit"
                disabled={loading}
                className="btn__editform"
              >
                {!loading && <p className="btn__text">save</p>}
                {loading && <Loader />}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditDialog;
