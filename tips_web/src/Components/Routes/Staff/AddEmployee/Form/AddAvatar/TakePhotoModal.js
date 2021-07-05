import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "../../../../../../assets/icons";
import AddAvatarWrapper from "./AddAvatarWrapper";

const initialState = {
  video: null,
  canvas: null,
  photo: null,
};

const windowWidth = window.innerWidth;

const TakePhotoModal = ({ isOpen, handleClose, handleSubmit }) => {
  const camera = useSelector((state) => state.systemReducer.camera);

  const [nodes, setNodes] = useState(initialState);
  const [image, setImage] = useState("");
  const [dimensions, setDimensions] = useState({
    width: windowWidth * 0.4,
    height: (windowWidth * 0.4) / (4 / 3),
  });
  const setNodesRefs = useCallback((node) => {
    if (node && (!nodes.video || !nodes.canvas || !nodes.photo))
      setNodes((prev) => ({ ...prev, [node.id]: node }));
  });

  let streaming = false;

  const onCanPlay = () => {
    let newHeight = 0;
    if (!streaming) {
      newHeight = nodes.video.Height / (nodes.video.Width / dimensions.width);

      if (isNaN(newHeight)) {
        newHeight = dimensions.width / (4 / 3);
      }

      setDimensions((prev) => ({ ...prev, height: newHeight }));

      nodes.video.setAttribute("width", dimensions.width);
      nodes.video.setAttribute("height", newHeight);
      nodes.canvas.setAttribute("width", dimensions.width);
      nodes.canvas.setAttribute("height", newHeight);
      streaming = true;
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    takepicture();
  };

  const startup = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        nodes.video.srcObject = stream;
        nodes.video.play();
      })
      .catch((err) => console.log("Error: ", err));

    clearphoto();
  };

  const clearphoto = () => {
    const context = nodes.canvas.getContext("2d");
    context.fillStyle = "#00a03e";
    context.fillRect(0, 0, nodes.canvas.width, nodes.canvas.height);

    const data = nodes.canvas.toDataURL("image/png");
    nodes.photo.src = data;
  };

  const takepicture = () => {
    const context = nodes.canvas.getContext("2d");

    if (dimensions.width && dimensions.height) {
      nodes.canvas.width = dimensions.width;
      nodes.canvas.height = dimensions.height;
      context.drawImage(nodes.video, 0, 0, dimensions.width, dimensions.height);
      const data = nodes.canvas.toDataURL("image/png");
      nodes.photo.src = data;
      setImage(data);
    } else {
      clearphoto();
    }
  };

  const handleModalClose = (isSubmit) => {
    if (isSubmit) handleSubmit(image);
    else handleClose();
  };

  useEffect(() => {
    if (camera) {
      if (nodes.video && nodes.canvas && nodes.photo) startup();
    } else {
      nodes.video?.pause();
      const stream = nodes.video?.srcObject;
      stream?.getTracks()[0].stop();

      if (nodes.video) nodes.video.srcObject = null;
      setNodes(initialState);
    }
  }, [camera, nodes.video, nodes.canvas, nodes.photo]);

  return (
    <AddAvatarWrapper
      title="Сделать фото"
      btn="ОК"
      isOpen={isOpen}
      handleClose={handleModalClose}
      disabled={!image}
    >
      <div className="takePhoto">
        <div
          className="takePhoto__wrapper"
          style={{
            width: `${dimensions.height}px`,
            height: `${dimensions.height}px`,
          }}
        >
          <video
            className="takePhoto__item"
            id="video"
            ref={setNodesRefs}
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
            onCanPlay={onCanPlay}
          ></video>
        </div>
        <button onClick={onClick} className="takePhoto__btn">
          <Camera />
        </button>
        <canvas
          id="canvas"
          style={{ display: "none" }}
          ref={setNodesRefs}
        ></canvas>
        <div
          className="takePhoto__wrapper"
          style={{
            width: `${dimensions.height}px`,
            height: `${dimensions.height}px`,
          }}
        >
          <img
            id="photo"
            className="takePhoto__item"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
            ref={setNodesRefs}
          />
        </div>
      </div>
    </AddAvatarWrapper>
  );
};

export default TakePhotoModal;
