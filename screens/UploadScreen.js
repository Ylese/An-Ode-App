import React, { useState } from 'react';
import { View, Image, Alert, TextInput, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import uploadStyles from '../styles/UploadStyles';
import CustomButton from '../components/Buttons';

import uploadToCloudinary from '../api/cloudinaryUpload'; 
import { analyzeImage } from '../api/visionApi'; 

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [aiData, setAiData] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (result) => {
    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];
      setImage({ uri: asset.uri });

      try {

        const cloudinaryUrl = await uploadToCloudinary(asset.uri);
        const aiResult = await analyzeImage(cloudinaryUrl);
        setAiData(aiResult);
      } catch (err) {
        Alert.alert('AI Analysis Error', err.message);
      }
    } else {
      Alert.alert('No Image Selected');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission Denied', 'Camera roll permission is required.');

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
    handleImageUpload(result);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission Denied', 'Camera permission is required.');

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    handleImageUpload(result);
  };

  const uploadOutfit = async () => {
    if (!image || !aiData.type || !aiData.activity || !aiData.season) {
      Alert.alert('Missing Info', 'Please upload an image so AI can process it.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not signed in', 'Please sign in to upload outfits.');
      return;
    }

    try {
      setUploading(true);

      await addDoc(collection(db, 'outfits'), {
        userId: user.uid,
        imageUrl: image.uri,
        outfitType: aiData.type,
        description,
        tags: aiData.tags || [],
        weatherType: aiData.weather || '',
        season: aiData.season || '',
        activity: aiData.activity || '',
        color: aiData.color || '',
        timestamp: new Date(),
      });

      Alert.alert('Success!', 'Outfit uploaded!');
      setImage(null);
      setDescription('');
      setAiData({});
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={uploadStyles.container}>
      <View style={uploadStyles.headerContainer}>
        <Text style={uploadStyles.headerText}>Upload Your Outfit</Text>
        <Text style={uploadStyles.subheaderText}>Just take or choose a photo, we’ll do the rest</Text>
      </View>

      {image && <Image source={{ uri: image.uri }} style={uploadStyles.image} />}

      <TextInput
        placeholder="Optional: Name this look (e.g. 'Rainy Day Fit')"
        value={description}
        onChangeText={setDescription}
        style={uploadStyles.input}
      />

      {aiData && (
        <View style={{ marginVertical: 10 }}>
          <Text style={uploadStyles.subheaderText}>AI Detected:</Text>
          <Text>Type: {aiData.type}</Text>
          <Text>Activity: {aiData.activity}</Text>
          <Text>Season: {aiData.season}</Text>
        </View>
      )}

      <CustomButton title="Pick Image from Gallery" onPress={pickImage} />
      <CustomButton title="Take a Photo" onPress={takePhoto} />
      <CustomButton
        title="Upload Outfit"
        onPress={uploadOutfit}
        disabled={uploading}
        isLoading={uploading}
      />
    </ScrollView>
  );
}
