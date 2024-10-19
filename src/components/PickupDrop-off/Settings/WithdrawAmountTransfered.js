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

const WithdrawAmountTransfered = ({navigation}) => {
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
          <View style={styles.transferedAmountOnWayCard}>
            <FontAwesome name="send" size={45} color={colors.secondary} />
            <Text style={styles.transferedAmountOnWayText}>
              Your $250.85 is on its way!
            </Text>
          </View>

          <View style={styles.transferedAmountOnWayCard}>
            <Image
              style={styles.bankCardImageLoge}
              source={require('../../../image/BNP-Paribas-Logo.png')}
            />
            <Text style={styles.transferedAmountBankName}>BNP Paribas</Text>
            <Text style={styles.transferedBankAccNumber}>
              Checking **** 1234
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.transferBtnCard}>
          <Text style={styles.transferBtnAmountText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  transferBtnCard: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 120,
    marginBottom: 15,
    borderRadius: 8,
  },
  transferBtnAmountText: {
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  transferedAmountOnWayText: {
    fontSize: 25,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
    textAlign: 'center',
  },
  transferedAmountOnWayCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
    paddingHorizontal: 50,
  },
  bankCardImageLoge: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  transferedAmountBankName: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
    textAlign: 'center',
  },
  transferedBankAccNumber: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});

export default WithdrawAmountTransfered;
