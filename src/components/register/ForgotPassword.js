import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {useForgotPasswordDetails} from '../commonComponent/StoreContext';
import {resetPasswordApi} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {localizationText} from '../../utils/common';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ForgotPassword = ({navigation}) => {
  const [enableMask, setEnableMask] = useState(true);
  const [enableBtn, setEnableBtn] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const ref1 = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const CELL_COUNT = 6;
  const [handler, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {forgotPasswordDetails, saveForgotPasswordDetails} =
    useForgotPasswordDetails();
  const {setLoading} = useLoader();

  const handleVerifyCode = async () => {
    saveForgotPasswordDetails({...forgotPasswordDetails, code: value});
    navigation.navigate('ResetPassword');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={[styles.title, {color: colors.text}]}>
          {localizationText('Common', 'forgotPassword')}
        </Text>
        <Text style={styles.subtitle}>
          {localizationText('Common', 'forgotPasswordTopDes')}{' '}
          <Text style={{fontWeight: 'bold'}}>
            {forgotPasswordDetails.userName.replace(
              /(\w{3})[\w.-]+@([\w.]+\w)/,
              '$1***@$2',
            )}
          </Text>
          ,{localizationText('Common', 'forgotPasswordBottomDes')}
        </Text>

        <View style={styles.viewOtpEnter}>
          <CodeField
            ref={ref1}
            {...handler}
            // Use caretHidden={false} when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={value1 => {
              if (value1.length == 6) {
                setEnableBtn(true);
                setError('');
              } else {
                if (enableBtn) {
                  setEnableBtn(false);
                }
              }
              setValue(value1);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            secureTextEntry={true}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => {
              let textChild = null;

              if (symbol) {
                textChild = enableMask ? (
                  <Text
                    style={{
                      fontSize: 48,
                      color: 'black',
                    }}>
                    •
                  </Text>
                ) : (
                  symbol
                );
              } else if (isFocused) {
                textChild = <Cursor />;
              }
              return (
                <Text
                  key={index}
                  style={[
                    error ? styles.red_cell : styles.cell,
                    isFocused && styles.focusCell,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                  {/* {textChild} */}
                </Text>
              );
            }}
          />
        </View>

        <View style={styles.inputCardContainer}>
          <TouchableOpacity
            onPress={handleVerifyCode}
            style={[styles.button, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>{localizationText('Common', 'login')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendCodeText}>
            <Text style={styles.codeSet}>{localizationText('Common', 'resendCode')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  inputCardContainer: {
    marginTop: 30,
  },
  resendCodeText: {
    marginTop: 30,
  },
  codeSet: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.primary,
    textAlign: 'center',
    fontSize: 12,
  },
  viewOtpEnter: {
    // flex: 0.6,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 80,
  },
  codeFieldRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cell: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    margin: 5,
    marginTop: 10,
    lineHeight: 35,
    fontSize: 28,
    borderWidth: 1,
    borderColor: '#2C303336',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    marginHorizontal: 5,
    color: '#2E2E2E',
  },
  red_cell: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    margin: 5,
    marginTop: 10,
    lineHeight: 35,
    fontSize: 28,
    borderWidth: 2,
    borderColor: '#FF675E',
    textAlign: 'center',
    borderRadius: 0,
    marginHorizontal: 5,
    color: '#FF675E',
  },
  focusCell: {
    borderColor: '#0075FF',
  },
});

export default ForgotPassword;
