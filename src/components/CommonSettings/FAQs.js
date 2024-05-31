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
import {colors} from '../../colors';

const FAQs = ({navigation}) => {
  const [faqList, setFaqList] = useState([
    {
      question: 'What services does your app provide?',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      question: 'How do I download the app?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare felis ut lobortis condimentum. Curabitur a nisi sed urna interdum semper. Aliquam fringilla orci a quam vehicula, non mattis augue ullamcorper. Praesent accumsan mi ac justo consectetur, a pulvinar ex gravida.',
    },
    {
      question: 'How do I book a ride?',
      answer:
        'Open the app, enter your destination, and select a ride option that suits you. Confirm your pick-up location, and a driver will be on their way to you.',
    },
    {
      question: 'Can I schedule rides in advance?',
      answer:
        'Aenean bibendum, enim non rutrum porttitor, orci tortor rhoncus felis, eget vulputate lectus quam ac urna. Aliquam id nulla vitae velit convallis aliquam id ac justo. Aliquam varius tempor augue non pretium. Nulla egestas lacus at felis tincidunt convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce feugiat rhoncus sapien ac gravida. Morbi molestie fringilla pharetra.',
    },
    {
      question: 'How do I know my driver is trustworthy?',
      answer:
        'Proin fringilla posuere elit a tincidunt. Integer quis aliquam mi. Aenean quis diam vel diam mollis porttitor ac ornare mauris. Maecenas id turpis vel sem consectetur semper ac nec tortor. Nullam venenatis ligula eget risus hendrerit, id scelerisque leo tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
    },
    {
      question: 'What types of deliveries can I request?',
      answer:
        'Quisque id imperdiet nulla. Proin massa dolor, maximus at risus quis, posuere aliquet urna. Nulla sit amet aliquet lacus, at vestibulum risus. Curabitur id felis aliquet, cursus nulla at, luctus erat. Vestibulum mattis dapibus dictum. Cras et arcu maximus libero feugiat blandit. Donec sit amet condimentum dui, gravida scelerisque sapien. Proin tristique odio et quam euismod venenatis. Integer nec nisl euismod, commodo mi ac, tristique ligula.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'Quisque id imperdiet nulla. Proin massa dolor, maximus at risus quis, posuere aliquet urna. Nulla sit amet aliquet lacus, at vestibulum risus. Curabitur id felis aliquet, cursus nulla at, luctus erat. Vestibulum mattis dapibus dictum. Cras et arcu maximus libero feugiat blandit. Donec sit amet condimentum dui, gravida scelerisque sapien. Proin tristique odio et quam euismod venenatis. Integer nec nisl euismod, commodo mi ac, tristique ligula.',
    },
  ]);

  const toggleAnswer = index => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index].showAnswer = !updatedFaqList[index].showAnswer;
    setFaqList(updatedFaqList);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        {faqList.map((faq, index) => (
          <View key={index} style={styles.addressCard}>
            <TouchableOpacity
              onPress={() => toggleAnswer(index)}
              style={styles.bookAddress}>
              <Text style={styles.cardTitle}>{faq.question}</Text>
              <AntDesign
                name={faq.showAnswer ? 'up' : 'down'}
                size={13}
                color="#909090"
              />
            </TouchableOpacity>
            {faq.showAnswer && (
              <Text style={styles.answersText}>{faq.answer}</Text>
            )}
          </View>
        ))}
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
