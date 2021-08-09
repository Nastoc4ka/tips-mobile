import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import AddAvatarWrapper from "./AddAvatarWrapper";
import Slider from "../../../../../elements/Slider";

const initialState = {
  position: { x: 0.5, y: 0.5 },
  scale: 1,
  borderRadius: 0,
  savedAvatar: null,
  isTransparent: false,
  backgroundColor: null,
};

const EditAvatarModal = ({ isOpen, handleSave, image }) => {
  let editorRef = null;

  const [avatar, setAvatar] = useState(initialState);

  const onSave = (save = true) => {
    const img = save ? editorRef.getImageScaledToCanvas().toDataURL() : "";
    handleSave(img);
  };

  const setEditorRef = (editor) => {
    if (editor) editorRef = editor;
  };

  const handleScale = (e, scale) => {
    setAvatar({ ...avatar, scale });
  };

  const handleXPosition = (e, x) => {
    setAvatar({ ...avatar, position: { ...avatar.position, x } });
  };

  const handleYPosition = (e, y) => {
    setAvatar({ ...avatar, position: { ...avatar.position, y } });
  };

  const handlePositionChange = (position) => {
    setAvatar({ ...avatar, position });
  };

  return (
    <AddAvatarWrapper
      title="Редактирование"
      btn="Сохранить"
      isOpen={isOpen}
      handleClose={onSave}
    >
      <div className="editPhoto">
        <div>
          <AvatarEditor
            ref={setEditorRef}
            width={document.documentElement.clientWidth * 0.3}
            scale={parseFloat(avatar.scale)}
            height={document.documentElement.clientWidth * 0.3}
            position={avatar.position}
            onPositionChange={handlePositionChange}
            borderRadius={document.documentElement.clientWidth * 0.6}
            image={image}
            className="editor-canvas"
          />
        </div>
        <div className="editPhoto__controllers">
          <label className="editPhoto__label">Zoom:</label>
          <Slider
            onChange={handleScale}
            min={1}
            max={2}
            step={0.01}
            value={avatar.scale}
          />
          <label className="editPhoto__label">X Position:</label>
          <Slider
            onChange={handleXPosition}
            min={0}
            max={1}
            step={0.01}
            value={avatar.position.x}
          />
          <label className="editPhoto__label">Y Position:</label>
          <Slider
            onChange={handleYPosition}
            min={0}
            max={1}
            step={0.01}
            value={avatar.position.y}
          />
        </div>
      </div>
    </AddAvatarWrapper>
  );
};

export default EditAvatarModal;
