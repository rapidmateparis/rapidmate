import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import ChoosePhotoByCameraGallaryModal from '../../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
} from '../../../utils/common';
import {useLoader} from '../../../utils/loaderContext';
import {uploadDocumentsApi, updateUserProfile} from '../../../data_manager';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {API} from '../../../utils/constant';

const DeliveryboyTakeSelfie = ({route, navigation}) => {
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [photoFileName, setPhotoFileName] = useState(''); // State for filename
  const [image, setImage] = useState(null); // State for photo
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();

  const toggleModal = () => {
    setModalVisibleCamera(!isModalVisibleCamera);
  };

  const handlePhotoOpenClose = visible => {
    setModalVisibleCamera(!visible);
  };

  const handleCameraLaunch = async () => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let cameraData = await handleCameraLaunchFunction();
      if (cameraData.status == 'success') {
        setPhotoFileName(getFileName(cameraData.data.uri));
        setImage(cameraData);
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
        setPhotoFileName(getFileName(imageData.data.uri));
        setImage(imageData);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const getFileName = uri => {
    // Function to extract file name from URI
    if (uri) {
      const path = uri.split('/');
      return path[path.length - 1];
    }
    return '';
  };

  const uploadImage = async () => {
    var photo = {
      uri: image.data.uri,
      type: image.data.type,
      name: image.data.fileName,
    };
    const formdata = new FormData();
    formdata.append('file', photo);
    setLoading(true);
    uploadDocumentsApi(
      formdata,
      successResponse => {
        setLoading(false);
        console.log(
          'print_data==>successResponseuploadDocumentsApi',
          '' + JSON.parse(successResponse).id,
        );
        let profileParams = {
          ext_id: userDetails.userDetails[0].ext_id,
          profile_pic: JSON.parse(successResponse).id,
          work_type_id: 1,
        };
        updateUserProfile(
          userDetails.userDetails[0].role,
          profileParams,
          successResponse => {
            console.log('updateUserProfile', successResponse);
            if (route.params) {
              navigation.navigate('AddVehicle', {
                delivery_boy_details: route.params.delivery_boy_details,
              });
            } else {
              Alert.alert('Success', '' + successResponse[0]._response, [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]);
            }
          },
          errorResponse => {
            console.log('updateUserProfile', errorResponse);
          },
        );
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
    <ScrollView style={{width: '100%', backgroundColor: '#FFF'}}>
      <View>
        <TouchableOpacity onPress={toggleModal} style={styles.profilePicCard}>
          <Image
            style={styles.profilePic}
            source={
              image
                ? {uri: image.data.uri}
                : require('../../../image/dummy-Selfie.jpg')
            }
          />
          <AntDesign
            style={styles.cameraIcon}
            name="camerao"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.titlesCard}>
          <Text style={styles.statusTitle}>
            Please upload a Profile Picture
          </Text>
          <Text style={styles.statusSubtitle}>
            Please see if this looks good, you can try once more if you want to.
          </Text>
        </View>

        <View style={styles.buttonCard}>
          <TouchableOpacity onPress={toggleModal} style={styles.logbutton}>
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadImage} style={styles.saveBTn}>
            <Text style={styles.okButton}>Use this</Text>
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
      {/* -------------- Modal --------------------- */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 300,
    height: 300,
    borderRadius: 200,
  },
  profilePicCard: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  statusTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    textAlign: 'center',
  },
  titlesCard: {
    paddingHorizontal: '10%',
  },
  buttonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
    marginTop: '30%',
  },
  logbutton: {
    width: '45%',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.text,
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
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
    padding: 15,
    backgroundColor: colors.primary,
  },
  cameraIcon: {
    position: 'absolute',
    top: '88%',
    left: '60%',
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: colors.primary,
    paddingTop: 6,
    paddingLeft: 8,
  },
});

export default DeliveryboyTakeSelfie;
