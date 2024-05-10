import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ExStyles from '../style'

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={{marginBottom: 10, marginTop: 10}}>
        <Button
          title="Go to Login Page"
          onPress={() => navigation.navigate('LogInScreen')}
        />
      </Text>
      <Button
        title="Go to Pickup Vehicle Page"
        onPress={() => navigation.navigate('Pickup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
