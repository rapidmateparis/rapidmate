import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { localizationText } from '../../../utils/common';

const Supports = () => {
  const navigation = useNavigation();
  const orderClosedEarned =
      localizationText('Common', 'orderClosedEarned') ||
      'This order is closed, you earned';

  const renderCard = (option, iconSource, title, subtitle, imageStyle) => {
    return (
      <LinearGradient
        colors={['rgba(239, 176, 61, 0)', 'rgba(239, 176, 61, 0.08)']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
         onPress={() => navigation.goBack()}
          style={styles.addressCard}>
          <Image source={iconSource} style={styles.cardImage} />
          <View style={{flex: 1}}>
            <Text style={styles.paymentPlateform}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <AntDesign name="arrowright" size={20} color="#000" />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        {renderCard(
          'ReportSafety',
          require('../../../image/ReportSaftyIcon.png'),
          {orderClosedEarned},
          'Tell us here if you have any safety issue',
        )}
        {renderCard(
          'DriverFeedback',
          require('../../../image/DriverFeedbackIcon.png'),
          'Driver feedback',
          'Tell us know your concern about the driver',
        )}
        {renderCard(
          'LostSomething',
          require('../../../image/LoastSomthingIcon.png'),
          'Lost something?',
          'Tell us if you have lost or some missing item',
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    marginVertical: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    height: 100,
    borderWidth: 1,
    borderColor: '#35353533',
    borderRadius: 10,
    justifyContent: 'space-between', // Ensure the arrow is aligned to the right
  },
  cardImage: {
    height: 40,
    resizeMode: 'center',
  },
  arrowIcon: {
    width: 20, // Adjust the size if needed
    height: 20, // Adjust the size if needed
    resizeMode: 'contain',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 5,
  },
  subtitle: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
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
});

export default Supports;
