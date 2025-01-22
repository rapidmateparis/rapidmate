import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import {colors} from '../../colors';
import {FlatList} from 'react-native-gesture-handler';
import {
  getConsumerAddressBookList,
  getDeliveryBoyAddressBookList,
  getEnterpriseAddressBookList,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {useUserDetails} from './StoreContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { localizationText } from '../../utils/common';

function SavedAddressModal({setModalVisible, isModalVisible, selectedAddress}) {
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const [addressList, setAddressList] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getAddressBookList();
  }, []);

  const getAddressBookList = () => {
    if (userDetails.userDetails[0].role === 'CONSUMER') {
      setLoading(true);
      getConsumerAddressBookList(
        userDetails.userDetails[0].ext_id,
        successResponse => {
          console.log('successResponse', successResponse[0]._response);
          setAddressList(successResponse[0]._response);
          setLoading(false);
        },
        errorResponse => {
          console.log('errorResponse CONSUMER', errorResponse);
          setLoading(false);
        },
      );
    } else if (userDetails.userDetails[0].role === 'DELIVERY_BOY') {
      setLoading(true);
      getDeliveryBoyAddressBookList(
        userDetails.userDetails[0].ext_id,
        successResponse => {
          console.log('successResponse', successResponse[0]._response);
          setAddressList(successResponse[0]._response);
          setLoading(false);
        },
        errorResponse => {
          console.log('errorResponse', errorResponse);
          setLoading(false);
        },
      );
    } else {
      setLoading(true);
      getEnterpriseAddressBookList(
        userDetails.userDetails[0].ext_id,
        successResponse => {
          console.log('successResponse', successResponse[0]._response);
          setLoading(false);
          setAddressList(successResponse[0]._response);
        },
        errorResponse => {
          console.log('errorResponse', errorResponse);
          setLoading(false);
        },
      );
    }
  };

  const renderItem = addressItem => (
    <TouchableOpacity
      onPress={() => {
        if (addressItem) {
          selectedAddress(addressItem.item.address);
          toggleModal();
        }
      }}>
      <View style={styles.addressCard}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={styles.paymentPlateform}>
            {addressItem.item.first_name + ' ' + addressItem.item.last_name}
          </Text>
          <Text style={styles.mailId}>{addressItem.item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View />
            <Text style={styles.headerTitle}>{localizationText('Common', 'favoriteAddress')}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: 15, paddingTop: 5}}>
              <View style={styles.packageDetailCard}>
                {addressList.length == 0 ? (
                  <Text style={styles.listText}>No Record Found</Text>
                ) : (
                  <FlatList data={addressList} renderItem={renderItem} />
                )}
              </View>
            </View>
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
    marginTop: 'auto',
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffaea',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CancellationReasonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginLeft: 10,
    marginVertical: 5,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedReason: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.text,
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    width: 180,
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    textAlign: 'center',
    color: colors.white, // Ensure text is visible on button
  },
  CancellationReasonCard: {
    padding: 20,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 15,
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  mailId: {
    color: '#131314',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  packageDetailCard: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  listText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
});

export default SavedAddressModal;
