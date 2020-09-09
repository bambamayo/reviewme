import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Image, Placeholder } from "cloudinary-react";

import TextInput from "../../shared/components/FormElements/TextInput/TextInput";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Icon from "../../shared/components/UI/Icon/Icon";
import Button from "../../shared/components/UI/Button/Button";
import Modal from "../../shared/components/Modal/Modal";
import { showModal, hideModal } from "../../redux/actions/modal";
import {
  setMsg,
  editStart,
  editFailed,
  editSuccess,
  stopEditing,
  updateProfilePicture,
  deleteUserAccount,
  deleteProfilePicture,
} from "../../redux/actions/dashboard";
import { setDate } from "../../shared/utils/helpers";
import LoaderShine from "../../shared/loaders/LoaderShine";
import userService from "../../services/user";
import { getReloadedUser } from "../../redux/actions/auth";
import ImagePreview from "../../shared/components/ImagePreview/ImagePreview";

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [deletingProfile, setDeletingProfile] = useState(false);
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

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const closePreviewDialog = () => {
    setImage(null);
  };

  const editUserProfilePic = () => {
    dispatch(updateProfilePicture(image));
    setImage(null);
  };

  const deleteProfilePic = () => {
    if (window.confirm("Delete profile picture?")) {
      dispatch(deleteProfilePicture());
    } else {
      return;
    }
  };

  return (
    <>
      {
        <ImagePreview
          closeModal={handleCloseModal}
          show={image ? true : false}
          imageSrc={image ? URL.createObjectURL(image) : null}
          cancelClicked={closePreviewDialog}
          saveClicked={editUserProfilePic}
        />
      }
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
            {!user ? null : user.avatarPublicId ? (
              <Image
                publicId={user.avatarPublicId}
                dpr="auto"
                responsive
                width="auto"
                crop="scale"
                responsiveUseBreakpoints="true"
                loading="lazy"
                quality="auto"
                fetchFormat="auto"
                alt={user.username}
                className="dashboard__modal--profile-avatar"
              >
                <Placeholder type="blur" />
              </Image>
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
            iconClicked={() => dispatch(setMsg(""))}
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
                {user.avatarPublicId ? (
                  <Image
                    publicId={user.avatarPublicId}
                    dpr="auto"
                    responsive
                    width="auto"
                    crop="scale"
                    responsiveUseBreakpoints="true"
                    loading="lazy"
                    quality="auto"
                    fetchFormat="auto"
                    className="user-profile__avatar-img"
                  >
                    <Placeholder type="blur" />
                  </Image>
                ) : (
                  <Icon classname="" type={["far", "user"]} />
                )}
              </Button>

              {editing && (
                <div className="user-profile__avatar-contbtns">
                  <div className="user-profile__input-hide-cont">
                    <input
                      id="file-upload"
                      type="file"
                      className="user-profile__input-hide"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="file-upload" title="select profile picture">
                      <span>
                        <Icon type={["fas", "camera-retro"]} />
                      </span>
                    </label>
                  </div>
                  <Button
                    title="delete profile picture"
                    className="btn__inputselect"
                    onClick={() => deleteProfilePic()}
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
                  dispatch(setMsg("Profile edited successfully"));
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
            <div className="user-profile__danger">
              <h3 className="user-profile__danger-header">Danger Zone</h3>
              {!deletingProfile && (
                <div className="user-profile__danger__dc">
                  <Button
                    onClick={() => setDeletingProfile(true)}
                    className="btn btn--red btn-danger"
                  >
                    Delete my account
                  </Button>
                </div>
              )}
              {deletingProfile && (
                <>
                  <h3 className="user-profile__danger-header">
                    Are you sure you want to delete your account? this cannot be
                    reversed
                  </h3>
                  <div className="user-profile__danger__dc">
                    <Button
                      onClick={() => dispatch(deleteUserAccount())}
                      className="btn btn--red btn-danger"
                    >
                      <p className="btn__text">confirm</p>
                      {loading && <Loader />}
                    </Button>
                    <Button
                      className="btn btn--gray btn-danger"
                      onClick={() => setDeletingProfile(false)}
                    >
                      cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default UserProfile;
