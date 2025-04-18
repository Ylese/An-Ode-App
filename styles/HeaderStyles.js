import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6', 
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#f4e8d8', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4a3f35', 
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#f0eae2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
});
