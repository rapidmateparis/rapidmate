import React, {useState, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';

const DropDownDropdown = ({
  value: defaultValue,
  items,
  onChangeValue,
  searchable,
  openDropDown,
  setOpenDropDown,
  styledropdownBox,
  placeholder,
  disabled,
}) => {
  const [dropDownValue, setDropDownValue] = useState(defaultValue || []);
  const [dropDownItems, setDropDownItems] = useState(items || {});

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      disabled={disabled}
      placeholder={placeholder}
      value={dropDownValue}
      setValue={setDropDownValue}
      open={openDropDown}
      setOpen={setOpenDropDown}
      items={dropDownItems}
      setItems={setDropDownItems}
      onChangeValue={onChangeValue}
      searchable={searchable}
      containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
      style={[styles.styledropdownBox, styles.dropdownLayout]}
    />
  );
};
const styles = StyleSheet.create({
//   borderNoneChange: {
//     borderWidth: 0,
//   },
  dropdownLayout: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 0,
    borderRightWidth:1,
    borderColor:"#ccc",
    zIndex:1,
  },
});

export default DropDownDropdown;
