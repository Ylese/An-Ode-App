import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import styles from '../styles/SettingsScreenStyles';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Unable to log you out.');
    }
  };

  const handleDeleteClothes = async (outfitId) => {
    try {
      await deleteDoc(doc(db, 'outfits', outfitId));
      Alert.alert('Success', 'Outfit deleted.');
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Delete Failed', 'Error deleting outfit.');
    }
  };

  const renderButton = (text, onPress, danger = false) => (
    <TouchableOpacity
      style={[styles.button, danger && styles.dangerButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, danger && styles.dangerText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {renderButton('Update Profile', () => navigation.navigate('Profile'))}
      {renderButton('Delete Clothes', () => handleDeleteClothes('sampleOutfitId'))}
      {renderButton('Add Clothes', () => navigation.navigate('Upload'))}
      {renderButton('Log Out', handleLogout, true)}
    </ScrollView>
  );
}
