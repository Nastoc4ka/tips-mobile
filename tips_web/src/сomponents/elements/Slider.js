import React from "react";
import { Slider, withStyles } from "@material-ui/core";

const CustomSlider = withStyles(() => ({
  root: {
    color: "#00A03E",
  },
}))(Slider);

export default CustomSlider;
