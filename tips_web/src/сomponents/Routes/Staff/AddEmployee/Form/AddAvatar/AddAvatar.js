import React, { useState } from "react";
import EditAvatarModal from "./EditAvatarModal";
import AvatarImagePath from "../../../../../../assets/images/default.png";
import TakePhotoModal from "./TakePhotoModal";
import { useDispatch } from "react-redux";
import { cameraOff, cameraOn } from "../../../../../../redux/actions";

const AddAvatar = ({ value, handleChange }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    editing: false,
    taking: false,
  });
  const [image, setImage] = useState("");

  const handleEditOpen = () => {
    setOpen((prev) => ({ ...prev, editing: !prev.editing }));
  };

  const handleTakingOpen = (e) => {
    if (e) e.preventDefault();
    if (open.taking) dispatch(cameraOff());
    else dispatch(cameraOn());
    setOpen((prev) => ({ ...prev, taking: !prev.taking }));
  };

  const handleSave = (avatar) => {
    if (avatar) handleChange({ target: { name: "avatar", value: avatar } });
    handleEditOpen();
  };

  const handleChoosingImage = (e) => {
    setImage(e.target.files[0]);
    handleEditOpen();
    e.target.value = "";
  };

  const handleSubmitPhoto = (img) => {
    dispatch(cameraOff());
    handleTakingOpen();
    setImage(img);
    handleEditOpen();
  };

  return (
    <div>
      <div className="addEmployee__avatar">
        <img
          src={value ? value : AvatarImagePath}
          className="addEmployee__avatar_img"
          style={{ width: "55px", height: "55px", borderRadius: `27.5px` }}
        />
        <div className="addEmployee__avatar_buttons">
          <label className="addEmployee__avatar_label" htmlFor="edit">
            Выбрать фото
          </label>
          <input
            className="addEmployee__avatar_input"
            type="file"
            id="edit"
            onChange={handleChoosingImage}
          />
          <button
            onClick={handleTakingOpen}
            className="addEmployee__avatar_label"
          >
            Сделать фото
          </button>
        </div>
      </div>
      <EditAvatarModal
        isOpen={open.editing}
        image={image}
        handleSave={handleSave}
      />

      <TakePhotoModal
        isOpen={open.taking}
        handleClose={handleTakingOpen}
        handleSubmit={handleSubmitPhoto}
      />
    </div>
  );
};

export default AddAvatar;
