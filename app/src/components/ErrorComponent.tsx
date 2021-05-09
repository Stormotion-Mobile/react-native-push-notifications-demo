import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.comment}>Oops, something went wrong...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  comment: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    padding: 10,
  },
});

export default React.memo(ErrorComponent);
