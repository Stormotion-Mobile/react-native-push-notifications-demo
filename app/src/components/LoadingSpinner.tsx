import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingSpinner: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#0a88f2" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(LoadingSpinner);
