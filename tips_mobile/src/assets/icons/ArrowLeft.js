import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowLeft = ({ margin }) => {
  return (
    <Svg
      marginLeft={margin}
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2.98113 6.50372L8 11.5507L6.46439 13L0.720701 7.22417L0 6.49944L0.720768 5.77477L6.46446 0L7.99993 1.44947L2.98113 6.50372Z"
        fill="#24A8AC"
      />
    </Svg>
  );
};

export default ArrowLeft;
