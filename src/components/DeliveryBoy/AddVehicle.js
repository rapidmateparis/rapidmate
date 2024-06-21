import React, { useState } from 'react';
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
import { colors } from '../../colors';

const AddVehicle = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderCard = (option, iconSource, title) => {
    const isSelected = selectedOption === option;

    return (
      <LinearGradient
        colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          onPress={() => handleOptionSelect(option)}
          style={[styles.addressCard, isSelected && styles.selectedCard]}
        >
          <Image source={iconSource} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.paymentPlateform}>{title}</Text>
          </View>
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
    <ScrollView style={{ flex: 1, backgroundColor: '#FBFAF5' }}>
      <View style={{ paddingHorizontal: 15 }}>
        {renderCard('Cycle', require('../../image/Cycle-Icon.png'), 'Cycle')}
        {renderCard('Scooter', require('../../image/Scooter-Icon.png'), 'Scooter')}
        {renderCard('Car', require('../../image/Car-Icon.png'), 'Car')}
        {renderCard('Van', require('../../image/Van-Icon.png'), 'Van')}
        {renderCard('Pickup', require('../../image/Pickup-Icon.png'), 'Pickup')}
        {renderCard('Truck', require('../../image/Truck-Icon.png'), 'Truck')}
        {renderCard('Other', require('../../image/Package-Icon.png'), 'Other')}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddPickupVehicle')}
          style={[styles.logbutton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    marginTop: 50,
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

export default AddVehicle;
