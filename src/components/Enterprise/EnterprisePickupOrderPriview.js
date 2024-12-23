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
import {useUserDetails} from '../commonComponent/StoreContext';
import BicycleImage from '../../image/Cycle-Icon.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Icon.png';
import PartnerImage from '../../image/Partner-icon.png';
import VanImage from '../../image/Van-Icon.png';
import PickupImage from '../../image/Pickup-Icon.png';
import TruckImage from '../../image/Truck-Icon.png';
import BigTruckImage from '../../image/Big-Package.png';
import {useLoader} from '../../utils/loaderContext';
import {createEnterpriseOrder} from '../../data_manager';
import DeliveryboyPackagePreviewModal from '../commonComponent/DeliveryboyPackagePreviewModal';
import {API} from '../../utils/constant';

const EnterprisePickupOrderPriview = ({route, navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();
  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };
  const params = route.params?.props ? route.params?.props :route.params;


  console.log('Image ID:', params.imageViewId);

  const getVechicleImage = vehicleTypeId => {
    switch (vehicleTypeId) {
      case 1:
        return BicycleImage;
      case 2:
        return MotorbikeImage;
      case 3:
        return CarImage;
      case 4:
        return PartnerImage;
      case 5:
        return PickupImage;
      case 6:
        return VanImage;
      case 7:
        return TruckImage;
      default:
        return BigTruckImage;
    }
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.locationCard}>
          <View style={styles.locationAddress}>
            <Ionicons name="location-outline" size={18} color="#000000" />
            <Text style={styles.TextAddress}>
              {params.pickup_location.sourceDescription}
            </Text>
          </View>
          <View style={styles.borderDummy}></View>
          {params.delivery_type_id == 2 ? (
            params.branches.map((item, index) => {
              return (
                <View style={[styles.locationAddress, {marginVertical: 7}]}>
                  <MaterialIcons name="my-location" size={18} color="#000000" />
                  <Text style={styles.TextAddress}>
                    {item.destinationDescription}
                  </Text>
                </View>
              );
            })
          ) : (
            <View style={styles.locationAddress}>
              <MaterialIcons name="my-location" size={18} color="#000000" />
              <Text style={styles.TextAddress}>
                {params.dropoff_location.destinationDescription}
              </Text>
            </View>
          )}

          <View style={styles.borderShowOff}></View>
        </View>
        <View style={styles.pickupCard}>
          <Text style={styles.vehicleDetails}>Vehicle details</Text>
          <View style={styles.semiTruckDetails}>
            <View>
              <Text style={styles.vehicleName}>
                {params.vehicle_type.vehicle_type}
              </Text>
              <Text style={styles.vehicleCapacity}>
                {params.vehicle_type.vehicle_type_desc
                  ? params.vehicle_type.vehicle_type_desc
                  : null}{' '}
                max capacity
              </Text>
            </View>
            <View>
              <Image
                style={[styles.vehicleImage, {width: 100, height: 100}]}
                source={getVechicleImage(params.vehicle_type.vehicle_type_id)}
              />
            </View>
          </View>
        </View>

        <View style={styles.pickupCard}>
          <Text style={styles.pickupDetails}>Pickup details</Text>
          <View style={styles.packageBasicInfo}>
            <View>
              <Text style={styles.vehicleName}>
                {userDetails.userDetails[0].first_name +
                  ' ' +
                  userDetails.userDetails[0].last_name}
              </Text>
              <Text style={styles.vehicleCapacity}>{params.company_name}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => toggleModal()}>
                {params.imageId ? (
                  <Image
                    style={styles.packagePhoto}
                    source={{uri: API.imageViewUrl + params.imageId}}
                  />
                ) : (
                  <Image
                    style={styles.packagePhoto}
                    source={require('../../image/PackagePhoto.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pickupinfoCard}>
            <View style={[styles.pickupManDetails, {width: '60%'}]}>
              <SimpleLineIcons
                style={{marginTop: 3}}
                name="globe"
                size={12}
                color="#000000"
              />
              <Text style={styles.contactInfo}>
                {userDetails.userDetails[0].email}
              </Text>
            </View>

            <View style={styles.pickupManDetails}>
              <MaterialIcons
                style={{marginTop: 1}}
                name="call"
                size={15}
                color="#000000"
              />
              <Text style={styles.contactInfo}>+33{params.mobile}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.pickupNotes}>{params.pickup_notes}</Text>
          </View>
        </View>

        {params?.drop_details && <View style={styles.pickupCard}>
          <Text style={styles.pickupDetails}>Drop details</Text>
          <View style={styles.packageBasicInfo}>
            <View>
              <Text style={styles.vehicleName}>
                {params.drop_details.drop_first_name +
                  ' ' +
                  params.drop_details.drop_last_name}
              </Text>
              <Text style={styles.vehicleCapacity}>{params.drop_details.drop_company_name}</Text>
            </View>

          </View>
          <View style={styles.pickupinfoCard}>
            <View style={[styles.pickupManDetails, {width: '60%'}]}>
              <SimpleLineIcons
                style={{marginTop: 3}}
                name="globe"
                size={12}
                color="#000000"
              />
              <Text style={styles.contactInfo}>
                {params.drop_details.drop_email}
              </Text>
            </View>

            <View style={styles.pickupManDetails}>
              <MaterialIcons
                style={{marginTop: 1}}
                name="call"
                size={15}
                color="#000000"
              />
              <Text style={styles.contactInfo}>+33{params.drop_details.drop_mobile}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.pickupNotes}>{params.drop_details.drop_notes}</Text>
          </View>
        </View>}



        <View style={styles.pickupCard}>
          <Text style={styles.vehicleDetails}>Estimated cost</Text>
          <View style={styles.semiTruckDetails}>
            <View style={{marginTop: 10}}>
              <Text style={styles.vehicleName}>€{params.amount}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.bookininfo,
                    {borderRightWidth: 1, paddingRight: 5},
                  ]}>
                  {params.distance} km
                </Text>
                <Text
                  style={[
                    styles.bookininfo,
                    {borderRightWidth: 1, paddingHorizontal: 5},
                  ]}>
                  {params.vehicle_type.vehicle_type}
                </Text>
                <Text style={[styles.bookininfo, {paddingLeft: 5}]}>
                  {params.time} minutes
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
          onPress={() =>
            navigation.navigate('EnterpriseOrderPayment', {...params})
          }
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>

      <DeliveryboyPackagePreviewModal
        isImageModalVisible={isImageModalVisible}
        setImageModalVisible={setImageModalVisible}
        previewImage={
          params.imageId
            ? params.imageId
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
    fontSize: 15,
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

export default EnterprisePickupOrderPriview;
