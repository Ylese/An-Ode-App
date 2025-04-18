import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,FlatList,TouchableOpacity,Alert,Image,Dimensions} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import styles from '../styles/HomeScreenStyles';
import OutfitCard from '../components/OutfitCard';
import useOrientation from '../components/useOrientation';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clothes, setClothes] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const isLandscape = useOrientation();

  const screen = Dimensions.get('window');
  const isTablet = screen.width >= 768;
  const isLargeScreen = screen.width >= 1024;

  const numColumns = isLargeScreen ? 4 : isTablet ? 3 : isLandscape ? 3 : 2;

  const filterCategories = {
    Season: ['Spring', 'Summer', 'Autumn', 'Winter'],
    Activity: ['Gym', 'Date', 'Business', 'Casual', 'Party'],
    Type: ['Top', 'Bottom', 'Shoes', 'Accessory'],
  };

  const fetchClothes = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Not signed in', 'Please sign in to view your wardrobe.');
      return;
    }

    try {
      const clothesRef = collection(db, 'outfits');
      const q = query(clothesRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (filterType && selectedFilter) {
        data = data.filter(
          (item) =>
            item[filterType.toLowerCase()] &&
            item[filterType.toLowerCase()].toLowerCase() === selectedFilter.toLowerCase()
        );
      }

      if (searchQuery) {
        data = data.filter(
          (item) =>
            item.name &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setClothes(data);
    } catch (err) {
      console.error('Error fetching clothes:', err);
      Alert.alert('Error', 'There was an issue fetching your wardrobe.');
    }
  };

  useEffect(() => {
    fetchClothes();
  }, [searchQuery, selectedFilter, filterType]);

  return (
    <View
      style={[styles.container, { flexDirection: isLandscape ? 'row' : 'column' }]}
    >
      <View style={[styles.header, { padding: isLandscape ? 10 : 20 }]}>
        <Text style={styles.headerText}>An ODE</Text>
        <Text style={styles.welcomeText}>
          Welcome, {getAuth().currentUser?.displayName || 'User'}
        </Text>
      </View>

      <View style={[styles.searchContainer, { marginVertical: 10 }]}>
        <TextInput
          placeholder="Search your wardrobe..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <TouchableOpacity
        style={styles.toggleCategoryButton}
        onPress={() => setShowCategories(!showCategories)}
      >
        <Text style={styles.toggleCategoryText}>
          {showCategories ? 'Hide Filters ▲' : 'Show Filters ▼'}
        </Text>
      </TouchableOpacity>

      {showCategories && (
        <View style={styles.categoryContainer}>
          {Object.keys(filterCategories).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.categoryButton,
                filterType === type ? styles.selectedCategoryButton : null,
              ]}
              onPress={() => {
                setFilterType(type);
                setSelectedFilter('');
                setFilterOptions(filterCategories[type]);
              }}
            >
              <Text style={styles.categoryButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showCategories && filterType !== '' && (
        <View style={styles.categoryContainer}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.categoryButton,
                selectedFilter === option ? styles.selectedCategoryButton : null,
              ]}
              onPress={() => setSelectedFilter(option)}
            >
              <Text style={styles.categoryButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionHeader}>Outfit Inspirations</Text>
      <View style={{ marginBottom: 30 }}>
      <FlatList
        horizontal
        data={[
          {
            id: '1',
            name: 'Summer Chic',
            imageUrl:
              'https://i.pinimg.com/736x/32/97/80/329780dc44855727cf30a8d9b01f92dc.jpg',
          },
          {
            id: '2',
            name: 'Cozy Winter',
            imageUrl:
              'https://i.pinimg.com/736x/9f/dc/06/9fdc06448b93f91e526c0170316fbd8d.jpg',
          },
          {
            id: '3',
            name: 'Casual Fit',
            imageUrl:
              'https://i.pinimg.com/736x/12/ca/dd/12caddaa7dcd6378204af746adf4d606.jpg',
          },
          {
            id: '4',
            name: 'Street Vibe',
            imageUrl:
              'https://i.pinimg.com/736x/ea/d1/c8/ead1c8682748b372620571907b377bf5.jpg',
          },
          {
            id: '5',
            name: 'Spring Date',
            imageUrl:
              'https://i.pinimg.com/736x/29/1a/e6/291ae6004092d34314c4d4b3cf73b276.jpg',
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.featuredItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.featuredImage} />
            <Text style={styles.featuredText}>{item.name}</Text>
          </View>
        )}
        /></View>

      <Text style={styles.sectionHeader}>Your Wardrobe</Text>
      {clothes.length > 0 ? (
        <FlatList
          data={clothes}
          numColumns={numColumns}
          key={numColumns} 
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OutfitCard outfit={item} />}
          contentContainerStyle={styles.outfitList}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
        />
      ) : (
        <Text style={styles.noItemsText}>No matching items found.</Text>
      )}
    </View>
  );
}
