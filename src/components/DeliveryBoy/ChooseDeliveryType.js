import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {localizationText} from '../../utils/common';

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
          {localizationText('Common', 'selectWorkType')}
        </Text>
        <Text style={styles.roleText}>
          {localizationText('Common', 'selectWorkTypeDescription')}
        </Text>
        <View style={{marginTop: 35}}>
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => {
              handleOptionSelect('ShiftWise');
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
                  <Text style={styles.roleTypeText}>
                    {localizationText('Common', 'shiftWise')}
                  </Text>
                  <Text style={styles.roleText}>
                    {localizationText('Common', 'shiftWiseDescription')}
                  </Text>
                </View>
                {selectedOption !== 'ShiftWise' && (
                  <View style={styles.cricleRound} />
                )}
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
                  <Text style={styles.roleTypeText}>
                    {localizationText('Common', 'pickupAndDropoff')}
                  </Text>
                  <Text style={styles.roleText}>
                    {localizationText('Common', 'pickupAndDropDescription')}
                  </Text>
                </View>
                {selectedOption !== 'PickupDrop' && (
                  <View style={styles.cricleRound} />
                )}
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
                  <Text style={styles.roleTypeText}>
                    {localizationText('Common', 'both')}
                  </Text>
                  <Text style={styles.roleText}>
                    {localizationText('Common', 'bothDescription')}
                  </Text>
                </View>
                {selectedOption !== 'Both' && (
                  <View style={styles.cricleRound} />
                )}
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
          onPress={() => navigation.navigate('DeliveryboyThanksPage')}
          style={[
            styles.logbutton,
            {
              backgroundColor: isOptionSelected
                ? colors.primary
                : colors.disabledButtonColor,
            },
            !isOptionSelected && styles.disabledButton, // Apply additional styles when option is not selected
          ]}
          disabled={!isOptionSelected}>
          <Text style={styles.continueBt}>Continue</Text>
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
    marginTop: 40,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  continueBt: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
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

export default ChooseDeliveryType;
