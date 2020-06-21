import React, { useState } from "react";
import { Formik, Form } from "formik";

import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
//import Avatar from "../../shared/components/UI/Avatar/Avatar";
import Icon from "../../shared/components/UI/Icon/Icon";

const UserProfile = ({
  editing,
  handleStopEditing,
  loading,
  handleMessage,
  message,
  error,
  handleCloseMessage,
  show,
}) => {
  const [loader, setLoader] = useState(false);
  const user = {
    fullName: "ayobami agunroye",
    userName: "bambamayo",
    email: "bambamagunroye@testing.com",
    dateJoined: "12|10|2011",
  };
  return (
    <section className="user-profile">
      {message && show && (
        <Message
          msg={message}
          bgColor={error ? "red" : "green"}
          iconClicked={handleCloseMessage}
        />
      )}
      <Formik
        initialValues={{
          fullName: "ayobami agunroye",
          userName: "bambamayo",
          email: "bambamagunroye@testing.com",
          dateJoined: "12|10|2011",
        }}
        onSubmit={(values) => {
          setLoader(true);
          setTimeout(() => {
            handleStopEditing();
            setLoader(false);
            handleMessage("Changes saved", false);
            console.log(values);
          }, 2000);
        }}
      >
        {({ initialValues, values }) => (
          <Form className="user-profile__form">
            <div className="user-profile__avatar-cont">
              <button
                className={`user-profile__avatar-icon ${
                  editing ? `user-profile__avatar-icon__editing` : null
                }`}
              >
                <Icon type={["far", "user"]} />
              </button>
              {editing && <input className="input__hidden" type="file" />}
              {editing && (
                <button className="btn__inputselect">
                  <Icon type={["fas", "camera-retro"]} />
                </button>
              )}
            </div>
            <div className="d-flex-btw">
              <div className="user-profile__form__group">
                <TextInput
                  label="Fullname"
                  name="fullName"
                  type="text"
                  value={!editing ? initialValues.fullName : values.fullName}
                  disabled={!editing}
                />
              </div>
              <div className="user-profile__form__group">
                <TextInput
                  label="Email"
                  name="email"
                  type="text"
                  disabled={!editing}
                  value={!editing ? initialValues.email : values.email}
                />
              </div>
            </div>
            <div className="d-flex-btw">
              <div className="user-profile__form__group">
                <TextInput
                  label="Username"
                  name="userName"
                  type="text"
                  value={!editing ? initialValues.userName : values.userName}
                  disabled={!editing}
                />
              </div>
              <div className="user-profile__form__group">
                <TextInput
                  label="Date joined"
                  name="dateJoined"
                  type="text"
                  value={user.dateJoined}
                  disabled={true}
                />
              </div>
            </div>
            {editing && (
              <div className="d-flex-end">
                <div className="user-profile__form__options">
                  <button type="submit" disabled={loading}>
                    <p className="btn__text">save</p>
                    {loader && <Loader />}
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default UserProfile;
