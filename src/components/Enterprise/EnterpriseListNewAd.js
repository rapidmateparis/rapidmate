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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';

const EnterpriseListNewAd = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [promoEmails, setPromoEmails] = useState(false);

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <TouchableOpacity style={styles.uploadIconCard}>
            <Image source={require('../../image/upload-image-icon.png')} />
            <Text style={styles.uploadTextUpper}>Upload icon</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.uploadLargePhoto}>
            <Image source={require('../../image/upload-image-icon.png')} />
            <View>
              <Text style={styles.largePhotoText}>Upload large photo</Text>
              <Text style={styles.uploadSubtitle}>
                Upload a photo which will be shown when user clicks your ads
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.textInputDiv}>
          <Text style={styles.formTitle}>Title</Text>
          <TextInput
            style={styles.loginput}
            placeholder="Type here.."
            placeholderTextColor="#999"
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>

        <View style={styles.textInputDiv}>
          <Text style={styles.formTitle}>Description</Text>
          <TextInput
            style={styles.inputTextStyle}
            multiline={true}
            numberOfLines={4} // Set the number of lines you want to display initially
            placeholder="Type here.."
            placeholderTextColor="#999"
            textAlignVertical="top"
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <View style={styles.textInputDiv}>
          <Text style={styles.formTitle}>URL</Text>
          <TextInput
            style={styles.loginput}
            placeholder="Type here.."
            placeholderTextColor="#999"
            value={url}
            onChangeText={text => setUrl(text)}
          />
        </View>

        <View>
          <View style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Make it active now</Text>
            <TouchableOpacity onPress={togglePromoEmails}>
              <MaterialCommunityIcons
                name={promoEmails ? 'toggle-switch' : 'toggle-switch-off'}
                size={55}
                color={promoEmails ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonCard}>
        <TouchableOpacity style={styles.logbutton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DeliveryboyScheduledDeliveryAlert')
          }
          style={styles.saveBTn}>
          <Text style={styles.okButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImg: {
    width: 78,
    height: 78,
    borderRadius: 40,
  },
  username: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  goprofile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageProfile: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  bookAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressCard: {
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
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  titleStatus: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
    paddingHorizontal: 10,
  },
  uploadIconCard: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#371B344D',
    borderStyle: 'dashed',
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadTextUpper: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  uploadLargePhoto: {
    borderWidth: 1,
    borderColor: '#371B344D',
    borderStyle: 'dashed',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  largePhotoText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.subText,
    textAlign: 'center',
    marginVertical: 10,
  },
  uploadSubtitle: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    paddingHorizontal: 80,
    textAlign: 'center',
  },
  textInputDiv: {
    marginTop: 10,
  },
  loginput: {
    fontSize: 12,
    width: '100%',
    fontFamily: 'Montserrat-Regular',
    borderRadius: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  formTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginBottom: 5,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: colors.text,
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  buttonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 1,
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
});

export default EnterpriseListNewAd;
