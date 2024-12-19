import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../colors';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {updateUserProfile} from '../../../data_manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationSetting = ({navigation}) => {
  const {saveUserDetails, userDetails} = useUserDetails();
  const [pushNotifications, setPushNotifications] = useState(
    userDetails.userDetails[0].enable_push_notification === 1,
  );
  const [promoEmails, setPromoEmails] = useState(
    userDetails.userDetails[0].enable_email_notification === 1,
  );

  useEffect(() => {}, [userDetails]);

  const togglePushNotifications = () => {
    setPushNotifications(prevState => {
      const newValue = !prevState;
      updateProfile(newValue, promoEmails);
      return newValue;
    });
  };

  const togglePromoEmails = () => {
    setPromoEmails(prevState => {
      const newValue = !prevState;
      updateProfile(pushNotifications, newValue);
      return newValue;
    });
  };

  const saveUserDetailsInAsync = async userDetails => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const updateProfile = (pushNotifications, promoEmails) => {
    const profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      enable_push_notification: pushNotifications ? 1 : 0,
      enable_email_notification: promoEmails ? 1 : 0,
    };

    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        console.log('updateUserProfile', profileParams, successResponse);
        const updatedDetails = {
          userInfo: userDetails.userInfo,
          userDetails: [
            {
              ...userDetails.userDetails[0],
              enable_push_notification: pushNotifications ? 1 : 0,
              enable_email_notification: promoEmails ? 1 : 0,
            },
          ],
        };
        saveUserDetails(updatedDetails);
        saveUserDetailsInAsync(updatedDetails);
        Alert.alert('Success', 'Changes Applied Successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      },
      errorResponse => {
        console.log('updateUserProfile', errorResponse);
      },
    );
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FFF'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.addressCard}>
          <View style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Receive push notifications</Text>
            <TouchableOpacity onPress={togglePushNotifications}>
              <MaterialCommunityIcons
                name={pushNotifications ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={pushNotifications ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.bookAddress}>
            <Text style={styles.cardTitle}>Receive promotional emails</Text>
            <TouchableOpacity onPress={togglePromoEmails}>
              <MaterialCommunityIcons
                name={promoEmails ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={promoEmails ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
});

export default NotificationSetting;
