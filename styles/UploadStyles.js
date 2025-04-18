import { StyleSheet } from 'react-native';

const uploadStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5C4420', 
    textAlign: 'center',
  },
  subheaderText: {
    fontSize: 16,
    color: '#6A4E23',  
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default uploadStyles;
