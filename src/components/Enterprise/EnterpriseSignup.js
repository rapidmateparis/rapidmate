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
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import CheckBox from '@react-native-community/checkbox';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
} from '../../utils/common';
import Restaurant from '../../image/Restaurant-Icon.png';
import Grocery from '../../image/Grocery-Icon.png';
import Gift from '../../image/Gift-Icon.png';
import Health from '../../image/Health-Icon.png';
import Tech from '../../image/Tech-Icon.png';
import Shopping from '../../image/Shopping-Icon.png';
import Professional from '../../image/Professional-Icon.png';
import Other from '../../image/Other-Icon.png';
// import DropDownDropdown from '../common component/dropdown';

const EnterpriseSignup = ({navigation}) => {
  const [toggleCheckBoxFirst, setToggleCheckBoxFirst] = useState(false);
  const [toggleCheckBoxSecond, setToggleCheckBoxSecond] = useState(false);
  const [name, setName] = useState(false);
  const [lastname, setLastname] = useState(false);
  const [email, setEmail] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [number, setNumber] = useState('');
  const [siret, setSiret] = useState('');
  const [comments, setComments] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [dropdownIndustryValue, setDropdownIndustryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showIndustryOptions, setShowIndustryOptions] = useState(false);

  const togglePasswordVisibility = field => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const toggleIndustrySelection = index => {
    if (selectedIndustry === index) {
      setSelectedIndustry(null); // Deselect if already selected
    } else {
      setSelectedIndustry(index); // Select the industry
    }
  };

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  const industryData = [
    {
      name: 'Restaurant and takeaway',
      image: Restaurant,
      style: styles.restaurantImage,
    },
    {
      name: 'Grocery and speciality',
      image: Grocery,
      style: styles.GroceryImage,
    },
    {
      name: 'Gift delivery',
      image: Gift,
      style: styles.GiftImage,
    },
    {
      name: 'Health and beauty',
      image: Health,
      style: styles.HealthImage,
    },
    {
      name: 'Tech and electronics',
      image: Tech,
      style: styles.TechImage,
    },
    {
      name: 'Retail and shopping',
      image: Shopping,
      style: styles.ShoppingImage,
    },
    {
      name: 'Professional services',
      image: Professional,
      style: styles.ProfessionalImage,
    },
    {
      name: 'Other',
      image: Other,
      style: styles.OtherImage,
    },
  ];

  const toggleIndustryOptions = () => {
    setShowIndustryOptions(!showIndustryOptions);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '85%'}}>
            <Text style={[styles.logInText, {color: colors.text}]}>
              Enterprise{' '}
              <Text style={{fontFamily: 'Montserrat-Medium'}}>signup</Text>
            </Text>
            <Text style={styles.loginAccessText}>
              Let’s create your profile so you can request continuous scheduled
              deliveries
            </Text>
          </View>
          <Image
            style={{width: 45, height: 45}}
            source={require('../../image/home.png')}
          />
        </View>
        <View style={styles.logFormView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.nameInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={styles.loginput}
                placeholder="First Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <View style={styles.nameInputDiv}>
              <AntDesign name="user" size={18} color="#131314" />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="Last Name"
                placeholderTextColor="#999"
                value={lastname}
                onChangeText={text => setLastname(text)}
              />
            </View>
          </View>
          <View style={styles.textInputDiv}>
            <AntDesign name="mail" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('password')}>
              <Feather
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={18} color="#131314" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity
              onPress={() => togglePasswordVisibility('confirmPassword')}>
              <Feather
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={15}
                color="#131314"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
                  search
                  maxHeight={300}
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
              style={styles.input}
              placeholder="00 00 00 00 00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={11}
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </View>
          <View style={styles.textInputDiv}>
            <FontAwesome6 name="warehouse" size={15} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Company name"
              placeholderTextColor="#999"
              value={companyName}
              onChangeText={text => setCompanyName(text)}
            />
          </View>
          <View style={styles.industryMainCard}>
            <TouchableOpacity
              style={styles.selectIndustryCard}
              onPress={toggleIndustryOptions}>
              <Image
                style={styles.industryLeftIcons}
                source={require('../../image/bulding.png')}
              />
              <Text style={styles.industryText}>Select industry</Text>
              <AntDesign
                name={showIndustryOptions ? 'up' : 'down'}
                size={12}
                color={colors.text}
              />
            </TouchableOpacity>

            {showIndustryOptions && (
              <View>
                {industryData.map((industry, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.typesIndustryCard}
                    onPress={() => toggleIndustrySelection(index)}>
                    <Image
                      style={[styles.industryLeftIcons, industry.style]}
                      source={industry.image}
                    />
                    <Text style={styles.industryText}>{industry.name}</Text>

                    <View style={styles.industrySelectCircle}>
                      {selectedIndustry === index && (
                        <Entypo name="check" size={17} color={colors.primary} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.textInputDiv}>
            <MaterialCommunityIcons name="package" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Deliveries per month / Hours per month"
              placeholderTextColor="#999"
              value={companyName}
              onChangeText={text => setCompanyName(text)}
            />
          </View>
          <View style={styles.containerCountry}>
            <Dropdown
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Country' : '...'}
              searchPlaceholder="Search.."
              value={dropdownCountryValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownCountryValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <FontAwesome6
                  style={{marginRight: 10}}
                  name="globe"
                  size={18}
                  color={colors.text}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.containerCity}>
              <Dropdown
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Ain' : '...'}
                searchPlaceholder="Search.."
                value={dropdownCountryValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDropdownCountryValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <FontAwesome6
                    style={{marginRight: 10}}
                    name="globe"
                    size={18}
                    color={colors.text}
                  />
                )}
              />
            </View>

            <View style={styles.containerCity}>
              <Dropdown
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'ambérieu-e...' : '...'}
                searchPlaceholder="Search.."
                value={dropdownCountryValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDropdownCountryValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <FontAwesome6
                    style={{marginRight: 10}}
                    name="globe"
                    size={18}
                    color={colors.text}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.textInputDiv}>
            <Ionicons name="location-outline" size={18} color="#131314" />
            <TextInput
              style={styles.loginput}
              placeholder="Siret"
              placeholderTextColor="#999"
              value={siret}
              onChangeText={text => setSiret(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.inputTextStyle}
              multiline={true}
              numberOfLines={4} // Set the number of lines you want to display initially
              placeholder="Describe your projects here"
              placeholderTextColor="#999"
              textAlignVertical="top"
              value={comments}
              onChangeText={text => setComments(text)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBoxFirst}
              onValueChange={newValue => setToggleCheckBoxFirst(newValue)}
              style={{alignSelf: 'flex-start'}}
              tintColors={{true: '#FFC72B', false: '#000000'}}
            />
            <Text style={styles.checkboxText}>
              By checking this box, I authorise Rapidmate to use my information
              to send me communications regarding Rapidmate products and events.
              You can opt out of any marketing communications or customise your
              preferences at any time.
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBoxSecond}
              onValueChange={newValue => setToggleCheckBoxSecond(newValue)}
              style={{alignSelf: 'flex-start'}}
              tintColors={{true: '#FFC72B', false: '#000000'}}
            />
            <View>
              <TouchableOpacity>
                <Text style={styles.checkboxText}>
                  By clicking on this box, you acknowledge that you have read
                  and understood the
                  <Text style={styles.pirvacyTextBold}> Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterprisesTakeSelfie')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have an account?{' '}
              <Text style={{color: colors.primary}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logInText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  loginAccessText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    width: '95%',
    marginTop: 5,
  },
  logFormView: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  textInputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 12,
    paddingHorizontal: 10,
    width: '90%',
    fontFamily: 'Montserrat-Regular',
  },
  mobileNumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
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
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
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
    fontSize: 12,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular', 
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
    paddingHorizontal: 10,
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
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  nameInputDiv: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  containerCity: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginLeft: 5,
  },
  pirvacyTextBold: {
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 25,
    paddingRight: 20,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: colors.text,
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  industryMainCard: {
    borderWidth: 1,
    borderColor: '#2C303336',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 8,
    marginBottom: 20,
  },
  selectIndustryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  industryLeftIcons: {
    marginRight: 10,
  },
  industryText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    flex: 1,
  },
  typesIndustryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  industrySelectCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 50,
  },
  restaurantImage: {
    width: 14,
    height: 16,
  },
  GroceryImage: {
    width: 13.5,
    height: 15,
  },
  GiftImage: {
    width: 14,
    height: 16,
  },
  HealthImage: {
    width: 14,
    height: 14,
  },
  TechImage: {
    width: 13,
    height: 18,
  },
  ShoppingImage: {
    width: 15,
    height: 15,
  },
  ProfessionalImage: {
    width: 14.8,
    height: 14.8,
  },
  OtherImage: {
    width: 14.8,
    height: 14.8,
  },
});

export default EnterpriseSignup;
