import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {colors} from '../../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useLookupData,
  useUserDetails,
} from '../../commonComponent/StoreContext';
import {updateUserProfile} from '../../../data_manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localizationText} from '../../../utils/common';

const {height: screenHeight} = Dimensions.get('window');

const DeliveryPreferance = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState({});
  const {lookupData} = useLookupData();
  const {saveUserDetails, userDetails} = useUserDetails();
  const [deliveryPreferenceList, setDeliveryPreferenceList] = useState(
    lookupData.workType,
  );

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  useEffect(() => {
    var option = lookupData.workType.filter(
      val => val.id == userDetails.userDetails[0].work_type_id,
    );
    setSelectedOption(option[0]);
  }, []);

  // Define a variable to check if any option is selected
  const isOptionSelected = selectedOption !== null;

  const getImage = item => {
    switch (item.id) {
      case 1:
        return require('../../../image/Calender-icon2x.png');
      case 2:
        return require('../../../image/Location-Icon2x.png');
      case 3:
        return require('../../../image/Calender-Both2x.png');
    }
  };

  const saveUserDetailsInAsync = async userDetails => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const updateProfile = () => {
    let profileParams = {
      ext_id: userDetails.userDetails[0].ext_id,
      work_type_id: selectedOption.id,
    };
    updateUserProfile(
      userDetails.userDetails[0].role,
      profileParams,
      successResponse => {
        console.log('updateUserProfile', successResponse);
        saveUserDetails({
          userInfo: userDetails.userInfo,
          userDetails: [
            {...userDetails.userDetails[0], work_type_id: selectedOption.id},
          ],
        });
        saveUserDetailsInAsync({
          userInfo: userDetails.userInfo,
          userDetails: [
            {...userDetails.userDetails[0], work_type_id: selectedOption.id},
          ],
        });
        Alert.alert('Success', 'Delivery preferance updated successfully', [
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
    <ScrollView>
      <View style={styles.contentContainer}>
        <Text style={[styles.logInText, {color: colors.text}]}>
          {localizationText('Common', 'selectDeliveryPreference')}
        </Text>
        <View style={{marginTop: 20}}>
          {deliveryPreferenceList.map(item => (
            <TouchableOpacity
              style={styles.profileCard}
              onPress={() => {
                handleOptionSelect(item);
              }}>
              <LinearGradient
                colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  styles.container,
                  selectedOption === item && {
                    backgroundColor: '#FFF8C9',
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                ]}>
                <View style={styles.content}>
                  <Image
                    style={{width: 40, height: 40, resizeMode: 'contain'}}
                    source={getImage(item)}
                  />
                  <View style={styles.profileText}>
                    <Text style={styles.roleTypeText}>{item.work_type}</Text>
                    <Text style={styles.roleText}>{item.work_type_desc}</Text>
                  </View>
                  {selectedOption !== item && (
                    <View style={styles.cricleRound} />
                  )}
                  {selectedOption === item && (
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        width: 30,
                        height: 30,
                        padding: 3,
                        borderRadius: 15,
                      }}>
                      <MaterialIcons
                        name="check"
                        size={24}
                        color={colors.white}
                      />
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.logbutton,
            {
              backgroundColor: isOptionSelected
                ? colors.primary
                : colors.disabledButtonColor,
            },
            !isOptionSelected && styles.disabledButton, // Apply additional styles when option is not selected
          ]}
          disabled={!isOptionSelected}
          onPress={() => {
            if (isOptionSelected) {
              updateProfile();
            }
          }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              fontFamily: 'Montserrat-Medium',
            }}>
            {localizationText('Common', 'save')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3535351A',
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 15,
    minHeight: screenHeight,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  logInText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  loginAccessText: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    marginTop: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  profileText: {
    marginHorizontal: 20,
    width: '65%',
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  roleTypeText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  logbutton: {
    width: '100%',
    marginTop: 40,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  profileCard: {
    marginBottom: 10,
  },
  disabledButton: {
    width: '100%',
    marginTop: 40,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCF9EA',
    marginBottom: 30,
  },
  roleTypeText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  cricleRound: {
    width: 30,
    height: 30,
    padding: 3,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.subText,
  },
});

export default DeliveryPreferance;
