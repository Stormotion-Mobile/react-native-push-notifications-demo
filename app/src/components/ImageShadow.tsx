import React from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {BORDER_RADIUS_SMALL} from '../utils/constants';

interface Props {
  rounded: boolean;
}

const ImageShadow: React.FC<Props> = ({rounded}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 225">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="transparent" stopOpacity="0" />
          <Stop offset="1" stopColor="black" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#grad)"
        rx={rounded ? BORDER_RADIUS_SMALL : '0'}
        ry={rounded ? BORDER_RADIUS_SMALL : '0'}
      />
    </Svg>
  );
};

export default React.memo(ImageShadow);
