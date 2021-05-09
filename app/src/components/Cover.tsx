import React, {PropsWithChildren, useMemo} from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  ASPECT_RATIO,
  BORDER_RADIUS_BIG,
  BORDER_RADIUS_SMALL,
} from '../utils/constants';
import ImageShadow from './ImageShadow';

type Props = PropsWithChildren<{
  image?: string;
  rounded: boolean;
}>;

const Cover: React.FC<Props> = ({image, children, rounded}) => {
  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      aspectRatio: ASPECT_RATIO,
      borderRadius: rounded ? BORDER_RADIUS_BIG : 0,
    }),
    [rounded],
  );

  return (
    <View style={containerStyle}>
      <Image
        style={styles.image}
        borderRadius={rounded ? BORDER_RADIUS_SMALL : 0}
        defaultSource={require('../assets/placeholder.jpg')}
        source={image ? {uri: image} : require('../assets/default.png')}
        resizeMode="cover"
      />

      <View style={StyleSheet.absoluteFill}>
        <ImageShadow rounded={rounded} />
      </View>

      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(Cover);
