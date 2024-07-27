import {StyleSheet,Modal, Text, ActivityIndicator, Image, View} from 'react-native';
import React from 'react';
import {useLoader} from '../utils/loaderContext'
const Loader = () => {
  const { loading } = useLoader();

  return (
    <Modal
    transparent={true}
    animationType="none"
    visible={loading}
    onRequestClose={() => {}}
  >
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#fff" />
      <Text
        style={{color: '#fff', fontWeight: '600', fontSize: 18, marginTop: 15}}>
        Loading...
      </Text>
    </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99,
    width: '100%',
  },
  loaderGif: {},
});
