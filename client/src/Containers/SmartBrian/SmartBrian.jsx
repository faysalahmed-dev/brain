import React, { Component, Fragment } from "react";
import axios from "axios";
import SearchBox from "../../Components/SearchBox/SearchBox";
import Clarifai from "clarifai";

import Content from "../../Components/Content/Content";
import FaceRecognition from "../../Components/FaceRecognition/FaceRecognition";
import imgRef from "../../Refs/ImgRef";

const app = new Clarifai.App({
  apiKey: "7fcfe4b1fbf04f6685cebdde3ca52ff0",
});

class SmartBrain extends Component {
  state = {
    imgUrl: "",
    box: {},
  };
  calculateFaceBox = data => {
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
  displayFaceBox = box => {
    this.setState({ box }, () => console.log(box));
  };
  onFormSubmit = url => {
    this.setState({ imgUrl: url });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, url)
      .then(response => this.displayFaceBox(this.calculateFaceBox(response)))
      .catch(err => console.log(err));
  };
  componentDidMount() {
    axios.get("http://localhost:4000/").then(console.log);
    //.then(console.log);
  }
  render() {
    const { imgUrl, box } = this.state;
    return (
      <Fragment>
        <Content />
        <SearchBox onFormSubmit={this.onFormSubmit} />
        <FaceRecognition imgUrl={imgUrl} box={box} />
      </Fragment>
    );
  }
}
export default SmartBrain;
