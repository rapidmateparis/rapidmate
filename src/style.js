import {StyleSheet} from 'react-native';

const ExStyles = StyleSheet.create({
  vehiclesChoose: {
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  vehicleMainTitle: {
    fontSize: 30,
    color: '#000',
  },
  vehicleitemList: {
    marginVertical: 20,
  },
  vehicleitem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 40,
    width: '100%',
  },
  vehicleimage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  vehicleTypeCost: {
    fontSize: 23,
    fontWeight: '700',
    color: '#000',
  },
  vehicleValider: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  vehicleValiderCost: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  validerButton: {
    width: '100%',
    backgroundColor: '#603FEF',
    borderRadius: 20,
    padding: 8,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupinput: {
    fontSize: 20,
    borderRadius: 25,
    marginBottom: 25,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FDD349',
    color: '#000',
  },
  signupbutton: {
    width: '100%',
    backgroundColor: '#FE0058',
    marginTop: 20,
    borderRadius: 23,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
});

export default ExStyles;
