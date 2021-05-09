import React from 'react';
import Svg, {Path} from 'react-native-svg';

const EmptyListIcon: React.FC = () => {
  return (
    <Svg width="150" height="150" viewBox="0 0 24 24" fill="gray">
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M19 5v9h-5v5H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10l6-6V5c0-1.1-.9-2-2-2zm-7 11H7v-2h5v2zm5-4H7V8h10v2z" />
    </Svg>
  );
};

export default EmptyListIcon;
