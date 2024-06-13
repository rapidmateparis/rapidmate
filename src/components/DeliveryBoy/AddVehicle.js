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
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';

const AddVehicle = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity

            style={styles.addressCard}>
            <Image source={require('../../image/Cycle-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Cycle</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity style={styles.addressCard}>
            <Image source={require('../../image/Scooter-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Scooter</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity style={styles.addressCard}>
            <Image source={require('../../image/Car-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Car</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity style={styles.addressCard}>
            <Image source={require('../../image/Van-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Van</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity style={styles.addressCard}>
            <Image source={require('../../image/Pickup-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Pickup</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity style={styles.addressCard}>
            <Image source={require('../../image/Truck-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Truck</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity style={styles.addressCard}>
            <Image source={require('../../image/Package-Icon.png')} />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.paymentPlateform}>Other</Text>
            </View>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={20} color="#2C3033" />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddPickupVehicle')}
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
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
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
