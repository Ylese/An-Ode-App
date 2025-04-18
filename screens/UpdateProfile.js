import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getAuth, updateProfile, updatePassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/ProfileStyles'; 

export default function UpdateProfileScreen() {
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();
  const navigation = useNavigation();

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Not signed in', 'Please sign in to update your profile.');
      return;
    }

    try {
      if (newName) {
        await updateProfile(user, { displayName: newName });
      }
      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      Alert.alert('Profile Updated', 'Your profile has been updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Update Failed', 'There was an error updating your profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Profile</Text>
      <TextInput
        placeholder="Name"
        value={newName}
        onChangeText={setNewName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={newUsername}
        onChangeText={setNewUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
