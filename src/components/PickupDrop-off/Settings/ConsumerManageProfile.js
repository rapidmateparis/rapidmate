import React, {useState, useEffect} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {API} from '../../../utils/constant';
import {Dropdown} from 'react-native-element-dropdown';
import {useLoader} from '../../../utils/loaderContext';
import {updateUserProfile} from '../../../data_manager';

const ConsumerManageProfile = ({navigation}) => {
  const {userDetails, saveUserDetails} = useUserDetails();
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [number, setNumber] = useState(
    userDetails?.userDetails[0]?.phone || '',
  );
  const [email, setEmail] = useState(userDetails?.userDetails[0]?.email || '');
  const {setLoading} = useLoader();

  const fullName = `${userDetails.userDetails[0].first_name} ${userDetails.userDetails[0].last_name}`;

  const [vehicleModel, setVehicleModel] = useState(fullName);

  useEffect(() => {
    setVehicleModel(fullName);
  }, [userDetails]);

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];
  const saveProfileDetails = () => {
    setLoading(true);
    let profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      first_name: vehicleModel,
      last_name: '',
      phone: dropdownValue + number,
      email: email,
    };
    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        setLoading(false);
        const newUserDetails = userDetails.userDetails[0];
        newUserDetails['email'] = email;
        newUserDetails['first_name'] = vehicleModel;
        newUserDetails['phone'] = number;
        saveUserDetails({...userDetails, userDetails: [newUserDetails]});
        console.log('updateUserProfile response ', successResponse);
        Alert.alert('Success', 'Profile updates Successfully', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      },
      errorResponse => {
        setLoading(false);
        console.log('updateUserProfile', errorResponse);
      },
    );
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FFF'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.ConsumerProfileCard}>
          {userDetails.userDetails[0].profile_pic ? (
            <Image
              style={styles.profileImg}
              source={{
                uri: API.viewImageUrl + userDetails.userDetails[0].profile_pic,
              }}
            />
          ) : (
            <Image
              style={styles.profileImg}
              source={require('../../../image/settings-profile.jpeg')}
            />
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('PickupTakeSelfie')}>
            <AntDesign
              style={styles.cameraIcon}
              name="camerao"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.textlable}>Name</Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={vehicleModel}
            onChangeText={text => setVehicleModel(text)}
          />
        </View>
        <View>
          <Text style={styles.textlable}>Phone Number</Text>
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  itemTextStyle={styles.itemtextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  style={{color: colors.black}}
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
                      source={require('../../../image/flagIcon.png')}
                    />
                  )}
                />
              </View>
            </View>
            <TextInput
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: colors.text,
              }}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={11}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.textlable}>Email</Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => saveProfileDetails()}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ConsumerProfileCard: {
    position: 'relative',
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  cameraIcon: {
    position: 'absolute',
    top: -25,
    left: 10,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: colors.primary,
    paddingTop: 5,
    paddingLeft: 5,
  },
  textlable: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
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
    marginBottom: 15,
  },
  mobileNumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
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
  logbutton: {
    width: '100%',
    marginVertical: 20,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: 'Montserrat-Medium',
  },
});

export default ConsumerManageProfile;
