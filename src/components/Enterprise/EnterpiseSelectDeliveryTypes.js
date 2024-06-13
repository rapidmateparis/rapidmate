import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';

const EnterpiseSelectDeliveryTypes = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleOptionSelect = (option, vehicle) => {
    setSelectedOption(option);
    setSelectedVehicle(vehicle);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.selectServiceTitle}>Select service type</Text>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Delivery boy with scooter',
            ]}
            onPress={() =>
              handleOptionSelect('Delivery boy with scooter', 'Scooter')
            }>
            {selectedOption === 'Delivery boy with scooter' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Delivery boy with scooter' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Delivery boy with scooter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Delivery boy without scooter',
            ]}
            onPress={() =>
              handleOptionSelect('Delivery boy without scooter', '')
            }>
            {selectedOption === 'Delivery boy without scooter' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Delivery boy without scooter' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Delivery boy without scooter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Multi-task employee',
            ]}
            onPress={() => handleOptionSelect('Multi-task employee', '')}>
            {selectedOption === 'Multi-task employee' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Multi-task employee' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Multi-task employee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Cleaning staff',
            ]}
            onPress={() => handleOptionSelect('Cleaning staff', '')}>
            {selectedOption === 'Cleaning staff' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Cleaning staff' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Cleaning staff
            </Text>
          </TouchableOpacity>

          <Text style={styles.selectServiceTitle}>Select vehicle type</Text>
        </View>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={
                selectedVehicle === 'Cycle' ? 'dot-circle-o' : 'circle-thin'
              }
              size={25}
              color={colors.text}
            />
            <Text style={styles.paymentPlateform}>Cycle</Text>
          </View>
          <Image source={require('../../image/Cycle-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addressCard,
            selectedVehicle === 'Scooter' && {borderColor: colors.secondary, opacity: 1,},
          ]}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={
                selectedVehicle === 'Scooter' ? 'dot-circle-o' : 'circle-thin'
              }
              size={25}
              color={
                selectedVehicle === 'Scooter' ? colors.secondary : colors.text
              }
            />
            <Text style={styles.paymentPlateform}>Scooter</Text>
          </View>
          <Image source={require('../../image/Scooter-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={selectedVehicle === 'Car' ? 'dot-circle-o' : 'circle-thin'}
              size={25}
              color={colors.text}
            />
            <Text style={styles.paymentPlateform}>Car</Text>
          </View>
          <Image source={require('../../image/Car-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={selectedVehicle === 'Van' ? 'dot-circle-o' : 'circle-thin'}
              size={25}
              color={colors.text}
            />
            <Text style={styles.paymentPlateform}>Van</Text>
          </View>
          <Image source={require('../../image/Van-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={
                selectedVehicle === 'Pickup' ? 'dot-circle-o' : 'circle-thin'
              }
              size={25}
              color={colors.text}
            />
            <Text style={styles.paymentPlateform}>Pickup</Text>
          </View>
          <Image source={require('../../image/Pickup-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={
                selectedVehicle === 'Truck' ? 'dot-circle-o' : 'circle-thin'
              }
              size={25}
              color={colors.text}
            />
            <Text style={styles.paymentPlateform}>Truck</Text>
          </View>
          <Image source={require('../../image/Truck-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.vihicleCards}>
            <FontAwesome
              name={
                selectedVehicle === 'Other' ? 'dot-circle-o' : 'circle-thin'
              }
              size={25}
              color={colors.text}
            />
            <Text style={styles.paymentPlateform}>Other</Text>
          </View>
          <Image source={require('../../image/Package-Right1x.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('EnterpiseScheduleNewDetailsFill')}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: '#35353533',
    borderRadius: 10,
    marginVertical: 5,
    opacity: 0.5,
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: 10,
  },
  logbutton: {
    width: '100%',
    marginTop: 30,
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
  selectServiceTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginVertical: 10,
  },
  deliveryboyType: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginHorizontal: 8,
  },
  selectDeliveryboyTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkIcon: {
    borderWidth: 1,
    width: 23,
    height: 23,
    borderRadius: 15,
    marginRight: 8,
  },
  vihicleCards: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  disabledCard: {
    opacity: 1,
  }
});

export default EnterpiseSelectDeliveryTypes;
