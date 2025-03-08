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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../colors';
import {getDeliveryBoyWallet} from '../../../data_manager';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {useLoader} from '../../../utils/loaderContext';
import {localizationText} from '../../../utils/common';

const DeliveryboyWallet = ({navigation}) => {
  const [walletAmount, setWalletAmount] = useState();
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();

  useEffect(() => {
    setLoading(true);
    getDeliveryBoyWallet(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        setWalletAmount(successResponse[0]._response.balance);
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }, []);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <ImageBackground
          style={styles.walletBgImage}
          source={require('../../../image/wallet-bg.png')}
          borderRadius={15}>
          <View style={{paddingHorizontal: 25, paddingVertical: 15}}>
            <View style={styles.walletHeader}>
              <Text style={styles.companyName}>RapidMate</Text>
              <Image
                source={require('../../../image/rapidmate-wallet-icon.png')}
              />
            </View>
            <View>
              <Text style={styles.dollerSymbol}>{`€ ${
                walletAmount ? walletAmount : ''
              }`}</Text>
              <Text style={styles.walletBalance}>
                {localizationText('Common', 'walletBalance')}
              </Text>
            </View>
            <View style={styles.actionCard}>
              {/* <TouchableOpacity
                style={styles.actionsBt}
                onPress={() => {
                  navigation.navigate('WithdrawPayment');
                }}>
                <Text style={styles.btnText}>
                  {localizationText('NavHeaderTitles', 'withdraw')}
                </Text>
              </TouchableOpacity> */}

              <TouchableOpacity style={styles.actionsBt}>
                <Text style={styles.btnText}>
                  {localizationText('Common', 'addFunds')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.addCardsHeader}>
          <Text style={styles.subCardName}>
            {localizationText('Common', 'cards')}
          </Text>
          <View style={styles.addSection}>
            <TouchableOpacity>
              <AntDesign name="pluscircle" size={25} color="#FF0058" />
            </TouchableOpacity>
            <Text style={styles.addCardText}>
              {localizationText('Common', 'addCard')}
            </Text>
          </View>
        </View>

        <View style={styles.addressCard}>
          <Image source={require('../../../image/paypal-icon.png')} />
          <View style={{marginLeft: 5, flex: 1}}>
            <Text style={styles.paymentPlateform}>PayPal</Text>
            <Text style={styles.mailId}>username@email.com</Text>
          </View>
          <TouchableOpacity>
            <Feather name="edit-2" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <Image source={require('../../../image/logos_mastercard.png')} />
          <View style={{marginLeft: 5, flex: 1}}>
            <Text style={styles.paymentPlateform}>Axis Bank</Text>
            <Text style={styles.mailId}>**** **** **** 1234</Text>
          </View>
          <TouchableOpacity>
            <Feather name="edit-2" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.securePayment}>
          <FontAwesome name="shield" size={15} color="#1D1617" />
          <Text style={styles.paymentInfo}>
            {localizationText('Common', 'yourPaymentSecureText')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  walletBgImage: {
    width: '100%',
    height: 230,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  companyName: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  amount: {
    color: colors.white,
    fontSize: 40,
    fontFamily: 'Montserrat-Bold',
  },
  dollerSymbol: {
    fontSize: 40,
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
  },
  moneyDot: {
    fontSize: 40,
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
  },
  walletBalance: {
    color: colors.white,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
  actionsBt: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  addCardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  addSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCardText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  subCardName: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  mailId: {
    color: '#131314',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  securePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '55%',
  },
  paymentInfo: {
    color: '#1D1617',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
});

export default DeliveryboyWallet;
