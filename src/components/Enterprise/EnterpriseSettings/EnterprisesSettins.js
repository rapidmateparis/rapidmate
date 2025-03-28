import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserDetails} from '../../commonComponent/StoreContext';
import RNRestart from 'react-native-restart';
import {API} from '../../../utils/constant';
import {localizationText} from '../../../utils/common';
import i18n from '../../../localization/localizationUtils';

const EnterprisesSettins = ({navigation}) => {
  const {userDetails} = useUserDetails();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const languages = [
    {label: 'English', key: 'en'},
    {label: 'French', key: 'fr'},
  ];

  const getCurrentSelectedLanguage = () => {
    const currentLanguage = i18n.language;
    const findLang = languages.find(lang => lang.key === currentLanguage);
    return findLang ? findLang.label : '';
  };

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    RNRestart.restart();
  };

  const handlePress = () => {
    Linking.openURL('https://rapidmate.fr/support-page');
  };
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.profileCard}>
          <View>
            {userDetails.userDetails[0].profile_pic ? (
              <Image
                style={styles.profileImg}
                source={{
                  uri:
                    API.viewImageUrl + userDetails.userDetails[0].profile_pic,
                }}
              />
            ) : (
              <Image
                style={styles.profileImg}
                source={require('../../../image/home.png')}
              />
            )}
          </View>
          <View style={{marginLeft: 15}}>
            <Text style={styles.username}>
              {userDetails.userDetails[0].first_name +
                ' ' +
                userDetails.userDetails[0].last_name}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EnterpriseManageProfile')}
              style={styles.goprofile}>
              <Text style={styles.manageProfile}>
                {localizationText('Common', 'manageYourProfile')}
              </Text>
              <AntDesign name="right" size={13} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddressBook', {userDetails: userDetails})
            }
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'addressBook')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseLocation')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'manageCompanyLocations')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseManageAds')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'manageAds')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View> */}

        {/* <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPaymentMethod')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'paymentMethods')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View> */}

        {/* <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseBillingDetail')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'billingDetails')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PickupChangePassword')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'changePassword')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationSetting')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'notifications')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            style={styles.bookAddress}
            onPress={() => setShowOptions(!showOptions)}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'language')}
            </Text>
            <Text style={styles.titleStatus}>
              {getCurrentSelectedLanguage()}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
          {showOptions &&
            languages
              .filter(lng => lng.key !== i18n.language)
              .map(lng => {
                return (
                  <TouchableOpacity
                    key={lng.key}
                    style={styles.bookAddress}
                    onPress={() => {
                      i18n.changeLanguage(lng.key);
                      setShowOptions(false);
                    }}>
                    <Text style={styles.cardTitle}></Text>
                    <Text style={styles.titleStatus}>{lng.label}</Text>
                    <AntDesign name="right" size={13} color="#909090" />
                  </TouchableOpacity>
                );
              })}
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={handlePress}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'help')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutUs')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'aboutUs')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => {
              clearAsyncStorage();
            }}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'logout')}
            </Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>
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
});

export default EnterprisesSettins;
