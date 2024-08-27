import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {getFaqsList} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {FlatList} from 'react-native-gesture-handler';

const FAQs = ({navigation}) => {
  const [faqList, setFaqList] = useState([]);
  const {setLoading} = useLoader();

  useEffect(() => {
    setLoading(true);
    getFaqsList(
      null,
      successResponse => {
        const response = successResponse[0]._response.map(item => ({
          ...item,
          isExpanded: false,
        }));
        setFaqList(response);
        setLoading(false);
      },
      errorResponse => {
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
        setLoading(false);
      },
    );
  }, []);

  const toggleAnswer = index => {
    const updatedFaqList = faqList.map((item, idx) =>
      idx === index ? {...item, isExpanded: !item.isExpanded} : item,
    );
    setFaqList(updatedFaqList);
  };

  const renderItem = faqItem => (
    <View key={faqItem.item.faq_id} style={styles.addressCard}>
      <TouchableOpacity
        onPress={() => toggleAnswer(faqItem.index)}
        style={styles.bookAddress}>
        <Text style={styles.cardTitle}>{faqItem.item.question}</Text>
        <AntDesign
          name={faqItem.item.isExpanded ? 'up' : 'down'}
          size={13}
          color="#909090"
        />
      </TouchableOpacity>
      {faqItem.item.isExpanded && (
        <Text style={styles.answersText}>{faqItem.item.answer}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <FlatList data={faqList} renderItem={renderItem} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressCard: {
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
    fontFamily: 'Montserrat-SemiBold',
  },
  titleStatus: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
    paddingHorizontal: 10,
  },
  answersText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginTop: 10,
  },
});

export default FAQs;
