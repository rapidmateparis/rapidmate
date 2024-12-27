import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '../../colors';
import MapDeliveryDetails from '../commonComponent/MapDeliveryDetails';
import DeliveryboyPackagePreviewModal from '../commonComponent/DeliveryboyPackagePreviewModal';
import DeliveryboySubmitOTPModal from '../commonComponent/DeliveryboySubmitOTPModal';

const DeliveryDetailsMultipleOrder = ({navigation}) => {
  const [delivered, setDelivered] = useState(false);

  const handleMarkAsDelivered = () => {
    setDelivered(true);
  };

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };
  const toggleModalOTP = () => {
    setOTPModalVisible(!isOTPModalVisible);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.packageCard}>
          <View style={{width: '10%'}}>
            <Image
              style={styles.packageManager}
              source={require('../../image/Pickup-Package-Icon.png')}
            />
          </View>
          <View style={{marginLeft: 5, width: '89%'}}>
            <View style={styles.pickupCardHeader}>
              <Text style={styles.dropInfo}>Pickup information</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DeliveryDetailsMultipleInvoice')
                }>
                <Image source={require('../../image/Track-Icon.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.companyInfosmain}>
              <View style={{width: '65%'}}>
                <Text style={styles.companyInfo}>Company Name</Text>
                <Text style={styles.dropInfo}>
                  22 Rue de la Liberté, Paris, Île-de-France.
                </Text>
              </View>
              <View style={styles.contactInfoIcons}>
                <TouchableOpacity style={{marginRight: 10}}>
                  <Image source={require('../../image/chat-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../image/call-icon.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.borderShowOff} />

            <View>
              <Text style={styles.headingOTP}>Pickup notes</Text>
              <Text style={styles.dropInfo}>
                Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
                sed.
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.packageCard}>
            <View style={{width: '10%'}}>
              <Image
                style={styles.packageManager}
                source={require('../../image/package-img.png')}
              />
            </View>
            <View style={{marginLeft: 5, width: '89%'}}>
              <View style={styles.pickupCardHeader}>
                <Text style={styles.dropInfo}>Drop off 1 information</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeliveryDetailsMultipleInvoice')
                  }>
                  <Image source={require('../../image/Track-Icon.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.companyInfosmain}>
                <View style={{width: '65%'}}>
                  <Text style={styles.companyInfo}>Company Name</Text>
                  <Text style={styles.dropInfo}>
                    22 Rue de la Liberté, Paris, Île-de-France.
                  </Text>
                </View>
                <View style={styles.contactInfoIcons}>
                  <TouchableOpacity style={{marginRight: 10}}>
                    <Image source={require('../../image/chat-icon.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../../image/call-icon.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.borderShowOff} />

              <View style={styles.packageBasicInfo}>
                <Text style={styles.headingOTP}>Vehicle:</Text>
                <Text style={styles.subheadingOTP}>Pickup Truck</Text>
              </View>

              <View style={styles.borderShowOff} />

              <View style={styles.packageBasicInfo}>
                <Text style={styles.headingOTP}>Package photo</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    style={styles.packagePhoto}
                    source={require('../../image/PackagePhoto.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.borderShowOff} />

              <View>
                <Text style={styles.headingOTP}>Pickup notes</Text>
                <Text style={styles.dropInfo}>
                  Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
                  sed.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deliveryStatusCard}>
            <View style={styles.deliveryinfo}>
              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Going to Pickupd</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Reached</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <Octicons
                  name={delivered ? 'check' : 'dot-fill'}
                  size={15}
                  color={delivered ? '#FF0058' : '#D9D9D9'}
                />
                <Text style={styles.statusInfo}>Delivered</Text>
              </View>
            </View>
            <View style={styles.earningCard}>
              {delivered && (
                <Text style={styles.boyEarning}>
                  This order is closed, you earned{' '}
                  <Text style={styles.earnedMoney}>€34</Text>
                </Text>
              )}
            </View>
            {!delivered && (
              <TouchableOpacity
                // onPress={handleMarkAsDelivered}
                onPress={() => toggleModalOTP()}
                style={[styles.logbutton, {backgroundColor: colors.primary}]}>
                <Text style={styles.buttonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          <View style={styles.packageCard}>
            <View style={{width: '10%'}}>
              <Image
                style={styles.packageManager}
                source={require('../../image/package-img.png')}
              />
            </View>
            <View style={{marginLeft: 5, width: '89%'}}>
              <View style={styles.pickupCardHeader}>
                <Text style={styles.dropInfo}>Drop off 2 information</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeliveryDetailsMultipleInvoice')
                  }>
                  <Image source={require('../../image/Track-Icon.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.companyInfosmain}>
                <View style={{width: '65%'}}>
                  <Text style={styles.companyInfo}>Company Name</Text>
                  <Text style={styles.dropInfo}>
                    22 Rue de la Liberté, Paris, Île-de-France.
                  </Text>
                </View>
                <View style={styles.contactInfoIcons}>
                  <TouchableOpacity style={{marginRight: 10}}>
                    <Image source={require('../../image/chat-icon.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../../image/call-icon.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.borderShowOff} />

              <View style={styles.packageBasicInfo}>
                <Text style={styles.headingOTP}>Vehicle:</Text>
                <Text style={styles.subheadingOTP}>Pickup Truck</Text>
              </View>
              
              <View style={styles.borderShowOff} />

              <View style={styles.packageBasicInfo}>
                <Text style={styles.headingOTP}>Package photo</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    style={styles.packagePhoto}
                    source={require('../../image/PackagePhoto.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.borderShowOff} />

              <View>
                <Text style={styles.headingOTP}>Pickup notes</Text>
                <Text style={styles.dropInfo}>
                  Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc platea
                  sed.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deliveryStatusCard}>
            <View style={styles.deliveryinfo}>
              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Going to Pickupd</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <AntDesign name="check" size={15} color={'#FF0058'} />
                <Text style={styles.statusInfo}>Reached</Text>
              </View>
              <View style={styles.borderStyle} />

              <View style={styles.statusAboutDelivery}>
                <Octicons
                  name={delivered ? 'check' : 'dot-fill'}
                  size={15}
                  color={delivered ? '#FF0058' : '#D9D9D9'}
                />
                <Text style={styles.statusInfo}>Delivered</Text>
              </View>
            </View>
            <View style={styles.earningCard}>
              {delivered && (
                <Text style={styles.boyEarning}>
                  This order is closed, you earned{' '}
                  <Text style={styles.earnedMoney}>€34</Text>
                </Text>
              )}
            </View>
            {!delivered && (
              <TouchableOpacity
                // onPress={handleMarkAsDelivered}
                onPress={() => toggleModalOTP()}
                style={[styles.logbutton, {backgroundColor: colors.primary}]}>
                <Text style={styles.buttonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {/* Modal start here  */}
      <DeliveryboyPackagePreviewModal
        isImageModalVisible={isImageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
      <DeliveryboySubmitOTPModal
        isOTPModalVisible={isOTPModalVisible}
        setOTPModalVisible={setOTPModalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  packageCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 7,
  },
  dropInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#131314',
    marginBottom: 10,
    marginTop: 4,
  },
  companyInfo: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  companyAddress: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
  },
  orderFare: {
    width: '75%',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#131314',
  },
  value: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidWith: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginLeft: 5,
    marginVertical: 5,
  },
  packageInformationCard: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 7,
  },
  packageTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  orderdetails: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 3,
  },
  detailsId: {
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  pickupCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInfoIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyInfosmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderShowOff: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    marginVertical: 10,
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
  subheadingOTP: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  packagePhoto: {
    width: 48,
    height: 48,
    borderRadius: 5,
  },
  vehicleCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 7,
  },
  deliveryStatusCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: 20,
  },
  deliveryinfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingHorizontal: 5,
  },
  statusAboutDelivery: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  logbutton: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  boyEarning: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  earnedMoney: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  packageManager: {
    width: 30,
    height: 30,
  },
});

export default DeliveryDetailsMultipleOrder;
