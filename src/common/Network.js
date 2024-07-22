import {StyleSheet,Modal, Text, ActivityIndicator, View, Alert} from 'react-native';
import React, { useEffect } from 'react';

const Network = ({isConnected}) => {
   
    useEffect(()=>{
        setTimeout(() =>{
            alert("No network connection, please \n  check your network and try again.");
        }, 1000);
    })

  return (
    <Modal
    transparent={true}
    animationType="none"
    visible={!isConnected}
    onRequestClose={() => {}}
  >
    <View style={styles.networkContainer}>
      <ActivityIndicator size="large" color="#fff" />
      <Text
        style={{color: '#fff', fontWeight: '600', fontSize: 18, marginTop: 15}}>
        No network connection...
      </Text>
    </View>
    </Modal>
 
  );
};

export default Network;

const styles = StyleSheet.create({
  networkContainer: {
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
