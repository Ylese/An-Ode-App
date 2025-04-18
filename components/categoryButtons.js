import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  categoryList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
