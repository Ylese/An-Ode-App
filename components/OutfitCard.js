import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

const OutfitCard = ({ outfit }) => {
  const { width } = useWindowDimensions();
  const cardWidth = width / 2.3;

  const imageUri = outfit.imageBase64
    ? `data:image/jpeg;base64,${outfit.imageBase64}`
    : outfit.imageUrl;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      <Text style={styles.type}>{outfit.outfitType}</Text>
    </View>
  );
};

export default OutfitCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf0',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#dcdcdc',
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
