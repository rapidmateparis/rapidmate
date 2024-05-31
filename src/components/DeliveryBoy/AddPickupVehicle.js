import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
} from '../../utils/common';

const AddPickupVehicle = ({navigation}) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleVariant, setVehicleVariant] = useState('');
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisibleCamera(!isModalVisibleCamera);
  };
  const handlePhotoOpenClose = visible => {
    setModalVisibleCamera(!visible);
  };

  const handleCameraLaunch = async item => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let cameraData = await handleCameraLaunchFunction();
      if (cameraData.status == 'success') {
        // console.log("dataImage++++",imageData.data)
        console.log('dataImage++++', imageData.fileName);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const handleImageLibraryLaunch = async () => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let imageData = await handleImageLibraryLaunchFunction();
      if (imageData.status == 'success') {
        // console.log("dataImage++++",imageData.data)
        console.log('dataImage++++', imageData.fileName);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fbfaf5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.headerMiniTruck}>
          <Image source={require('../../image/Mini-Truck1x.png')} />
        </View>
        <View style={styles.logFormView}>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle No.</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              value={vehicleNo}
              onChangeText={text => setVehicleNo(text)}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle Model</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              value={vehicleModel}
              onChangeText={text => setVehicleModel(text)}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={styles.textlable}>Vehicle make</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Type here"
                value={vehicleMake}
                onChangeText={text => setVehicleMake(text)}
              />
            </View>

            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.textlable}>Vehicle variant</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Type here"
                value={vehicleVariant}
                onChangeText={text => setVehicleVariant(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.uploadDoc}>Upload documents</Text>
          </View>
          <TouchableOpacity onPress={toggleModal} style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle registration document</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={22}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text
                style={{color: '#999', marginLeft: 5, paddingTop: 10, flex: 1}}>
                Tap to upload
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFC72B26',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Montserrat-Regular',
                    borderRightWidth: 1,
                    paddingRight: 5,
                    borderColor: '#2C30331A',
                  }}>
                  image.jpeg
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={{flex: 1}}>
            <Text style={styles.textlable}>Driving license</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={22}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text
                style={{color: '#999', marginLeft: 5, paddingTop: 10, flex: 1}}>
                Tap to upload
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFC72B26',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Montserrat-Regular',
                    borderRightWidth: 1,
                    paddingRight: 5,
                    borderColor: '#2C30331A',
                  }}>
                  image.jpeg
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle insurance</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={22}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text
                style={{color: '#999', marginLeft: 5, paddingTop: 10, flex: 1}}>
                Tap to upload
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFC72B26',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Montserrat-Regular',
                    borderRightWidth: 1,
                    paddingRight: 5,
                    borderColor: '#2C30331A',
                  }}>
                  image.jpeg
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={{flex: 1}}>
            <Text style={styles.textlable}>Passport</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={22}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text
                style={{color: '#999', marginLeft: 5, paddingTop: 10, flex: 1}}>
                Tap to upload
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFC72B26',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Montserrat-Regular',
                    borderRightWidth: 1,
                    paddingRight: 5,
                    borderColor: '#2C30331A',
                  }}>
                  image.jpeg
                </Text>
                <MaterialCommunityIcons name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PickupOrderPreview')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* -------------- Modal --------------------- */}
      <ChoosePhotoByCameraGallaryModal
        visible={isModalVisibleCamera}
        handlePhotoOpenClose={handlePhotoOpenClose}
        handleCameraLaunch={handleCameraLaunch}
        handleImageLibraryLaunch={handleImageLibraryLaunch}
      />
      {/* -------------- Modal --------------------- */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 10,
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
    width: '100%',
    marginVertical: 30,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
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
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
    marginTop: 15,
    fontSize: 12,
    color: colors.text,
  },
  inputTextStyle: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  dottedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 5, // Controls dot size
    borderColor: '#ccc', // Color of the dots
    borderStyle: 'dashed',
    width: '100%', // Full width of the border
  },
  headerMiniTruck: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  uploadDoc: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginTop: 15,
  },
});

export default AddPickupVehicle;
