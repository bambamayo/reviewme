import React from "react";
import { Formik, Form, Field } from "formik";

import Select from "../../shared/components/FormElements/Select/Select";
import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";

const EditDialog = ({ loading }) => {
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
    <Formik
      initialValues={{
        category: "clubs",
        introText: "Best club on the mainland",
        reviewDetails:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, at est optio porro qui molestiae pariatur, tenetur error blanditiis illo quam fugiat illum voluptate sapiente cum dicta, repellat magnam? Tempore.",
        address: "24, club house street",
        telephone: "09089898989",
        website: "https://club.com",
      }}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log(values);
        }, 400);
      }}
    >
      {({ initialValues, values }) => (
        <Form className="dashboard__modal-edit-form">
          <div className="d-flex-btw mb-2">
            <div className="dashboard__modal-edit-form__group">
              <Select label="Select category" name="reviewedCat">
                <option value="">select option</option>
                {categories.map((category) => (
                  <option value={category.name} key={category.id}>
                    {category.name.toLowerCase()}
                  </option>
                ))}
              </Select>
            </div>
            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Tagline (enter a short intro)"
                name="tagline"
                type="text"
                placeholder="Enter tagline"
              />
            </div>
          </div>
          <div className="d-flex-btw mb-2">
            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Telephone"
                name="telephone"
                type="text"
                placeholder="Enter contact number"
              />
            </div>
            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Website"
                name="website"
                type="text"
                placeholder="Enter website"
              />
            </div>
          </div>
          <div className="d-flex-btw mb-2">
            <div className="dashboard__modal-edit-form__group">
              <label className="input-group__label" htmlFor="userReview">
                Your review
              </label>
              <Field
                name="userReview"
                component="textarea"
                placeholder="Enter review"
                rows="5"
                className="input-group__input"
              />
            </div>

            <div className="dashboard__modal-edit-form__group">
              <TextInput
                label="Address"
                name="address"
                type="text"
                placeholder="Enter address"
              />
            </div>
          </div>
          <div className="d-flex-end">
            <div className="user-profile__form__options">
              <button type="submit" disabled={loading}>
                <p className="btn__text">save</p>
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
