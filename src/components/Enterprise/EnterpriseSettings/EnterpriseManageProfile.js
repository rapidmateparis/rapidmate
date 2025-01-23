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
import {updateUserProfile} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';
import { localizationText } from '../../../utils/common';

const EnterpriseManageProfile = ({navigation}) => {
  const {userDetails, saveUserDetails} = useUserDetails();
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [deliveryCount, setDeliveryCount] = useState('');

  const [userName, setUserName] = useState('');
  const [dropdownIndustryValue, setDropdownIndustryValue] = useState(null);

  const data = [{label: '+33', value: '+33'}];
  const {setLoading} = useLoader();
  const industryList = [
    {label: 'Restaurant and takeaway', value: 1},
    {label: 'Grocery and speciality', value: 2},
    {label: 'Gift delivery', value: 3},
    {label: 'Health and beauty', value: 4},
    {label: 'Tech and electronics', value: 5},
    {label: 'Retail and shopping', value: 6},
    {label: 'Professional services', value: 7},
    {label: 'Other', value: 8},
  ];

  useEffect(() => {
    console.log('userDetails.userDetails[0]', userDetails.userDetails[0]);
    setCompany(userDetails.userDetails[0].company_name);
    setNumber(userDetails.userDetails[0].phone.substring(3));
    setEmail(userDetails.userDetails[0].email);
    setUserName(
      userDetails.userDetails[0].first_name +
        ' ' +
        userDetails.userDetails[0].last_name,
    );
    setDropdownIndustryValue(userDetails.userDetails[0].industry_type_id);
    if (userDetails.userDetails[0].deliveryMonthHours) {
      setDeliveryCount(userDetails.userDetails[0].deliveryMonthHours);
    }
  }, [userDetails]);

  const updateProfile = () => {
    let usernamelist = userName.split(' ');
    let profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      company_name: company,
      // email: email,
      first_name: userName.split(' ')[0],
      phone: '+33' + number,
      industry_type_id: dropdownIndustryValue,
    };
    if (userName.split.length > 1) {
      profileParams.last_name = usernamelist[1];
    }
    if (deliveryCount) {
      profileParams.deliveryMonthHours = deliveryCount;
    }
    setLoading(true);
    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        setLoading(false);
        console.log('updateUserProfile success', '' + successResponse);
        saveUserDetails({
          userInfo: userDetails.userInfo,
          userDetails: [
            {
              ...userDetails.userDetails[0],
              company_name: profileParams.company_name,
              email: profileParams.email,
              first_name: profileParams.first_name,
              phone: profileParams.phone,
              industry_type_id: profileParams.industry_type_id,
              last_name: profileParams.last_name ? profileParams.last_name : '',
              deliveryMonthHours: profileParams.deliveryMonthHours
                ? profileParams.deliveryMonthHours
                : '',
            },
          ],
        });
      },
      errorResponse => {
        setLoading(false);
        console.log('updateUserProfile error', '' + errorResponse);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
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
          <TouchableOpacity>
            <AntDesign
              style={styles.cameraIcon}
              name="camerao"
              size={25}
              color="#fff"
              onPress={() => {
                navigation.navigate('EnterprisesTakeSelfie');
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.textlable}>{localizationText('Common', 'name')}</Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
        </View>
        <View>
          <Text style={styles.textlable}>{localizationText('Common', 'phoneNumber')}</Text>
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  itemTextStyle={styles.itemtextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  style={{color: colors.black}}
                  placeholder={!isFocus ? '+33' : '...'}
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
        {/* <View style={{flex: 1}}>
          <Text style={styles.textlable}>Email</Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View> */}
        <View style={{flex: 1}}>
          <Text style={styles.textlable}>{localizationText('Common', 'companyName')}</Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={company}
            onChangeText={text => setCompany(text)}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.textlable}>{localizationText('Common', 'industry')}</Text>
          <View style={styles.containerCountry}>
            <Dropdown
              data={industryList}
              maxHeight={500}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search.."
              value={dropdownIndustryValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownIndustryValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={{marginRight: 10}}
                  name="API"
                  size={18}
                  color={colors.text}
                />
              )}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.textlable}>
          {localizationText('Common', 'deliveriesPerMonth')}
          </Text>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Type here"
            placeholderTextColor={'#999'}
            value={deliveryCount}
            onChangeText={text => setDeliveryCount(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            updateProfile();
          }}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>{localizationText('Common', 'save')}</Text>
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
  containerCountry: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default EnterpriseManageProfile;
