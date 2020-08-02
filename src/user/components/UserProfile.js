import React from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";

import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Icon from "../../shared/components/UI/Icon/Icon";
import Button from "../../shared/components/UI/Button/Button";
import Modal from "../../shared/components/Modal/Modal";
import Avatar from "../../shared/components/UI/Avatar/Avatar";
import useNow from "../../assets/images/use-now.jpg";
import { showModal, hideModal } from "../../redux/actions/modal";
import { editProfile, setMessage } from "../../redux/actions/dashboard";
import { setDate } from "../../shared/utils/helpers";
import LoaderShine from "../../shared/loaders/LoaderShine";

const UserProfile = () => {
  const appState = useSelector((state) => state);
  const { user } = appState.auth;
  const show = appState.showModal;
  const { editing, loading, message, error } = appState.dashboard;
  const dispatch = useDispatch();

  const handleAvatarClicked = (e) => {
    e.preventDefault();
    dispatch(showModal());
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    console.log("Image files", files);
    console.log("Image file", files[0]);
  };

  return (
    <>
      {
        <Modal
          modalCloseBtnClick={handleCloseModal}
          cancelButton={true}
          show={show}
          className="dashboard__modal--profile"
          headerClass="dashboard__modal--profile-header"
          contentClass="dashboard__modal--profile-content"
        >
          <div className="dashboard__modal--profile-avatarcont">
            <Avatar
              image={useNow}
              alttext="username"
              avatarClass="dashboard__modal--profile-avatar"
            />
          </div>
        </Modal>
      }
      <section className="user-profile">
        {message && (
          <Message
            msg={message}
            bgColor={error ? "red" : "green"}
            iconClicked={() => dispatch(setMessage(""))}
          />
        )}
        {!user ? (
          <div className="user-profile__form">
            <div className="user-profile__avatar-cont">
              <LoaderShine loaderClass="l-image" />
            </div>
            <div className="d-flex-btw">
              <div className="user-profile__form__group">
                <LoaderShine loaderClass="line" />
              </div>
              <div className="user-profile__form__group">
                <LoaderShine loaderClass="line" />
              </div>
            </div>
            <div className="d-flex-btw">
              <div className="user-profile__form__group">
                <LoaderShine loaderClass="line" />
              </div>
              <div className="user-profile__form__group">
                <LoaderShine loaderClass="line" />
              </div>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{
              fullname: user.fullname,
              username: user.username,
              email: user.email,
            }}
            onSubmit={(values) => {
              console.log(values);
              dispatch(editProfile());
            }}
          >
            {({ values, initialValues }) => (
              <Form className="user-profile__form">
                <div className="user-profile__avatar-cont">
                  <Button
                    className={`user-profile__avatar ${
                      editing ? `user-profile__avatar__editing` : null
                    }`}
                    onClick={handleAvatarClicked}
                    disabled={editing}
                  >
                    <Avatar
                      image={useNow}
                      alttext="username"
                      avatarClass="user-profile__avatar-img"
                    />
                  </Button>
                  {editing && <input className="input__hidden" type="file" />}
                  {editing && (
                    <button className="btn__inputselect">
                      <span className="user-profile__avatar-edit">
                        <Icon type={["fas", "camera-retro"]} />
                      </span>
                      <span
                        className="user-profile__avatar-delete"
                        title="delete profile picture"
                      >
                        <Icon type={["far", "trash-alt"]} />
                      </span>
                    </button>
                  )}
                  <button onClick={handleImageUpload}>submit</button>
                </div>
                <div className="d-flex-btw">
                  <div className="user-profile__form__group">
                    <TextInput
                      label="Fullname"
                      name="fullName"
                      type="text"
                      value={
                        !editing ? initialValues.fullname : values.fullname
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="user-profile__form__group">
                    <TextInput
                      label="Email"
                      name="email"
                      type="text"
                      disabled={!editing}
                      value={!editing ? user.email : user.email}
                    />
                  </div>
                </div>
                <div className="d-flex-btw">
                  <div className="user-profile__form__group">
                    <TextInput
                      label="Username"
                      name="username"
                      type="text"
                      value={!editing ? user.username : user.username}
                      disabled={!editing}
                    />
                  </div>
                  <div className="user-profile__form__group">
                    <TextInput
                      label="Date joined"
                      name="dateJoined"
                      type="text"
                      value={setDate(user.createdAt)}
                      disabled={true}
                    />
                  </div>
                </div>
                {editing && (
                  <div className="d-flex-end">
                    <div className="user-profile__form__options">
                      <button type="submit" disabled={loading}>
                        <p className="btn__text">save</p>
                        {loading && <Loader />}
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}
      </section>
    </>
  );
};

export default UserProfile;
