import imgRef from "../Refs/ImgRef";
export const calculateFaceBox = data => {
  const FaceBox =
    data.rawData.outputs[0].data.regions[0].region_info.bounding_box;
  const width = imgRef.current.width;
  const height = imgRef.current.height;
  return {
    leftCol: FaceBox.left_col * width,
    topRow: FaceBox.top_row * height,
    rightCol: width - FaceBox.right_col * width,
    bottomRow: height - FaceBox.bottom_row * height,
  };
};
