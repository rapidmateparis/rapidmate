import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../colors';

const DeliveryboyOtherOptions = () => {
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === 'CustomVehicle') {
      navigation.navigate('AddCustomVehicle');
    } else {
      navigation.navigate('ChooseDeliveryType');
    }
  };

  const renderCard = (option, iconSource, title, subtitle, imageStyle) => {
    const isSelected = selectedOption === option;

    return (
      <LinearGradient
        colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          onPress={() => handleOptionSelect(option)}
          style={[
            styles.addressCard,
            isSelected ? styles.selectedCard : null, // Apply selected card style conditionally
          ]}>
          <Image source={iconSource} style={[styles.cardImage, imageStyle]} />
          <View style={{marginLeft: 10, flex: 1}}>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            <Text style={styles.paymentPlateform}>{title}</Text>
          </View>

          {!isSelected && <View style={styles.cricleRound} />}

          {isSelected && (
            <View style={styles.checkmark}>
              <AntDesign name="check" size={18} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        {renderCard(
          'CustomVehicle',
          require('../../image/Custom-Vehicle.png'),
          'Add custom vehicle',
          '',
          styles.customVehicleImage,
        )}
        {renderCard(
          'Multitask',
          require('../../image/MultitaskCap.png'),
          'Multitask employee',
          'Register as',
          styles.multitaskImage,
        )}
        {renderCard(
          'CleaningStaff',
          require('../../image/CleaningStaff.png'),
          'Cleaning staff',
          'Register as',
          styles.cleaningImage,
        )}

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    marginVertical: 5,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    height: 70,
    borderWidth: 1,
    borderColor: '#35353533',
    borderRadius: 10,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  checkmark: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
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
  cardImage: {
    width: 40,
    height: 40,
  },
  customVehicleImage: {
    width: 45,
    height: 46,
  },
  multitaskImage: {
    width: 34,
    height: 26,
  },
  cleaningImage: {
    width: 30,
    height: 37,
  },
  cricleRound: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.subText,
  },
  subtitle: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
});

export default DeliveryboyOtherOptions;
