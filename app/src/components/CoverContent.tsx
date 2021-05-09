import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface CoverContentProps {
  title: string;
  style?: {
    view: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  };
}

const CoverContent: React.FC<CoverContentProps> = ({title, style}) => {
  return (
    <View style={[styles.container, style?.view]}>
      <Text style={[styles.title, style?.text]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    padding: 5,
  },
});

export default React.memo(CoverContent);
