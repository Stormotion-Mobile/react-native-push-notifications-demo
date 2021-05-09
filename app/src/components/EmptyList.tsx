import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EmptyListIcon from './icons/EmptyListIcon';

const EmptyList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.comment}>
        Our content manager is working on new articles. Stay in touch!
      </Text>
      <View style={styles.icon}>
        <EmptyListIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  comment: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    padding: 5,
  },
  icon: {
    margin: 10,
    alignItems: 'center',
  },
});

export default React.memo(EmptyList);
