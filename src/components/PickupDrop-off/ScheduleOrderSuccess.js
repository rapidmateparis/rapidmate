import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
} from 'react-native';
import {colors} from '../../colors';

const ScheduleOrderSuccess = ({navigation,route}) => {
  const params = route.params;

  useEffect(() => {
    const onBackPress = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FBFAF5'}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
          marginVertical: 30,
        }}>
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../image/payment_success.png')}
          />
          <Text style={styles.text}>Schedule Order Successful!</Text>
          <Text style={styles.subText}>
            {`Delivery boy will be allocated on ${params.schedule_date_time} ...`}
          </Text>
        </View>
      </View>
      <View style={styles.actionBtnCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.goHomeBtn}>
          <Text style={styles.buttonText}>Go To Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  cancelRequest: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  requestTouch: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  logbutton: {
    width: '40%',
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
  actionBtnCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  goHomeBtn: {
    width: '60%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.text,
  },
});

export default ScheduleOrderSuccess;
