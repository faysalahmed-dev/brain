import React, { useContext } from "react";
import { SmartBrainContext } from "../../Context/SmartBrian.context";
import { toggleModel } from "../../Reducers/SmartBrainReducers/SmartBrain.action";
import imgRef from "../../Refs/ImgRef";

import styles from "./FaceRec.module.scss";

const stylesObj = () => {
  return {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%) scale(1.7,2)",
    zIndex: 200,
    cursor: "default",
  };
};

const FaceRecognition = () => {
  const {
    state: {
      box: { leftCol, topRow, rightCol, bottomRow },
      imgUrl,
      error,
      showModel,
    },
    dispatch,
  } = useContext(SmartBrainContext);
  let imageUrl = error === false ? imgUrl : "";
  return (
    <>
      {showModel && (
        <div
          className={styles.face_rec_model_bg}
          onClick={() => dispatch(toggleModel(false))}
        ></div>
      )}
      <div
        className={styles.face_rec}
        style={showModel ? stylesObj() : {}}
        onClick={() => dispatch(toggleModel(true))}
      >
        <img
          src={imageUrl}
          ref={imgRef}
          alt="Face_Image"
          className={styles.face_rec__img}
        />
        <div
          className={styles.box}
          style={{
            top: topRow,
            right: rightCol,
            bottom: bottomRow,
            left: leftCol,
          }}
        ></div>
      </div>
    </>
  );
};
export default FaceRecognition;
