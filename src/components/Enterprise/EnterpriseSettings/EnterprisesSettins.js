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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserDetails} from '../../commonComponent/StoreContext';
import RNRestart from 'react-native-restart';
import {API} from '../../../utils/constant';

const EnterprisesSettins = ({navigation}) => {
  const {userDetails} = useUserDetails();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    RNRestart.restart();
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
            <Text style={styles.username}>Company Name</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EnterprisesTakeSelfie')}
              style={styles.goprofile}>
              <Text style={styles.manageProfile}>Manage your profile</Text>
              <AntDesign name="right" size={13} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddressBook', {userDetails: userDetails})
            }
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Address book</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseLocation')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Manage company locations</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseManageAds')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Manage Ads</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPaymentMethod')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Payment methods</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryboyTransactions')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Billing details</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PickupChangePassword')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Change password</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationSetting')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Notifications</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Language</Text>
            <Text style={styles.titleStatus}>English</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Help</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutUs')}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>About us</Text>
            <AntDesign name="right" size={13} color="#909090" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <TouchableOpacity
            onPress={() => {
              clearAsyncStorage();
            }}
            style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Logout</Text>
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
