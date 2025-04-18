import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import headerStyles from '../styles/HeaderStyles';
import OutfitCard from '../components/OutfitCard';
import wardrobeStyles from '../styles/WardrobeScreenStyles';

export default function WardrobeScreen() {
  const [myOutfits, setMyOutfits] = useState([]);

  useEffect(() => {
    const fetchMyOutfits = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const q = query(
          collection(db, 'outfits'),
          where('userId', '==', user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMyOutfits(data);
      } catch (err) {
        console.error('Error fetching my outfits:', err);
      }
    };

    fetchMyOutfits();
  }, []);

  return (
    <View style={wardrobeStyles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.headerText}>My Wardrobe</Text>
      </View>

      <FlatList
        data={myOutfits}
        numColumns={2}
        key={'2-columns'}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OutfitCard outfit={item} />}
        contentContainerStyle={wardrobeStyles.outfitList}
        columnWrapperStyle={wardrobeStyles.outfitRow}
      />
    </View>
  );
}
