import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6',
    paddingTop: 50,
    paddingHorizontal: isTablet ? 40 : 20,
  },

  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: isTablet ? 40 : 32,
    fontWeight: 'bold',
    color: '#222',
  },
  welcomeText: {
    fontSize: isTablet ? 20 : 16,
    color: '#666',
    marginTop: 5,
  },

  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f0eae2',
    padding: isTablet ? 16 : 12,
    borderRadius: 12,
    fontSize: isTablet ? 18 : 16,
    color: '#333',
  },

  toggleCategoryButton: {
    backgroundColor: '#92735f',
    padding: isTablet ? 14 : 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleCategoryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: isTablet ? 18 : 14,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#aa9183',
  },
  categoryButtonText: {
    fontSize: isTablet ? 16 : 14,
    color: '#333',
  },

  sectionHeader: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    marginVertical: 20,
    marginTop: 20,
    color: '#111',
  },

  featuredItem: {
    marginRight: 10,
    alignItems: 'center',
    width: isTablet ? 180 : 130,
  },
  featuredImage: {
    width: isTablet ? 160 : 120,
    height: isTablet ? 200 : 150,
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: '#ccc',
  },
  featuredText: {
    fontSize: isTablet ? 16 : 14,
    textAlign: 'center',
    color: '#444',
  },

  noItemsText: {
    textAlign: 'center',
    fontSize: isTablet ? 18 : 16,
    color: '#999',
    marginTop: 20,
  },

  outfitList: {
    paddingBottom: 100,
  },
  outfitRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
