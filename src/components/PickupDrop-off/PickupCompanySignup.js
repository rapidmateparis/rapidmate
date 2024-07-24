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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../colors';
import Restaurant from '../../image/Restaurant-Icon.png';
import Grocery from '../../image/Grocery-Icon.png';
import Gift from '../../image/Gift-Icon.png';
import Health from '../../image/Health-Icon.png';
import Tech from '../../image/Tech-Icon.png';
import Shopping from '../../image/Shopping-Icon.png';
import Professional from '../../image/Professional-Icon.png';
import Other from '../../image/Other-Icon.png';

const PickupCompanySignup = ({navigation}) => {
  const [company, setCompany] = useState('');
  const [siret, setSiret] = useState();
  const [number, setNumber] = useState('');
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showIndustryOptions, setShowIndustryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);

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

  const country = [
    {label: 'France', value: 'France'},
    {label: 'India', value: 'India'},
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
      <View style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '85%'}}>
            <Text style={[styles.logInText, {color: colors.text}]}>
              Pickup & Drop-off{' '}
              <Text style={{fontFamily: 'Montserrat-Medium'}}>signup</Text>
            </Text>
            <Text style={styles.loginAccessText}>
              Some information about your company
            </Text>
          </View>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../image/location-map.png')}
          />
        </View>
        <View style={styles.logFormView}>
          <View style={styles.textInputDiv}>
            <Image source={require('../../image/bulding.png')} />
            <TextInput
              style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
              placeholder="Company name"
              placeholderTextColor="#999"
              value={company}
              onChangeText={text => setCompany(text)}
            />
          </View>
          <View style={styles.mobileNumberInput}>
            <View style={{width: 95}}>
              <View style={styles.containerDropdown}>
                <Dropdown
                  data={data}
                  search
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
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
          <View style={styles.containerCountry}>
            <Dropdown
              data={country}
              search
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
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
            <Text>Number of deliveries</Text>
            <View style={styles.numberOfDeliveryCard}>
              <TouchableOpacity
                onPress={() => setSelectedDeliveryOption('1-20')}
                style={[
                  styles.unSelectedText,
                  selectedDeliveryOption === '1-20' && {
                    backgroundColor: colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedDeliveryOption === '1-20' && {color: '#fff'},
                  ]}>
                  1-20 per day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedDeliveryOption('20-100')}
                style={[
                  styles.unSelectedText,
                  selectedDeliveryOption === '20-100' && {
                    backgroundColor: colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedDeliveryOption === '20-100' && {color: '#fff'},
                  ]}>
                  20-100 per day
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedDeliveryOption('more-than-100')}
              style={[
                styles.unSelectedText,
                selectedDeliveryOption === 'more-than-100' && {
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  selectedDeliveryOption === 'more-than-100' && {
                    color: '#fff',
                  },
                ]}>
                More than 100 per day
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PickupBottomNav')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Continue</Text>
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
    marginTop: 20,
  },
  textInputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
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
    marginTop: 30,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  signUpContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  accountType: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 12,
    color: colors.text,
  },
  containerCountry: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  termOfRapidmate: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 50,
    lineHeight: 20,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  inputSearchStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  selectIndustryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  industryText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    flex: 1,
  },
  industryLeftIcons: {
    marginRight: 10,
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
  industrySelectCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 50,
  },
  typesIndustryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  industryMainCard: {
    borderWidth: 1,
    borderColor: '#2C303336',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 8,
    marginTop: 20,
  },
  unSelectedText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FF005812',
    borderRadius: 10,
    marginRight: 10,
  },
  numberOfDeliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default PickupCompanySignup;
