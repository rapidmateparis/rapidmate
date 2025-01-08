import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import BicycleImage from '../../image/Cycle-Right1x.png';
import MotorbikeImage from '../../image/Scooter-Right1x.png';
import CarImage from '../../image/Car-Right1x.png';
import PartnerImage from '../../image/Partner-Right1x.png';
import miniTruckImage from '../../image/Van-Right1x.png';
import MiniVanImage from '../../image/Pickup-Right1x.png';
import SemiTruckImage from '../../image/Truck-Right1x.png';
import PackageImage from '../../image/Big-Package.png';
import EnterpriseVehcleDimensions from '../commonComponent/EnterpriseVehcleDimensions';
import {useLoader} from '../../utils/loaderContext';
import {getAllVehicleTypes, getLookupData} from '../../data_manager';
import { useLookupData } from '../commonComponent/StoreContext';

const EnterpiseSelectDeliveryTypes = ({route, navigation}) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState(1);

  const handleOptionSelect = (vehicle, type) => {
    setSelectedOption(type.id);
    setSelectedVehicle(vehicle);
    if (type.id) {
      setServiceTypeId(type.id);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState();
  const {setLoading} = useLoader();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const {saveLookupData,lookupData} = useLookupData();

  console.log('lookupData ====>',lookupData)

  const toggleModal = vehicleDetails => {
    setVehicleDetails(vehicleDetails);
    setModalVisible(!isModalVisible);
  };


  useEffect(()=>{
    if(vehicleTypeList?.length > 0){
    const vehicle = vehicleTypeList.filter(val => val.vehicle_type == 'Cycle')[0]
    setSelectedVehicle(vehicle)
    route.params.delivery_type_id == 3 ? 
    serviceTypeId === 1 ? setSelectedVehiclePrice(vehicle.enterprise_wv_amount) :
    setSelectedVehiclePrice(vehicle.enterprise_wov_amount):  setSelectedVehiclePrice(vehicle.km_price);
    }
  },[vehicleTypeList])


  useEffect(()=>{
    if(selectedOption !== 'Delivery boy with scooter'){
      setSelectedVehiclePrice(0)
    }else{

      route.params.delivery_type_id == 3 ?  
      serviceTypeId === 1 ? setSelectedVehiclePrice(vehicle.enterprise_wv_amount) :
      setSelectedVehiclePrice(selectedVehicle.enterprise_wov_amount):  setSelectedVehiclePrice(selectedVehicle.km_price);
      // selectedVehicle?.km_price && setSelectedVehiclePrice(selectedVehicle.km_price);
    }
  },[selectedOption])


  useEffect(() => {
    setLoading(true);
    getAllVehicleTypes(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);

          // Map images to the vehicle types
          const vehicleDataWithImages = successResponse[0]._response.map(
            vehicle => {
              let image;
              let vehicleStyle; // Declare a variable for the vehicle style

              switch (vehicle.vehicle_type) {
                case 'Cycle':
                  image = BicycleImage;
                  vehicleStyle = styles.cycle;
                  break;
                case 'Scooter':
                  image = MotorbikeImage;
                  vehicleStyle = styles.scooter;
                  break;
                case 'Car':
                  image = CarImage;
                  vehicleStyle = styles.car;
                  break;
                case 'Partner':
                  image = PartnerImage;
                  vehicleStyle = styles.partner;
                  break;
                case 'Pickup':
                  image = MiniVanImage;
                  vehicleStyle = styles.pickup;
                  break;
                case 'Van':
                  image = miniTruckImage;
                  vehicleStyle = styles.van;
                  break;
                case 'Truck':
                  image = SemiTruckImage;
                  vehicleStyle = styles.truck;
                  break;
                case 'Other':
                  image = PackageImage;
                  vehicleStyle = styles.package;
                  break;
                default: // Fallback if no image is available
                  console.log(
                    `No image found for vehicle type: ${vehicle.vehicle_type}`,
                  );
                  image = null;
                  vehicleStyle = styles.default; // Assign a default style if needed
              }

              return {...vehicle, image, vehicleStyle}; // Include the image and style in the returned object
            },
          );

          setVehicleTypeList(vehicleDataWithImages); // Update the state with the new list
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );

    getLookupData(
      null,
      successResponse => {
        console.log('successResponse  ew ====>',JSON.stringify(successResponse[0]._response))

        saveLookupData(successResponse[0]._response);
      },
      errorResponse => {
        console.log('getLookup==>errorResponse', '' + errorResponse[0]);
      },
    );

  }, []);


  const disableVehicleType = ()=>{
    return serviceTypeId !== 1 && serviceTypeId !== 2 ? true : false
  }

  const disableServiceType =()=>{
   return route.params.delivery_type_id !== 3
  }

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.selectServiceTitle}>Select service type</Text>

          {
            lookupData?.enterpriseServiceType?.length > 0 ?
            lookupData?.enterpriseServiceType.map((serviceType)=>{
              return(
                <TouchableOpacity
                  style={[
                    styles.selectDeliveryboyTypeCard,
                    selectedOption === serviceType.id && {},
                  ]}
                  onPress={() =>
                    handleOptionSelect(
                      serviceType.id === 1 ?  vehicleTypeList.filter(val => val.vehicle_type == 'Scooter')[0] : '',
                      serviceType
                    )
                  }>
                  {selectedOption === serviceType.id ? (
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
                      selectedOption === serviceType.id && {
                        fontFamily: 'Montserrat-Bold',
                      },
                    ]}>
                    {serviceType.service_type}
                  </Text>
                </TouchableOpacity>
                )
              })
              :null
          }

          {/* <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Delivery boy with scooter' && {},
            ]}
            onPress={() =>
              handleOptionSelect(
                'Delivery boy with scooter',
                vehicleTypeList.filter(val => val.vehicle_type == 'Scooter')[0],
                1,
              )
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
              Delivery boy with vehicle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableServiceType()}
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Delivery boy without scooter',
            ]}
            onPress={() =>
              handleOptionSelect('Delivery boy without scooter', '', 2)
            }>
            {selectedOption === 'Delivery boy without scooter' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={ disableServiceType() ? colors.lightGrey : colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Delivery boy without scooter' && {
                  fontFamily: 'Montserrat-Bold',
                },
                disableServiceType() ? {color:colors.lightGrey}:{}
              ]}>
              Delivery boy without vehicle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableServiceType()}
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Multi-task employee',
            ]}
            onPress={() => handleOptionSelect('Multi-task employee', '', 3)}>
            {selectedOption === 'Multi-task employee' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={disableServiceType() ? colors.lightGrey :colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Multi-task employee' && {
                  fontFamily: 'Montserrat-Bold',
                },
                disableServiceType() ? {color:colors.lightGrey}:{}
              ]}>
              Multi-task employee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disableServiceType()}
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Cleaning staff',
            ]}
            onPress={() => handleOptionSelect('Cleaning staff', '', 4)}>
            {selectedOption === 'Cleaning staff' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={disableServiceType() ? colors.lightGrey : colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Cleaning staff' && {
                  fontFamily: 'Montserrat-Bold',
                },
                disableServiceType() ? {color:colors.lightGrey}:{}
              ]}>
              Cleaning staff
            </Text>
          </TouchableOpacity> */}

          <View style={styles.vehicleTypePrice}>
            <Text style={styles.selectServiceTitle}>Select vehicle type</Text>
            {/* <Text style={styles.selectedVehiclePrice}>
              {selectedVehiclePrice && selectedVehiclePrice.toFixed(2)}
            </Text> */}
          </View>
        </View>

        {vehicleTypeList.map((vehicle, index) => (
          <TouchableOpacity
            disabled={disableVehicleType()}
            key={index}
            onPress={() => {
              setTimeout(()=>{
                setSelectedVehicle(vehicle);
                route.params.delivery_type_id == 3 ?  
                serviceTypeId === 1 ? setSelectedVehiclePrice(vehicle.enterprise_wv_amount) :
                setSelectedVehiclePrice(vehicle.enterprise_wov_amount):  setSelectedVehiclePrice(vehicle.km_price);
              },500)
            }}
            style={[
              styles.addressCard,
              vehicle.vehicle_type === selectedVehicle.vehicle_type
                ? styles.selectedCard
                : null,

                vehicle.vehicle_type === selectedVehicle.vehicle_type ? {borderColor:colors.secondary} : null
            ]}>
            <TouchableOpacity
              disabled={disableVehicleType()}
              onPress={() => toggleModal(vehicle)}
              style={styles.infoIcons}>
              <Image source={require('../../image/info.png')} />
            </TouchableOpacity>
            <View style={styles.vihicleCards}>
              <FontAwesome
                name={
                  vehicle.vehicle_type === selectedVehicle.vehicle_type
                    ? 'dot-circle-o'
                    : 'circle-thin'
                }
                size={25}
                color={
                  disableVehicleType() ? colors.lightGrey :
                  vehicle.vehicle_type === selectedVehicle.vehicle_type
                    ? colors.secondary
                    : colors.text
                }
              />
              <View style={{flexDirection:"row"}}>
              <Text style={[styles.paymentPlateform,disableVehicleType()?{color:colors.lightGrey}:'']}>
                {vehicle.vehicle_type}
              </Text>

              {vehicle.vehicle_type === selectedVehicle.vehicle_type && <View style={styles.chargeBatch} ><Text style={styles.chargeBatchTextStyle}>{`€ ${selectedVehiclePrice.toFixed(2)}/${route.params.delivery_type_id == 3 ? 'hrs':'km'}`}</Text></View>}
              </View>
            </View>
            <Image style={[vehicle.vehicleStyle,disableVehicleType() ?{tintColor:colors.lightGrey}:[]]}  source={vehicle.image} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            if (route.params.delivery_type_id == 3) {
              navigation.navigate('EnterpriseShiftDeliverySchedule', {
                ...route.params,
                vehicle_type: selectedVehicle,
                service_type_id: serviceTypeId,
                amount:selectedVehiclePrice
              });
            } else {
              navigation.navigate('EnterpiseScheduleNewDetailsFill', {
                ...route.params,
                vehicle_type: selectedVehicle,
                service_type_id: serviceTypeId,
              });
            }
          }}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <EnterpriseVehcleDimensions
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        vehicleDetails={vehicleDetails}
      />
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
    paddingLeft: 15,
    paddingRight: 25,
    height: 60,
    borderWidth: 1,
    borderColor: '#35353533',
    borderRadius: 10,
    marginVertical: 5,
    position: 'relative',
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
  },
  cycle: {
    width: 32,
    height: 34,
  },
  scooter: {
    width: 32,
    height: 34,
  },
  car: {
    width: 41,
    height: 17,
  },
  partner: {
    width: 67,
    height: 27,
  },
  van: {
    width: 48,
    height: 22,
  },
  pickup: {
    width: 42,
    height: 30,
  },
  truck: {
    width: 56,
    height: 26,
  },
  package: {
    width: 32,
    height: 32,
  },
  vehicleTypePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedVehiclePrice: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  infoIcons: {
    position: 'absolute',
    top: -10,
    right: -11,
    padding: 10,
  },
  // vehicleImages: {
  //   height: 62,
  //   resizeMode: 'center'
  // },
  chargeBatch:{
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:'#FBE9EA',
    paddingHorizontal:8
  },
  chargeBatchTextStyle:{
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  }

});

export default EnterpiseSelectDeliveryTypes;
