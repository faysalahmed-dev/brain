import React from 'react'
import imgRef from '../../Refs/ImgRef'
import './FaceRec.scss'



const faceRecognition = ({ imgUrl,box}) => {
     const { leftCol, topRow, rightCol, bottomRow } = box;
     return (
          <div className="face-rec col-5 mx-auto">
               <img src={imgUrl} ref={imgRef} alt="Face_Image" className="face-rec__img" />
               <div className="box" 
                    style={{ top: topRow,right:rightCol,bottom:bottomRow,left: leftCol}}></div>
          </div>
     )
}
export default faceRecognition;