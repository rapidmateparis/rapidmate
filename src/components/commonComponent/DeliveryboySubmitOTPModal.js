import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../colors';
import {TextInput} from 'react-native-gesture-handler';
import { localizationText } from '../../utils/common';

function DeliveryboySubmitOTPModal({
  setOTPModalVisible,
  isOTPModalVisible,
  submitOTP,
}) {
  const [enableMask, setEnableMask] = useState(true);
  const [enableBtn, setEnableBtn] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const ref1 = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const CELL_COUNT = 4;
  const [handler, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleModalOTP = () => {
    setOTPModalVisible(!isOTPModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isOTPModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{localizationText('Common', 'submitOTP')}</Text>
            <TouchableOpacity onPress={toggleModalOTP}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalCard}>
            <View style={styles.lockImageCard}>
              <Image source={require('../../image/OTP-Lock.png')} />
            </View>
            <View style={styles.viewOtpEnter}>
              <CodeField
                ref={ref1}
                {...handler}
                // Use caretHidden={false} when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={value1 => {
                  if (value1.length == 4) {
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
          </View>
          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => {
              submitOTP(value);
            }}>
            <Text style={styles.okButton}>{localizationText('Common', 'submit')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fffaea',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginRight: '30%',
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    width: 180,
    borderRadius: 8,
    backgroundColor: colors.primary,
    color: colors.text,
    paddingVertical: 12,
    textAlign: 'center',
  },
  modalCard: {
    padding: 15,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  viewOtpEnter: {
    // flex: 0.6,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 20,
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
  lockImageCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default DeliveryboySubmitOTPModal;
