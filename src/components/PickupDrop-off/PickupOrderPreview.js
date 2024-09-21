import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../colors';
import BicycleImage from '../../image/Bicycle.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Img.png';
import PartnerImage from '../../image/Partner.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import OtherImage from '../../image/Big-Package.png';
import {createPickupOrder} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {useUserDetails} from '../commonComponent/StoreContext';
import DeliveryboyPackagePreviewModal from '../commonComponent/DeliveryboyPackagePreviewModal';
import {API} from '../../utils/constant';
import {debounce} from 'lodash';

const PickupOrderPreview = ({route, navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };
  const params = route.params.props;
  
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  var finalPrice;
  if (typeof params.selectedVehiclePrice === 'number') {
    finalPrice = params.selectedVehiclePrice.toFixed(2);
  } else {
    finalPrice = params.selectedVehiclePrice;
  }

  console.log("<===params===>", params)

  const pickupOrderRequest = () => {
    navigation.navigate('PickupPayment', {props: params});
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.locationCard}>
          <View style={styles.locationAddress}>
            <Ionicons name="location-outline" size={18} color="#000000" />
            <Text style={styles.TextAddress}>
              {params.sourceLocation.sourceDescription
                ? params.sourceLocation.sourceDescription
                : null}
            </Text>
          </View>
          <View style={styles.borderDummy}></View>
          <View style={styles.locationAddress}>
            <MaterialIcons name="my-location" size={18} color="#000000" />
            <Text style={styles.TextAddress}>
              {params.destinationLocation.destinationDescription
                ? params.destinationLocation.destinationDescription
                : null}
            </Text>
          </View>
          <View style={styles.borderShowOff}></View>
        </View>
        <View style={styles.pickupCard}>
          <Text style={styles.vehicleDetails}>Vehicle details</Text>
          <View style={styles.semiTruckDetails}>
            <View>
              <Text style={styles.vehicleName}>{params.selectedVehicle}</Text>
              <Text style={styles.vehicleCapacity}>
                {params.selectedVehicleDetails.vehicle_type_desc
                  ? params.selectedVehicleDetails.vehicle_type_desc
                  : null}{' '}
                max capacity
              </Text>
            </View>
            <View>
              {console.log('params.selectedVehicle', params.selectedVehicle)}
              <Image
                style={[styles.vehicleImage, {width: 100, height: 100}]}
                source={
                  params.selectedVehicle == 'Cycle'
                    ? BicycleImage
                    : params.selectedVehicle == 'Scooter'
                    ? MotorbikeImage
                    : params.selectedVehicle == 'Car'
                    ? CarImage
                    : params.selectedVehicle == 'Partner'
                    ? PartnerImage
                    : params.selectedVehicle == 'Pickup'
                    ? MiniTruckImage
                    : params.selectedVehicle == 'Van'
                    ? MiniVanImage
                    : params.selectedVehicle == 'Truck'
                    ? SemiTruckImage
                    : OtherImage
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.pickupCard}>
          <Text style={styles.pickupDetails}>Pickup details</Text>
          <View style={styles.packageBasicInfo}>
            <View>
              <Text style={styles.vehicleName}>{params.userDetails.name}</Text>
              <Text style={styles.vehicleCapacity}>
                {params.userDetails.company}
              </Text>
            </View>

            {params.userDetails.package_photo && (
              <View>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    style={styles.packagePhoto}
                    source={{
                      uri: API.viewImageUrl + params.userDetails.package_photo,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.pickupinfoCard}>
            <View style={[styles.pickupManDetails, {width: '60%'}]}>
              <SimpleLineIcons
                style={{marginTop: 3}}
                name="globe"
                size={12}
                color="#000000"
              />
              <Text style={styles.contactInfo}>{params.userDetails.email}</Text>
            </View>

            <View style={styles.pickupManDetails}>
              <MaterialIcons
                style={{marginTop: 1}}
                name="call"
                size={15}
                color="#000000"
              />
              <Text style={styles.contactInfo}>
                {params.userDetails.number}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.pickupNotes}>
              {params.userDetails.pickupNotes}
            </Text>
          </View>
        </View>

        <View style={styles.pickupCard}>
          <Text style={styles.vehicleDetails}>Estimated cost</Text>
          <View style={styles.semiTruckDetails}>
            <View style={{marginTop: 10}}>
              <Text style={styles.vehicleName}>€ {finalPrice}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.bookininfo,
                    {borderRightWidth: 1, paddingRight: 5},
                  ]}>
                  {params.distanceTime.distance.toFixed(1)} km
                </Text>
                <Text
                  style={[
                    styles.bookininfo,
                    {borderRightWidth: 1, paddingHorizontal: 5},
                  ]}>
                  {params.selectedVehicle}
                </Text>
                <Text style={[styles.bookininfo, {paddingLeft: 5}]}>
                  {params.distanceTime.time.toFixed(0)} minutes
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            style={{alignSelf: 'center'}}
            tintColors={{true: '#FFC72B', false: '#999'}}
          />
          <Text style={styles.checkboxText}>
            Save these addresses for later
          </Text>
        </View>

        <TouchableOpacity
          onPress={debounce(pickupOrderRequest, 500)}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
      {/* Modal =========  */}
      <DeliveryboyPackagePreviewModal
        isImageModalVisible={isImageModalVisible}
        setImageModalVisible={setImageModalVisible}
        previewImage={
          params.userDetails.package_photo
            ? params.userDetails.package_photo
            : null
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vehicleCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },

  vehicleDetails: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  semiTruckDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  vehicleCapacity: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  pickupCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  pickupDetails: {
    marginBottom: 10,
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  pickupManDetails: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginVertical: 10,
  },
  contactInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 3,
    color: colors.text,
  },
  pickupinfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupNotes: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  bookininfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  logbutton: {
    width: '100%',
    marginVertical: 20,
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
  locationCard: {
    position: 'relative',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 15,
  },
  locationAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextAddress: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  borderDummy: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderStyle: 'dashed',
    marginHorizontal: 9,
    marginVertical: 15,
  },
  // borderShowOff: {
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   borderStyle: 'dashed',
  //   width: 25,
  //   transform: [{rotate: '90deg'}],
  //   position: 'absolute',
  //   top: 50,
  //   left: 11,
  // },
  vehicleImage: {
    height: 62,
    resizeMode: 'center',
  },
  packageBasicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingOTP: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  packagePhoto: {
    width: 48,
    height: 48,
    borderRadius: 5,
  },
});

export default PickupOrderPreview;
