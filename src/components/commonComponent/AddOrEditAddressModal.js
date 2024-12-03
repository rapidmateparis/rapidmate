import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {Dropdown} from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

function AddOrEditAddressModal({
  modalVisible,
  saveAddress,
  addressId,
  toggleModal,
  addressData,
  deleteAddress,
}) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [number, setNumber] = useState();
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [isFocus, setIsFocus] = useState(false);
  const [id, setID] = useState();

  useEffect(() => {
    setName(addressData?.item.first_name);
    setAddress(addressData?.item.address);
    setLastname(addressData?.item.last_name);
    setCompany(addressData?.item.company_name);
    setEmail(addressData?.item.email);
    setComments(addressData?.item.comments);
    setNumber(addressData?.item.phone);
    setID(addressData?.item.id);
  }, [addressData]);

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  const clearAddressData = () => {
    setName('');
    setAddress('');
    setLastname('');
    setCompany('');
    setEmail('');
    setComments('');
    setNumber('');
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={modalVisible}>
        <ScrollView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>
              {addressId == 0 ? 'Add new address' : 'Edit address'}
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.logFormView}>
            <View>
              <Text style={styles.textlable}>Address</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.textlable}>First name*</Text>
                <TextInput
                  style={styles.inputTextStyle}
                  placeholderTextColor="#999"
                  placeholder="Type here"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>

              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={styles.textlable}>Last name</Text>
                <TextInput
                  style={styles.inputTextStyle}
                  placeholderTextColor="#999"
                  placeholder="Type here"
                  value={lastname}
                  onChangeText={text => setLastname(text)}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textlable}>Company</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={company}
                onChangeText={text => setCompany(text)}
              />
            </View>
            <View>
              <Text style={styles.textlable}>Phone number</Text>
              <View style={styles.mobileNumberInput}>
                <View style={{width: 95}}>
                  <View style={styles.containerDropdown}>
                    <Dropdown
                      data={data}
                      search
                      maxHeight={300}
                      itemTextStyle={styles.itemtextStyle}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? '+33' : '...'}
                      searchPlaceholder="+.."
                      value={dropdownValue}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDropdownValue(item.value);
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <Image
                          style={{marginRight: 10}}
                          source={require('../../image/flagIcon.png')}
                        />
                      )}
                    />
                  </View>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    {fontFamily: 'Montserrat-Regular', fontSize: 16},
                  ]}
                  placeholder="00 00 00 00 00)"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={11}
                  value={number}
                  onChangeText={text => setNumber(text)}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textlable}>Email</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View>
              <Text style={styles.textlable}>Comments</Text>
              <TextInput
                style={styles.inputTextStyle}
                multiline={true}
                placeholderTextColor="#999"
                numberOfLines={4} 
                placeholder="Type here"
                textAlignVertical="top"
                value={comments}
                onChangeText={text => setComments(text)}
              />
            </View>
          </View>
          <View style={styles.buttonCard}>
            {addressId == 1 && (
              <TouchableOpacity
                onPress={() => {
                  deleteAddress({
                    first_name: name,
                    last_name: lastname,
                    address: address,
                    email: email,
                    phone: number,
                    company_name: company,
                    comments: comments,
                    id: id,
                  });
                  clearAddressData();
                }}
                style={styles.logbutton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.saveBTn}
              onPress={() => {
                saveAddress({
                  first_name: name,
                  last_name: lastname,
                  address: address,
                  email: email,
                  phone: number,
                  company_name: company,
                  comments: comments,
                  id: id,
                });
                clearAddressData();
              }}>
              <Text style={styles.okButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fffaea',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginRight: '30%',
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 30,
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
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: colors.text,
  },
  saveBTn: {
    width: '45%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.primary,
  },
  CancellationReasonCard: {
    padding: 20,
  },
  logInText: {
    fontSize: 21,
    fontFamily: 'Montserrat-Bold',
  },
  loginAccessText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    width: '95%',
    marginTop: 5,
  },
  logFormView: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  textInputDiv: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
  mobileNumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  logbutton: {
    width: '45%',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BA1A1A',
  },
  buttonText: {
    fontSize: 14,
    color: '#BA1A1A',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  signUpContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.text,
  },
  accountType: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 15,
    color: colors.text,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  accountTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    marginLeft: 5,
  },
  checkIcon: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    padding: 2,
    borderRadius: 15,
  },
  containerCountry: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textlable: {
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 7,
    marginTop: 7,
    fontSize: 12,
    color: colors.text,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: colors.text,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  dottedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderWidth: 1,
    borderRadius: 5, // Controls dot size
    borderColor: '#ccc', // Color of the dots
    borderStyle: 'dashed',
    width: '100%', // Full width of the border
  },
  placeholderStyle: {
    color: '#999',
    fontSize: 12,
  },
  selectedTextStyle: {
    color: '#999',
    fontSize: 12,
  },
  inputSearchStyle: {
    color: '#999',
    fontSize: 12,
  },
  itemtextStyle: {
    color: colors.text,
    fontSize: 12,
  },
});

export default AddOrEditAddressModal;
