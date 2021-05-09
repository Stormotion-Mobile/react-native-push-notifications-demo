import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppIcon from './icons/AppIcon';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default React.memo(Header);
