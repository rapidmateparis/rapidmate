import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileChoose = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  // Define a variable to check if any option is selected
  const isOptionSelected = selectedOption !== null;

  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <Text style={[styles.logInText, {color: colors.text}]}>
          Choose profile
        </Text>
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
                  style={{width: 50, height: 50}}
                  source={require('../../image/home.png')}
                />
                <View style={styles.profileText}>
                  <Text style={styles.roleText}>I am here as</Text>
                  <Text style={[styles.roleTypeText, {color: colors.text}]}>
                    Enterprise
                  </Text>
                </View>
                {selectedOption === 'Enterprise' && (
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

          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => {
              handleOptionSelect('PickupDrop');
              navigation.navigate('PickupSignup');
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
                  style={{width: 50, height: 50}}
                  source={require('../../image/home.png')}
                />
                <View style={styles.profileText}>
                  <Text style={styles.roleText}>I am here as</Text>
                  <Text style={[styles.roleTypeText, {color: colors.text}]}>
                    Pickup & Drop-off
                  </Text>
                </View>
                {selectedOption === 'PickupDrop' && (
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
                  style={{width: 50, height: 50}}
                  source={require('../../image/home.png')}
                />
                <View style={styles.profileText}>
                  <Text style={styles.roleText}>I am here as</Text>
                  <Text style={[styles.roleTypeText, {color: colors.text}]}>
                    Delivery boy
                  </Text>
                </View>
                {selectedOption === 'DeliveryBoy' && (
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
              // Proceed with the action
              // navigation.navigate('ForgotPassword');
            }
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colors.text,
              fontFamily: 'Montserrat-Medium',
            }}>
            Continue
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
    paddingTop: 10,
  },
  logInText: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
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
    marginLeft: 20,
    width: '65%',
  },
  roleText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
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
  },
});

export default ProfileChoose;
