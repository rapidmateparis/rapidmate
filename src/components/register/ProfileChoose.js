import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSignUpDetails} from '../commonComponent/StoreContext';

const ProfileChoose = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {signUpDetails, saveSignUpDetails} = useSignUpDetails();

  const handleOptionSelect = option => {
    setSelectedOption(option);
    let profileOption;
    if (option == 'Enterprise') {
      profileOption = 'ENTERPRISE';
    } else if (option == 'PickupDrop') {
      profileOption = 'CONSUMER';
    } else {
      profileOption = 'DELIVERY_BOY';
    }
    saveSignUpDetails({...signUpDetails, profile: profileOption});
  };

  // Define a variable to check if any option is selected
  const isOptionSelected = selectedOption !== null;

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{height: '100%', backgroundColor: '#fff'}}>
        <View style={styles.contentContainer}>
          <Text style={styles.logInText}>Choose profile</Text>
          <Text style={styles.loginAccessText}>
            Before creating your profile, please select your role on this app.
          </Text>
          <View style={{marginTop: 35}}>
            <TouchableOpacity
              style={styles.profileCard}
              onPress={() => handleOptionSelect('Enterprise')}>
              <LinearGradient
                colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  styles.container,
                  selectedOption === 'Enterprise' && {
                    backgroundColor: '#FFF8C9',
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                ]}>
                <View style={styles.content}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../image/home.png')}
                  />
                  <View style={styles.profileText}>
                    <Text style={styles.roleText}>I am here as</Text>
                    <Text style={[styles.roleTypeText, {color: colors.text}]}>
                      Enterprise
                    </Text>
                  </View>
                  {selectedOption === 'Enterprise' ? (
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        width: 25,
                        height: 25,
                        padding: 3,
                        borderRadius: 15,
                      }}>
                      <MaterialIcons
                        name="check"
                        size={18}
                        color={colors.white}
                      />
                    </View>
                  ) : (
                    <View style={styles.cricleRound} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileCard}
              onPress={() => {
                handleOptionSelect('PickupDrop');
              }}>
              <LinearGradient
                colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  styles.container,
                  selectedOption === 'PickupDrop' && {
                    backgroundColor: '#FFF8C9',
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                ]}>
                <View style={styles.content}>
                  <Image
                    style={{width: 40, height: 45}}
                    source={require('../../image/location-map.png')}
                  />
                  <View style={styles.profileText}>
                    <Text style={styles.roleText}>I am here as</Text>
                    <Text style={[styles.roleTypeText, {color: colors.text}]}>
                      Pickup & Drop-off
                    </Text>
                  </View>
                  {selectedOption === 'PickupDrop' ? (
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        width: 25,
                        height: 25,
                        padding: 3,
                        borderRadius: 15,
                      }}>
                      <MaterialIcons
                        name="check"
                        size={18}
                        color={colors.white}
                      />
                    </View>
                  ) : (
                    <View style={styles.cricleRound} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileCard}
              onPress={() => handleOptionSelect('DeliveryBoy')}>
              <LinearGradient
                colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  styles.container,
                  selectedOption === 'DeliveryBoy' && {
                    backgroundColor: '#FFF8C9',
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                ]}>
                <View style={styles.content}>
                  <Image
                    style={{width: 30, height: 45}}
                    source={require('../../image/DeliveryBoy-Icon.png')}
                  />
                  <View style={[styles.profileText, {marginLeft: 30}]}>
                    <Text style={styles.roleText}>I am here as</Text>
                    <Text style={styles.roleTypeText}>Delivery boy</Text>
                  </View>
                  {selectedOption === 'DeliveryBoy' ? (
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        width: 25,
                        height: 25,
                        padding: 3,
                        borderRadius: 15,
                      }}>
                      <MaterialIcons
                        name="check"
                        size={18}
                        color={colors.white}
                      />
                    </View>
                  ) : (
                    <View style={styles.cricleRound} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
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
                if (selectedOption === 'PickupDrop') {
                  navigation.navigate('PickupSignup');
                } else if (selectedOption === 'Enterprise') {
                  navigation.navigate('EnterpriseSignup');
                } else if (selectedOption === 'DeliveryBoy') {
                  navigation.navigate('DeliveryBoySignup');
                }
              }
            }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.text,
                fontFamily: 'Montserrat-Medium',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: 10,
  },
  logInText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  loginAccessText: {
    fontSize: 12,
    color: colors.text,
    width: '80%',
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
    marginLeft: 20,
    width: '65%',
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  roleTypeText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  logbutton: {
    width: '100%',
    marginTop: '30%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginBottom: 10,
  },
  disabledButton: {
    width: '100%',
    marginTop: '30%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCF9EA',
  },
  cricleRound: {
    width: 25,
    height: 25,
    padding: 3,
    borderRadius: 15,
    borderBlockColor: colors.text,
    borderWidth: 1,
  },
});

export default ProfileChoose;
