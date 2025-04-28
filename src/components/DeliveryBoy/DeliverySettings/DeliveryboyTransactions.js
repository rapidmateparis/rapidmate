import React, {useEffect, useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dropdown} from 'react-native-element-dropdown';
import {getDeliveryBoyTransactions} from '../../../data_manager';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {useLoader} from '../../../utils/loaderContext';
import {localizationText, utcLocal} from '../../../utils/common';

function DeliveryboyTransactions() {
  const [searchText, setSearchText] = useState('');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {userDetails} = useUserDetails();
  const [transactionList, setTransactionList] = useState([]);
  const [walletBalance, setWalletBalance] = useState();
  const [activeOption, setActiveOption] = useState('');
  const {setLoading} = useLoader();
  const orderID = localizationText('Common', 'orderID') || 'Order Id';
  const from = localizationText('Common', 'from') || 'From';

  const handleOptionClick = option => {
    setActiveOption(option);
  };

  useEffect(() => {
    setLoading(true);
    let params = {
      extId: userDetails.userDetails[0].ext_id,
      durationType: activeOption.toLowerCase().replace('this', '').trim(),
    };
    getDeliveryBoyTransactions(
      params,
      successResponse => {
        setLoading(false);
        setTransactionList(successResponse[0]._response.transactions);
        setWalletBalance(successResponse[0]._response.balance);
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }, [activeOption]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      let params = {
        extId: userDetails.userDetails[0].ext_id,
        searchText: searchText,
      };
      getDeliveryBoyTransactions(
        params,
        successResponse => {
          setLoading(false);
          setTransactionList(successResponse[0]._response.transactions);
          setWalletBalance(successResponse[0]._response.balance);
        },
        errorResponse => {
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }, 1000);
  }, [searchText]);

  const renderTransactionItem = transactionItem => (
    <View style={styles.transactioneDetailCard}>
      <Image source={require('../../../image/Wallet-Icon1x.png')} />
      <View style={styles.transactioneMainCard}>
        <View>
          <Text style={styles.transactioneDate}>
            {moment(transactionItem.item.order_date).format(
              'YYYY-MM-DD',
            )}
          </Text>
          <Text style={styles.transactioneFrom}>
            {orderID}{' '}
            <Text style={styles.transactioneAddress}>
              {transactionItem.item.order_number}
            </Text>
          </Text>
          {/* <Text style={styles.transactioneFrom}>
            {from}{' '}
            <Text style={styles.transactioneAddress}>North Street, ABC</Text>
          </Text> */}
        </View>
        <View>
          <Text style={styles.moneyEarn}>€{transactionItem.item.amount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 15,
          marginBottom: 10,
        }}>
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#000"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchinput}
            placeholderTextColor="#999"
            placeholder={localizationText('Common', 'searchYourTransactions')}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View>
          <Text style={styles.rupeesMain}>
            € {walletBalance ? walletBalance : ''}
          </Text>
          <Text style={styles.earningTodays}>{localizationText('Common', 'todayEarning')}</Text>
        </View>

        <View style={styles.dayWiseCard}>
          <TouchableOpacity onPress={() => handleOptionClick('Today')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'Today' && styles.activeDay,
              ]}>
              {localizationText('Common', 'today')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionClick('This week')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'This week' && styles.activeDay,
              ]}>
              {localizationText('Common', 'thisWeek')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionClick('This month')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'This month' && styles.activeDay,
              ]}>
              {localizationText('Common', 'thisMonth')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionClick('This year')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'This year' && styles.activeDay,
              ]}>
              {localizationText('Common', 'thisYear')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <FlatList data={transactionList} renderItem={renderTransactionItem} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchinput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  transactioneDetailCard: {
    flexDirection: 'row',
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
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  fromLocation: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 15,
  },
  Location: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  borderShow: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    width: '100%',
    marginVertical: 15,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  valueMoney: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  listText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dayOption: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    backgroundColor: '#fbe8ea',
    padding: 10,
    borderRadius: 20,
  },
  activeDay: {
    color: colors.white,
    backgroundColor: colors.secondary,
  },
  dayWiseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  containerCity: {
    width: '20%',
  },
  transactioneMainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: 10,
  },
  transactioneDate: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  transactioneFrom: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  transactioneAddress: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  moneyEarn: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  rupeesMain: {
    fontSize: 40,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  rupeesBold: {
    fontSize: 40,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  earningTodays: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  placeholderStyle: {
    color: '#999',
    fontSize: 12,
  },
  selectedTextStyle: {
    color: '#999',
    fontSize: 12,
  },
  inputSearchStyle: {
    color: '#999',
    fontSize: 12,
  },
  itemtextStyle: {
    color: colors.text,
    fontSize: 12,
  },
});

export default DeliveryboyTransactions;
