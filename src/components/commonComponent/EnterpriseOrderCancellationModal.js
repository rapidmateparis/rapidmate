import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import {colors} from '../../colors';

function EnterpriseOrderCancellationModal({setModalVisible, isModalVisible, submitCancelOrder}) {
  const [selectedReason, setSelectedReason] = useState(null);
  const navigation = useNavigation(); // Initialize navigation using useNavigation hook

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReasonSelect = reason => {
    setSelectedReason(reason);
  };

  const renderReason = cancelItem => {
    const isSelected = selectedReason?.id === cancelItem.id;
    return (
      <TouchableOpacity
        key={cancelItem.id}
        style={[styles.reasonItem, isSelected && styles.selectedReason]}
        onPress={() => handleReasonSelect(cancelItem)}>
        {!isSelected && <View style={styles.circle} />}
        {isSelected && (
          <AntDesign name="checkcircle" size={20} color={colors.primary} />
        )}
        <Text style={styles.CancellationReasonText}>{cancelItem.reason}</Text>
      </TouchableOpacity>
    );
  };

  const handleSubmit = () => {
    if (selectedReason) {
      // Perform any additional operations before navigation, if needed
      toggleModal(); // Optionally close the modal
      navigation.navigate('EnterpriseOrderCancelled'); // Navigate to the EnterpriseOrderCancelled screen
    } else {
      Alert.alert('Selection Required', 'Please select a cancellation reason.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Cancellation reason</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.CancellationReasonCard}>
            {[
              {id: 1, reason: 'Change of plans'},
              {id: 2, reason: 'I want to change delivery time'},
              {id: 3, reason: 'Incorrect address or information'},
              {id: 4, reason: 'Found another person'},
              {id: 5, reason: 'It is taking too long'},
            ].map(reason => renderReason(reason))}
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonCard}>
            <Text style={styles.okButton}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    height: 350,
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
    marginRight: '22%',
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CancellationReasonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginLeft: 10,
    marginVertical: 5,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedReason: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.text,
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    width: 180,
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    textAlign: 'center',
    color: colors.white, // Ensure text is visible on button
  },
  CancellationReasonCard: {
    padding: 20,
  },
});

export default EnterpriseOrderCancellationModal;
