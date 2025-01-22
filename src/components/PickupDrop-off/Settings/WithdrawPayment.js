import React, {useEffect, useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../colors';
import {localizationText} from '../../../utils/common';

const WithdrawPayment = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null); // New state for selected card
  const [bankCards, setBankCards] = useState([
    {
      id: 1,
      bankName: 'BNP Paribas',
      accountType: 'Checking **** 1234',
      logo: require('../../../image/BNP-Paribas-Logo.png'),
    },
    {
      id: 2,
      bankName: 'Societe Generale',
      accountType: 'Checking **** 5678',
      logo: require('../../../image/Societe-Generale-Logo.png'),
    },
  ]);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.admountWithdrawTitle}>
            {localizationText('Common', 'enterAmountWithdraw')}
          </Text>
          <View style={styles.withdrawAmountCard}>
            <TextInput
              style={styles.loginput}
              placeholder="Amount"
              placeholderTextColor="#999"
              value={amount}
              onChangeText={text => setAmount(text)}
            />
            <Text style={styles.euroSymbolText}>€</Text>
          </View>

          <View>
            <Text style={styles.availableBalanceText}>
              {localizationText('Common', 'availableBalance')}:{' '}
              <Text style={styles.availableBalanceAmount}>€250.85</Text>
            </Text>
          </View>
        </View>

        <View style={styles.addCardsHeader}>
          <Text style={styles.subCardName}>
            {localizationText('Common', 'selectBank')}
          </Text>
          <View style={styles.addSection}>
            <TouchableOpacity>
              <AntDesign name="pluscircle" size={25} color="#FF0058" />
            </TouchableOpacity>
            <Text style={styles.addCardText}>
              {localizationText('Common', 'addBank')}
            </Text>
          </View>
        </View>

        {/* Render bank cards dynamically */}
        {bankCards.map(card => (
          <TouchableOpacity
            key={card.id}
            style={styles.addressCard}
            onPress={() => setSelectedCardId(card.id)} // Set selected card ID when pressed
          >
            <Image style={styles.addedWithdrawBankLogo} source={card.logo} />
            <View style={{marginLeft: 5, flex: 1}}>
              <Text style={styles.paymentPlateform}>{card.bankName}</Text>
              <Text style={styles.mailId}>{card.accountType}</Text>
            </View>
            <View style={styles.selectBankAccCard}>
              {selectedCardId === card.id ? (
                <Feather name="check-circle" size={30} color={colors.primary} />
              ) : (
                <Feather name="circle" size={30} color="#ddd" />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.securePayment}>
          <Feather name="send" size={25} color="#666" />
          <Text style={styles.paymentInfo}>
            {localizationText('Common', 'withdrawAmountTransferDes')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.transferBtnCard}
          onPress={() => {
            navigation.navigate('WithdrawAmountTransfered');
          }}>
          <Text style={styles.transferBtnAmountText}>
            {localizationText('Common', 'transfer')} (<Text>€250.85</Text>)
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 60,
    marginTop: '55%',
  },
  paymentInfo: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },

  admountWithdrawTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginTop: 5,
  },
  loginput: {
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    width: '80%',
  },
  euroSymbolText: {
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.subText,
  },
  withdrawAmountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: '#ddd',
  },
  availableBalanceText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginVertical: 5,
  },
  availableBalanceAmount: {
    color: colors.Completed,
    fontFamily: 'Montserrat-SemiBold',
  },
  addedWithdrawBankLogo: {
    width: 44,
    height: 44,
  },
  selectBankAccCard: {
    marginLeft: 'auto',
  },
  transferBtnCard: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
  transferBtnAmountText: {
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
});

export default WithdrawPayment;
