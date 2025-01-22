import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../colors';
import AddOrEditAddressModal from '../../commonComponent/AddOrEditAddressModal';
import {
  getConsumerAddressBookList,
  getDeliveryBoyAddressBookList,
  createConsumerAddressBook,
  createDeliveryBoyAddressBook,
  updateAddressBookforConsumer,
  updateAddressBookforDeliveryBoy,
  deleteAddressBookforConsumer,
  deleteAddressBookforDeliveryBoy,
  getEnterpriseAddressBookList,
  createEnterpriseAddressBook,
  updateAddressBookforEnterprise,
  deleteAddressBookforEnterprise,
} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';
import { localizationText } from '../../../utils/common';

const AddressBook = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(
    route.params.userDetails.userDetails[0],
  );
  const [consumerAddressList, setConsumerAddressList] = useState();
  const [deliveryBoyAddressList, setDeliveryBoyAddressList] = useState();
  const [enterpriseAddressList, setEnterpriseAddressList] = useState();
  const {setLoading} = useLoader();
  const [addressId, setAddressId] = useState(0);
  const [addressData, setAddressData] = useState();

  const toggleModal = (addressId, addressItem) => {
    console.log(addressId);
    setModalVisible(!modalVisible);
    setAddressId(addressId);
    setAddressData(addressItem);
  };

  useEffect(() => {
    getAddressBookList();
  }, [addressId, addressData]);

  const getAddressBookList = () => {
    if (userDetails.role === 'CONSUMER') {
      setLoading(true);
      getConsumerAddressBookList(
        userDetails.ext_id,
        successResponse => {
          console.log('successResponse CONSUMER', successResponse[0]._response);
          setConsumerAddressList(successResponse[0]._response);
          setLoading(false);
        },
        errorResponse => {
          console.log('errorResponse', errorResponse);
          setLoading(false);
        },
      );
    } else if (userDetails.role === 'DELIVERY_BOY') {
      setLoading(true);
      getDeliveryBoyAddressBookList(
        userDetails.ext_id,
        successResponse => {
          console.log('successResponse DELIVERY_BOY', successResponse[0]._response);
          setDeliveryBoyAddressList(successResponse[0]._response);
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
        userDetails.ext_id,
        successResponse => {
          console.log('successResponse getEnterpriseAddressBookList', successResponse[0]._response);
          setLoading(false);
          setEnterpriseAddressList(successResponse[0]._response);
        },
        errorResponse => {
          console.log('errorResponse', errorResponse);
          setLoading(false);
        },
      );
    }
  };

  const createAddress = probs => {
    if (addressId === 0) {
      setLoading(true);
      if (userDetails.role === 'CONSUMER') {
        let consumerParams = {
          consumer_ext_id: userDetails.ext_id,
          ...probs,
        };
        createConsumerAddressBook(
          consumerParams,
          successResponse => {
            if (successResponse[0]._success) {
              Alert.alert('Success', 'Address added successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setAddressData(null);
                    getAddressBookList();
                  },
                },
              ]);
              toggleModal(0);
              setLoading(false);
            }
          },
          errorResponse => {
            setLoading(false);
            toggleModal(0);
            console.log(errorResponse[0]);
            Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      } else if (userDetails.role === 'DELIVERY_BOY') {
        let deliveryBoyParams = {
          delivery_boy_ext_id: userDetails.ext_id,
          ...probs,
        };
        createDeliveryBoyAddressBook(
          deliveryBoyParams,
          successResponse => {
            if (successResponse[0]._success) {
              Alert.alert('Success', 'Address added successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setAddressData(null);
                    getAddressBookList();
                  },
                },
              ]);
              toggleModal(0);
              setLoading(false);
            }
          },
          errorResponse => {
            setLoading(false);
            toggleModal(0);
            Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      } else {
        let enterpriseParams = {
          enterprise_ext_id: userDetails.ext_id,
          ...probs,
        };
        createEnterpriseAddressBook(
          enterpriseParams,
          successResponse => {
            if (successResponse[0]._success) {
              Alert.alert('Success', 'Address added successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setAddressData(null);
                    getAddressBookList();
                  },
                },
              ]);
              toggleModal(0);
              setLoading(false);
            }
          },
          errorResponse => {
            setLoading(false);
            toggleModal(0);
            Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      }
    } else {
      setLoading(true);
      if (userDetails.role === 'CONSUMER') {
        let consumerParams = {
          consumer_ext_id: userDetails.ext_id,
          ...probs,
        };
        updateAddressBookforConsumer(
          consumerParams,
          successResponse => {
            if (successResponse[0]._success) {
              Alert.alert('Success', 'Address added successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setAddressData(null);
                    getAddressBookList();
                  },
                },
              ]);
              toggleModal(0);
              setLoading(false);
            }
          },
          errorResponse => {
            setLoading(false);
            toggleModal(0);
            Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      } else if (userDetails.role === 'DELIVERY_BOY') {
        let deliveryBoyParams = {
          delivery_boy_ext_id: userDetails.ext_id,
          ...probs,
        };
        updateAddressBookforDeliveryBoy(
          deliveryBoyParams,
          successResponse => {
            if (successResponse[0]._success) {
              Alert.alert('Success', 'Address added successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setAddressData(null);
                    getAddressBookList();
                  },
                },
              ]);
              toggleModal(0);
              setLoading(false);
            }
          },
          errorResponse => {
            setLoading(false);
            toggleModal(0);
            Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      } else {
        let enterpriseParams = {
          enterprise_ext_id: userDetails.ext_id,
          ...probs,
        };
        console.log(enterpriseParams);
        updateAddressBookforEnterprise(
          enterpriseParams,
          successResponse => {
            if (successResponse[0]._success) {
              Alert.alert('Success', 'Address updated successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    setAddressData(null);
                    getAddressBookList();
                  },
                },
              ]);
              toggleModal(0);
              setLoading(false);
            }
          },
          errorResponse => {
            setLoading(false);
            toggleModal(0);
            Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      }
    }
  };

  const deleteAddress = probs => {
    setLoading(true);
    if (userDetails.role === 'CONSUMER') {
      let consumerParams = {
        consumer_ext_id: userDetails.ext_id,
        ...probs,
      };
      deleteAddressBookforConsumer(
        consumerParams,
        successResponse => {
          if (successResponse[0]._success) {
            Alert.alert('Success', successResponse[0]._response, [
              {
                text: 'OK',
                onPress: () => {
                  setAddressData(null);
                  getAddressBookList();
                },
              },
            ]);
            toggleModal(0);
            setLoading(false);
          }
        },
        errorResponse => {
          setLoading(false);
          toggleModal(0);
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else if (userDetails.role === 'DELIVERY_BOY') {
      let deliveryBoyParams = {
        delivery_boy_ext_id: userDetails.ext_id,
        ...probs,
      };
      deleteAddressBookforDeliveryBoy(
        deliveryBoyParams,
        successResponse => {
          if (successResponse[0]._success) {
            Alert.alert('Success', successResponse[0]._response, [
              {
                text: 'OK',
                onPress: () => {
                  setAddressData(null);
                  getAddressBookList();
                },
              },
            ]);
            toggleModal(0);
            setLoading(false);
          }
        },
        errorResponse => {
          setLoading(false);
          toggleModal(0);
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      let enterpriseParams = {
        ...probs,
      };
      deleteAddressBookforEnterprise(
        enterpriseParams,
        successResponse => {
          if (successResponse[0]._success) {
            Alert.alert('Success', successResponse[0]._response, [
              {
                text: 'OK',
                onPress: () => {
                  setAddressData(null);
                  getAddressBookList();
                },
              },
            ]);
            toggleModal(0);
            setLoading(false);
          }
        },
        errorResponse => {
          setLoading(false);
          toggleModal(0);
          Alert.alert('Error Alert', '' + errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }
  };

  const renderItem = addressItem => (
    <View style={styles.addressCard}>
      <Ionicons name="location-outline" size={20} color="#000" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.paymentPlateform}>
          {addressItem.item.first_name + ' ' + addressItem.item.last_name}
        </Text>
        <Text style={styles.mailId}>{addressItem.item.address}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleModal(1, addressItem)}>
        <Feather style={{marginTop: 5}} name="edit-2" size={15} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          justifyContent: 'space-between',
          height: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingLeft: 10}}>
          <MaterialIcons
            name="keyboard-backspace"
            size={25}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            color: colors.black,
          }}>
         {localizationText('Common', 'addressBook')}
        </Text>
        <TouchableOpacity
          onPress={() => toggleModal(0)}
          style={{paddingRight: 10}}>
          <AntDesign name="plus" size={25} color={colors.text} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={
          (consumerAddressList && consumerAddressList) ||
          (deliveryBoyAddressList && deliveryBoyAddressList) ||
          enterpriseAddressList
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 20}}
      />
      <AddOrEditAddressModal
        modalVisible={modalVisible}
        saveAddress={createAddress}
        addressId={addressId}
        toggleModal={() => toggleModal(0)}
        addressData={addressData}
        deleteAddress={deleteAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AddressBook;
