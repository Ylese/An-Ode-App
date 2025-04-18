import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6', 
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 40, 
    marginBottom: 100, 
    color: '#4a3f35', 
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#4a3f35', 
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: '#FEE2E2',
  },
  dangerText: {
    color: '#B91C1C',
  },

  settingsText: {
    fontSize: 18,
    color: '#4a3f35',
    marginTop: 20,
  },
});
