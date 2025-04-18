import { StyleSheet } from 'react-native';

const WeatherScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfaf5',
  },
  weatherSection: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fffdf7',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a4a4a',
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
  },
  outfit: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '600',
    color: 'teal',
  },
  outfitList: {
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default WeatherScreenStyles;
