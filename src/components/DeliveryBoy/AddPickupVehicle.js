import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
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
import {useLoader} from '../../utils/loaderContext';
import {addVehicleApi, uploadDocumentsApi} from '../../data_manager';

const AddPickupVehicle = ({route, navigation}) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleVariant, setVehicleVariant] = useState('');
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageFileVehicleReg, setImageFileNameVehicleReg] = useState(null);
  const [imageFileDrivingLicense, setImageFileDrivingLicense] = useState(null);
  const [imageFileVehicleInsurance, setImageFileVehicleInsurance] = useState(null);
  const [imageFilePassport, setImageFilePassport] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState();
  const {setLoading} = useLoader();
  const [errors, setErrors] = useState({});

  const toggleModal = item => {
    setImageFileUrl(item);
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
        if (imageFileUrl === 'VehicleRegistration') {
          setImageFileNameVehicleReg(cameraData.data);
        } else if (imageFileUrl === 'DrivingLicense') {
          setImageFileDrivingLicense(cameraData.data);
        } else if (imageFileUrl === 'VehicleInsurance') {
          setImageFileVehicleInsurance(cameraData.data);
        } else if (imageFileUrl === 'Passport') {
          setImageFilePassport(cameraData.data);
        }
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
        if (imageFileUrl === 'VehicleRegistration') {
          setImageFileNameVehicleReg(imageData.data);
        } else if (imageFileUrl === 'DrivingLicense') {
          setImageFileDrivingLicense(imageData.data);
        } else if (imageFileUrl === 'VehicleInsurance') {
          setImageFileVehicleInsurance(imageData.data);
        } else if (imageFileUrl === 'Passport') {
          setImageFilePassport(imageData.data);
        }
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const getFileName = uri => {
    if (!uri) return '';
    const startIndex = uri.lastIndexOf('/') + 1;
    let fileName = uri.substr(startIndex);
    // Get last 20 characters or the whole string if shorter
    fileName = fileName.substr(-30);
    return fileName.length > 30 ? '...' + fileName : fileName;
  };

  const validateForm = () => {
    let errors = {};
    if (!vehicleNo.trim()) {
      errors.vehicleNo = 'Vehicle number is required';
    }
    if (!vehicleModel.trim()) {
      errors.vehicleModel = 'Vehicle model is required';
    }
    if (!vehicleMake.trim()) {
      errors.vehicleMake = 'Vehicle make is required';
    }
    if (!vehicleVariant.trim()) {
      errors.vehicleVariant = 'Vehicle Variant is required';
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      let params = {
        delivery_boy_ext_id: route.params.delivery_boy_details.extId,
        vehicle_type_id: route.params.selectedVehicle.vehicle_id,
        plat_no: vehicleNo,
        modal: vehicleModel,
        make: vehicleMake,
        variant: vehicleVariant,
        reg_doc: '1',
        driving_license: '1',
        insurance: '1',
        passport: '1',
      };
      setLoading(true);
      addVehicleApi(
        params,
        successResponse => {
          console.log('successResponse', successResponse);
          setLoading(false);
          if (successResponse[0]._success) {
            if (successResponse[0]._response) {
              console.log("print_data==>addVehicle", successResponse[0])
              if (
                successResponse[0]._response.name == 'NotAuthorizedException'
              ) {
                Alert.alert('Error Alert', successResponse[0]._response.name, [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else if (successResponse[0]._httpsStatusCode == 200) {
                navigation.navigate('DeliveryboyThanksPage');
              }
            }
          }
        },
        errorResponse => {
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }
  };

  const uploadAllImages = async () => {
    var photos = []
    var photo = {};
    if (imageFileVehicleReg) {
      photo = {
        uri: imageFileVehicleReg.uri,
        type: imageFileVehicleReg.type,
        name: imageFileVehicleReg.fileName,
      };
      photos.push(photo)
    } 
    if (imageFileDrivingLicense) {
      photo = {
        uri: imageFileDrivingLicense.uri,
        type: imageFileDrivingLicense.type,
        name: imageFileDrivingLicense.fileName,
      };
      photos.push(photo)
    }
    if (imageFileVehicleInsurance) {
      photo = {
        uri: imageFileVehicleInsurance.uri,
        type: imageFileVehicleInsurance.type,
        name: imageFileVehicleInsurance.fileName,
      };
      photos.push(photo)
    }
    if (imageFilePassport) {
      photo = {
        uri: imageFilePassport.uri,
        type: imageFilePassport.type,
        name: imageFilePassport.fileName,
      };
      photos.push(photo)
    }
    uploadImage(photos,0)
  }

  const uploadImage = async (photos, index) => {
    if (photos.length == 0) {
      return
    }
    const formdata = new FormData();
    formdata.append('file', photos[index]);
    setLoading(true);
    uploadDocumentsApi(
      formdata,
      successResponse => {
        setLoading(false);
        console.log(
          'print_data==>successResponseuploadDocumentsApi',
          '' + successResponse,
        );
        if (photos.length > index + 1) {
          uploadImage(photos, index + 1)
        }
      },
      errorResponse => {
        console.log(
          'print_data==>errorResponseuploadDocumentsApi',
          '' + errorResponse,
        );
        setLoading(false);
        Alert.alert('Error Alert', '' + JSON.stringify(errorResponse), [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
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
            {errors.vehicleNo ? (
              <Text style={[{color: 'red'}]}>{errors.vehicleNo}</Text>
            ) : null}
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              placeholderTextColor={'#999'}
              value={vehicleNo}
              onChangeText={text => setVehicleNo(text)}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle Model</Text>
            {errors.vehicleModel ? (
              <Text style={[{color: 'red'}]}>{errors.vehicleModel}</Text>
            ) : null}
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              placeholderTextColor={'#999'}
              value={vehicleModel}
              onChangeText={text => setVehicleModel(text)}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={styles.textlable}>Vehicle make</Text>
              {errors.vehicleMake ? (
                <Text style={[{color: 'red'}]}>{errors.vehicleMake}</Text>
              ) : null}
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Type here"
                placeholderTextColor={'#999'}
                value={vehicleMake}
                onChangeText={text => setVehicleMake(text)}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.textlable}>Vehicle variant</Text>
              {errors.vehicleVariant ? (
                <Text style={[{color: 'red'}]}>{errors.vehicleVariant}</Text>
              ) : null}
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Type here"
                placeholderTextColor={'#999'}
                value={vehicleVariant}
                onChangeText={text => setVehicleVariant(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.uploadDoc}>Upload documents</Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleModal('VehicleRegistration')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle registration document</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>Tap to upload</Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFileVehicleReg
                    ? getFileName(imageFileVehicleReg.uri)
                    : `image.jpeg`}
                </Text>
                <MaterialCommunityIcons onPress={()=>{
                  setImageFileNameVehicleReg(null)
                }} name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleModal('DrivingLicense')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>Driving license</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>Tap to upload</Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFileDrivingLicense
                    ? getFileName(imageFileDrivingLicense.uri)
                    : `image.jpeg`}
                </Text>
                <MaterialCommunityIcons onPress={()=>{
                  setImageFileDrivingLicense(null)
                }} name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleModal('VehicleInsurance')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>Vehicle insurance</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>Tap to upload</Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFileVehicleInsurance
                    ? getFileName(imageFileVehicleInsurance.uri)
                    : `image.jpeg`}
                </Text>
                <MaterialCommunityIcons onPress={()=>{
                  setImageFileVehicleInsurance(null)
                }} name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleModal('Passport')}
            style={{flex: 1}}>
            <Text style={styles.textlable}>Passport</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={15}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.tapUploadDoc}>Tap to upload</Text>
              <View style={styles.docPathCard}>
                <Text style={styles.docPath}>
                  {imageFilePassport
                    ? getFileName(imageFilePassport.uri)
                    : `image.jpeg`}
                </Text>
                <MaterialCommunityIcons onPress={()=>{
                  setImageFilePassport(null)
                }} name="close" color="#000" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
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
    fontSize: 14,
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
    fontSize: 12,
    padding: 10,
    color: colors.text,
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
  tapUploadDoc: {
    color: '#999',
    marginLeft: 5,
    paddingTop: 10,
    flex: 1,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  docPath: {
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    borderRightWidth: 1,
    paddingRight: 5,
    fontSize: 12,
    borderColor: '#2C30331A',
  },
  docPathCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC72B26',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 8,
  },
});

export default AddPickupVehicle;
