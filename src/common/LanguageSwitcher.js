import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import i18n from '../localization/localizationUtils';

const languageOptions = [
  {value: 'fr', label: 'French', flag: 'fr'},
  {value: 'en', label: 'English', flag: 'us'},
];

const LanguageSwitcher = ({lang = 'fr', switcher}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(lang); // Default to 'fr'
  const [items, setItems] = useState(languageOptions);

  const handleChange = value => {
    setValue(value);
    i18n.changeLanguage(value); // Update language in i18next
  };

  useEffect(() => {
    setValue(lang); // Sync with the incoming 'lang' prop
  }, [lang]);

  return (
    <View style={styles.languageDropdown}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={handleChange}
        containerStyle={styles.dropdownContainer}
        style={styles.customSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  languageDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontFamily: 'Montserrat-Medium',
    zIndex: 999,
    paddingVertical: 0,
  },
  dropdownContainer: {
    width: '100%',
  },
  customSelect: {
    height: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontFamily: 'Montserrat-Medium',
  },
});

export default LanguageSwitcher;
