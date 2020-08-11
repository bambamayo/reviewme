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

  const handleChangeProfilePicture = (id, data) => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `ayobami-agunroye`,
        uploadPreset: `profile_pictures`,
        sources: ["local", "url", "camera", "instagram"],
        maxFiles: 1,
        cropping: true,
        multiple: false,
        showSkipCropButton: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info.eager[0].secure_url);
          console.log(result.info.thumbnail_url);
        } else if (error) {
          return `${error}`;
        }
      }
    );
    widget.open();
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
            {!user ? null : user.avatar ? (
              <Avatar
                image={useNow}
                alttext="username"
                avatarClass="dashboard__modal--profile-avatar"
              />
            ) : (
              <span className="dashboard__modal--profile-empty">
                <Icon
                  classname="dashboard__modal--profile-emptyicon"
                  type={["far", "user"]}
                />
              </span>
            )}
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
          <>
            <div className="user-profile__avatar-cont">
              <Button
                className={`user-profile__avatar ${
                  editing ? `user-profile__avatar__editing` : null
                }`}
                onClick={handleAvatarClicked}
                disabled={editing}
              >
                {user.avatar ? (
                  <Avatar
                    image={user.avatar}
                    alttext={user.username}
                    avatarClass="user-profile__avatar-img"
                  />
                ) : (
                  <Icon classname="" type={["far", "user"]} />
                )}
              </Button>
              {/* {editing && <input className="input__hidden" type="file" />} */}
              {editing && (
                <div className="user-profile__avatar-contbtns">
                  <Button
                    onClick={() => handleChangeProfilePicture()}
                    className="btn__inputselect"
                    title="add profile picture"
                  >
                    <span className="user-profile__avatar-edit">
                      <Icon type={["fas", "camera-retro"]} />
                    </span>
                  </Button>
                  <Button
                    title="delete profile picture"
                    className="btn__inputselect"
                  >
                    <span
                      className="user-profile__avatar-delete"
                      title="delete profile picture"
                    >
                      <Icon type={["far", "trash-alt"]} />
                    </span>
                  </Button>
                </div>
              )}
            </div>

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
          </>
        )}
      </section>
    </>
  );
};

export default UserProfile;
