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

const PaymentSuccess = ({navigation,route}) => {

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


  useEffect(()=>{
    setTimeout(() =>{
      reDirectToNextPage()
    }, 2000);
  },[])

  const reDirectToNextPage=()=>{
    if(params.serviceTypeId === 1){
      navigation.navigate('ScheduleOrderSuccess',{
        schedule_date_time: params.schedule_date_time,
        serviceTypeId:params.serviceTypeId
      })
    }else{
      navigation.navigate('LoaderForDriver')
    }
  }

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FBFAF5'}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
        }}>
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../image/payment_success.png')}
          />
          <Text style={styles.text}>Payment Successful!</Text>
          <Text style={styles.subText}>
            Your payment was successful, let’s look for a delivery boy now...
          </Text>
        </View>
      </View>
      {/* <View style={styles.actionBtnCard}>
        <TouchableOpacity
          onPress={() =>{ 
            if(params.serviceTypeId === 1){
              navigation.navigate('ScheduleOrderSuccess',{
                schedule_date_time: params.schedule_date_time,
                serviceTypeId:params.serviceTypeId
              })
            }else{
              navigation.navigate('LoaderForDriver')
            }
            }}
          style={styles.goHomeBtn}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View> */}
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

export default PaymentSuccess;
