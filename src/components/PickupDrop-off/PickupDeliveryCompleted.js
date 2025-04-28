import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {localizationText} from '../../utils/common';

const {height: screenHeight} = Dimensions.get('window');

const PickupDeliveryCompleted = ({navigation}) => {
  const [deliveryBoyRating, setDeliveryBoyRating] = useState(0);
  const [overallExperienceRating, setOverallExperienceRating] = useState(0);

  // Function to handle rating selection for delivery boy
  const handleDeliveryBoyRating = rating => {
    setDeliveryBoyRating(rating);
  };

  // Function to handle rating selection for overall experience
  const handleOverallExperienceRating = rating => {
    setOverallExperienceRating(rating);
  };

  const downloadInvoiceFile = () => {};

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <View>
        <View>
          <Text style={styles.mainTitle}>
            {localizationText('Common', 'deliveryComplete')}
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.oderIdText}>
              {localizationText('Common', 'deliveryCompleteDescription')}
            </Text>
          </View>
        </View>
        <ImageBackground
          style={{flex: 1, height: screenHeight}}
          source={require('../../image/DeliveryRequest-bg.png')}>
          <View style={styles.boxCard}>
            <Image source={require('../../image/Package-BOxChecked.png')} />
            <Image
              style={styles.cloud1}
              source={require('../../image/Cloud-Graphic.png')}
            />
            <Image
              style={styles.cloud2}
              source={require('../../image/Cloud-Graphic.png')}
            />
          </View>
          <View style={{paddingTop: '10%', paddingHorizontal: 20}}>
            <View style={styles.devileryMap}>
              <Text style={styles.deliveryboyRate}>
                {localizationText('Common', 'rateDeliveryboyTitle')}
              </Text>
              <View style={styles.mainRatingCard}>
                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleDeliveryBoyRating(1)}>
                  <AntDesign
                    style={{marginLeft: 10}}
                    name={deliveryBoyRating >= 1 ? 'star' : 'staro'}
                    size={28}
                    color={
                      deliveryBoyRating >= 1 ? colors.primary : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'veryPoor')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleDeliveryBoyRating(2)}>
                  <AntDesign
                    name={deliveryBoyRating >= 2 ? 'star' : 'staro'}
                    size={28}
                    color={
                      deliveryBoyRating >= 2 ? colors.primary : colors.text
                    }
                  />
                  <Text style={[styles.ratingByCat, {marginLeft: 3}]}>
                    {localizationText('Common', 'poor')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleDeliveryBoyRating(3)}>
                  <AntDesign
                    style={{marginLeft: 6}}
                    name={deliveryBoyRating >= 3 ? 'star' : 'staro'}
                    size={28}
                    color={
                      deliveryBoyRating >= 3 ? colors.primary : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'average')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleDeliveryBoyRating(4)}>
                  <AntDesign
                    name={deliveryBoyRating >= 4 ? 'star' : 'staro'}
                    size={28}
                    color={
                      deliveryBoyRating >= 4 ? colors.primary : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'good')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleDeliveryBoyRating(5)}>
                  <AntDesign
                    style={{marginLeft: 7}}
                    name={deliveryBoyRating >= 5 ? 'star' : 'staro'}
                    size={28}
                    color={
                      deliveryBoyRating >= 5 ? colors.primary : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'excellent')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.devileryMap}>
              <Text style={styles.deliveryboyRate}>
                {localizationText('Common', 'consumerExperienceRateTitle')}
              </Text>
              <View style={styles.mainRatingCard}>
                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleOverallExperienceRating(1)}>
                  <AntDesign
                    style={{marginLeft: 10}}
                    name={overallExperienceRating >= 1 ? 'star' : 'staro'}
                    size={28}
                    color={
                      overallExperienceRating >= 1
                        ? colors.primary
                        : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'veryPoor')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleOverallExperienceRating(2)}>
                  <AntDesign
                    name={overallExperienceRating >= 2 ? 'star' : 'staro'}
                    size={28}
                    color={
                      overallExperienceRating >= 2
                        ? colors.primary
                        : colors.text
                    }
                  />
                  <Text style={[styles.ratingByCat, {marginLeft: 3}]}>
                    {localizationText('Common', 'poor')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleOverallExperienceRating(3)}>
                  <AntDesign
                    style={{marginLeft: 6}}
                    name={overallExperienceRating >= 3 ? 'star' : 'staro'}
                    size={28}
                    color={
                      overallExperienceRating >= 3
                        ? colors.primary
                        : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'average')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleOverallExperienceRating(4)}>
                  <AntDesign
                    name={overallExperienceRating >= 4 ? 'star' : 'staro'}
                    size={28}
                    color={
                      overallExperienceRating >= 4
                        ? colors.primary
                        : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'good')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ratingCard}
                  onPress={() => handleOverallExperienceRating(5)}>
                  <AntDesign
                    style={{marginLeft: 7}}
                    name={overallExperienceRating >= 5 ? 'star' : 'staro'}
                    size={28}
                    color={
                      overallExperienceRating >= 5
                        ? colors.primary
                        : colors.text
                    }
                  />
                  <Text style={styles.ratingByCat}>
                    {localizationText('Common', 'excellent')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.mainBtnCard}>
              <TouchableOpacity style={styles.remindlaterBtn}>
                <Text style={styles.trackText}>
                  {localizationText('Common', 'remindLater')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('PickupFeedbackThanks')}
                style={styles.trackOrderBtn}>
                <Text style={styles.trackText}>
                  {localizationText('Common', 'submit')}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.invoiceDownload}
                onPress={downloadInvoiceFile}>
                <AntDesign name="download" size={15} color={colors.text} />
                <Text style={[styles.trackText, {marginLeft: 5}]}>
                  {localizationText('Common', 'downloadInvoice')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  text: {
    marginRight: 5,
    color: colors.text,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  copyIcon: {
    marginLeft: 5,
  },
  copiedMessage: {
    textAlign: 'center',
    color: colors.text,
    marginTop: 5,
  },
  oderIdText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  devileryMap: {
    borderRadius: 5,
    backgroundColor: colors.white,
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
    padding: 15,
  },
  Delivering: {
    flex: 1,
    padding: 15,
  },
  DeliveringText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  subAddress: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: colors.white,
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
  truckName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  driverName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  trackOrderBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%',
  },
  trackText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  boxCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    position: 'relative',
  },
  cloud1: {
    position: 'absolute',
    left: '5%',
    top: '20%',
  },
  cloud2: {
    position: 'absolute',
    right: '5%',
    top: '50%',
  },
  deliveryboyRate: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  ratingByCat: {
    fontSize: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  mainRatingCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  remindlaterBtn: {
    borderWidth: 1,
    borderColor: colors.text,
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%',
  },
  mainBtnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  invoiceDownload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.text,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 140,
  },
});

export default PickupDeliveryCompleted;
