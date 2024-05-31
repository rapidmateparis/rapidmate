import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';

function DeliveryboyPackagePreviewModal({setImageModalVisible, isImageModalVisible}) {
  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isImageModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>View photo</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../image/PackagePhoto.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    height: '90%',
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#a57046',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginRight: '30%',
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default DeliveryboyPackagePreviewModal;
