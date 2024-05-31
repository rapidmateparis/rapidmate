import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChooseDeliveryType = ({navigation}) => {
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
          How would you like to work?
        </Text>
        <Text style={styles.roleText}>
          You can change this in settings later
        </Text>
        <View style={{marginTop: 35}}>
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => {
              handleOptionSelect('ShiftWise');
              navigation.navigate('DeliveryboyThanksPage');
            }}>
            <LinearGradient
              colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={[
                styles.container,
                selectedOption === 'ShiftWise' && {
                  backgroundColor: '#FFF8C9',
                  borderWidth: 1,
                  borderColor: colors.primary,
                },
              ]}>
              <View style={styles.content}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../image/Calender-icon2x.png')}
                />
                <View style={styles.profileText}>
                  <Text style={[styles.roleTypeText, {color: colors.text}]}>
                    Shift wise
                  </Text>
                  <Text style={styles.roleText}>
                    You will set your availability for a time period on select
                    days
                  </Text>
                </View>
                {selectedOption === 'ShiftWise' && (
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
                  style={{width: 32, height: 38}}
                  source={require('../../image/Location-Icon2x.png')}
                />
                <View style={styles.profileText}>
                  <Text style={[styles.roleTypeText, {color: colors.text}]}>
                    Pickup & Drop-off
                  </Text>
                  <Text style={styles.roleText}>
                    Accept deliveries any time of the day
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
            onPress={() => {
              handleOptionSelect('Both');
              navigation.navigate('AddPickupVehicle');
            }}>
            <LinearGradient
              colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={[
                styles.container,
                selectedOption === 'Both' && {
                  backgroundColor: '#FFF8C9',
                  borderWidth: 1,
                  borderColor: colors.primary,
                },
              ]}>
              <View style={styles.content}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../image/Calender-Both2x.png')}
                />
                <View style={styles.profileText}>
                  <Text style={[styles.roleTypeText, {color: colors.text}]}>
                    Both
                  </Text>
                  <Text style={styles.roleText}>
                    Work as shift wise and pickup/dropoff both
                  </Text>
                </View>
                {selectedOption === 'Both' && (
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
    backgroundColor: '#fff',
  },
  logInText: {
    fontSize: 20,
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
    marginHorizontal: 20,
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

export default ChooseDeliveryType;
