import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6',
    padding: 24,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 24,
    marginTop: 50
  },
  input: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  updateButton: {
    backgroundColor: '#ba9785',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  updateText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  cancelText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});
