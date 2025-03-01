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
import {colors} from '../../colors';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
  localizationText,
} from '../../utils/common';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import {
  updateUserProfile,
  updateUserProfileEnterprise,
  uploadDocumentsApi,
} from '../../data_manager';
import {API} from '../../utils/constant';

const EnterprisesTakeSelfie = ({navigation}) => {
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [photoFileName, setPhotoFileName] = useState(''); // State for filename
  const [image, setImage] = useState(null); // State for photo
  const {setLoading} = useLoader();
  const {userDetails, saveUserDetails} = useUserDetails();
  const tryAgain = localizationText('Common', 'tryAgain') || 'Try Again';
  const useThis = localizationText('Common', 'useThis') || 'Use This';

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

  const uploadImage = async () => {
    if (image != null) {
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
          let params = {
            ext_id: userDetails.userDetails[0].ext_id,
            profile_pic: JSON.parse(successResponse).id,
          };
          saveUserDetails({
            userInfo: userDetails.userInfo,
            userDetails: [
              {
                ...userDetails.userDetails[0],
                profile_pic: JSON.parse(successResponse).id,
              },
            ],
          });
          setLoading(true);
          updateUserProfileEnterprise(
            params,
            successResponseProfile => {
              console.log(
                'successResponseProfile',
                successResponseProfile,
                userDetails.userDetails.is_active,
              );
              setLoading(false);
              if (userDetails?.userDetails[0].is_active === 0) {
                navigation.navigate('EnterpriseThanksPage');
              } else {
                navigation.navigate('EnterpriseManageProfile');
              }
            },
            errorResponseProfile => {
              console.log(
                'print_data==>errorResponseProfile',
                '' + errorResponseProfile,
              );
              setLoading(false);
              Alert.alert('Error Alert', '' + JSON.stringify(errorResponse), [
                {text: 'OK', onPress: () => {}},
              ]);
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
    } else {
      Alert.alert('Error Alert', 'Please choose a picture', [
        {text: 'OK', onPress: () => {}},
      ]);
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

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FFF'}}>
      <View>
        <TouchableOpacity onPress={toggleModal} style={styles.profilePicCard}>
          {userDetails.userDetails[0].profile_pic && image == null ? (
            <Image
              style={styles.profilePic}
              source={{
                uri: API.viewImageUrl + userDetails.userDetails[0].profile_pic,
              }}
            />
          ) : (
            <Image
              style={styles.profilePic}
              source={
                image
                  ? {uri: image.data.uri}
                  : require('../../image/dummy-Selfie.jpg')
              }
            />
          )}
          <AntDesign
            style={styles.cameraIcon}
            name="camerao"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.titlesCard}>
          <Text style={styles.statusTitle}>
            {localizationText('Main', 'uploadProfilePic')}
          </Text>
          <Text style={styles.statusSubtitle}>
            {localizationText('Main', 'uploadProfilePicDescription')}
          </Text>
        </View>
        {image && (
          <View style={styles.buttonCard}>
            <TouchableOpacity onPress={toggleModal} style={styles.logbutton}>
              <Text style={styles.buttonText}>{tryAgain}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadImage} style={styles.saveBTn}>
              <Text style={styles.okButton}>{useThis}</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginVertical: 40,
  },
  statusTitle: {
    fontSize: 18,
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
    marginTop: 90,
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

export default EnterprisesTakeSelfie;
