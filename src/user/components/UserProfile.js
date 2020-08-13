import React from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch, batch } from "react-redux";

import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Icon from "../../shared/components/UI/Icon/Icon";
import Button from "../../shared/components/UI/Button/Button";
import Modal from "../../shared/components/Modal/Modal";
import Avatar from "../../shared/components/UI/Avatar/Avatar";
import { showModal, hideModal } from "../../redux/actions/modal";
import {
  setMessage,
  editStart,
  editFailed,
  editSuccess,
  stopEditing,
} from "../../redux/actions/dashboard";
import { setDate } from "../../shared/utils/helpers";
import LoaderShine from "../../shared/loaders/LoaderShine";
import userService from "../../services/user";
import { getReloadedUser } from "../../redux/actions/auth";

const UserProfile = () => {
  const appState = useSelector((state) => state);
  const { user } = appState.auth;
  const show = appState.showModal;
  const { editing, loading, message, error } = appState.dashboard;
  const { userId } = appState.auth;
  const dispatch = useDispatch();

  const handleAvatarClicked = (e) => {
    e.preventDefault();
    dispatch(showModal());
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const handleChangeProfilePicture = () => {
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
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const data = {
            avatar: result.info.eager[0].secure_url,
            userThumbnail: result.info.thumbnail_url,
          };
          const response = await userService.editUser(userId, data);
          batch(() => {
            dispatch(stopEditing());
            dispatch(getReloadedUser());
            dispatch(editSuccess(response.user));
            dispatch(setMessage("Profile edited successfully"));
          });
        } else if (error) {
          dispatch(editFailed("Could not perform operation please try again"));
        }
      }
    );
    widget.open();
  };

  const deleteProfilePicture = async () => {
    if (window.confirm("Are you sure you want to delete profile picture")) {
      try {
        const data = {
          avatar: "",
          userThumbnail: "",
        };
        const response = await userService.editUser(userId, data);

        batch(() => {
          dispatch(stopEditing());
          dispatch(getReloadedUser());
          dispatch(editSuccess(response.user));
          dispatch(setMessage("Profile edited successfully"));
        });
      } catch (error) {
        dispatch(editFailed("Could not perform operation please try again"));
      }
    }
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
                dataSrc={user.avatar}
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
            error={error ? true : false}
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
                    dataSrc={user.avatar}
                    // image={user.avatar}
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
                    onClick={() => deleteProfilePicture()}
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
              onSubmit={async (values) => {
                dispatch(editStart());
                try {
                  const response = await userService.editUser(userId, values);
                  dispatch(stopEditing());
                  dispatch(getReloadedUser());
                  dispatch(editSuccess(response.user));
                  dispatch(setMessage("Profile edited successfully"));
                } catch (error) {
                  dispatch(
                    editFailed("Could not perform operation please try again")
                  );
                }
              }}
            >
              {({ values }) => (
                <Form className="user-profile__form">
                  <div className="d-flex-btw">
                    <div className="user-profile__form__group">
                      <TextInput
                        label="Fullname"
                        name="fullName"
                        type="text"
                        value={values.fullname}
                        disabled={!editing}
                      />
                    </div>
                    <div className="user-profile__form__group">
                      <TextInput
                        label="Email"
                        name="email"
                        type="text"
                        value={values.email}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="d-flex-btw">
                    <div className="user-profile__form__group">
                      <TextInput
                        label="Username"
                        name="username"
                        type="text"
                        value={values.username}
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
