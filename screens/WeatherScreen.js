import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as Location from 'expo-location';
import headerStyles from '../styles/HeaderStyles';
import weatherStyles from '../styles/WeatherScreenStyles'; 
import OutfitCard from '../components/OutfitCard';

const API_KEY = '997c5ddd62b14c27b96103243251404';

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [season, setSeason] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [outfits, setOutfits] = useState([]);

  const determineSeason = (month) => {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
        );
        const data = await response.json();

        if (data.error) {
          setErrorMsg(data.error.message);
        } else {
          setWeather(data);
          const month = new Date().getMonth() + 1;
          setSeason(determineSeason(month));
        }
      } catch (err) {
        console.error('Weather Fetch Error:', err);
        setErrorMsg('Error fetching weather.');
      }
    })();
  }, []);

  useEffect(() => {
    const fetchOutfits = async () => {
      if (!season) return;  

      console.log('Fetching outfits for season:', season);  

      try {
        const q = query(
          collection(db, 'outfits'),
          where('season', 'in', [season, 'any']) 
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          console.log('No outfits found for this season');
        } else {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Fetched outfits:', data);  
          setOutfits(data);
        }
      } catch (err) {
        console.error('Firestore Fetch Error:', err);
        setErrorMsg('Error fetching outfits.');
      }
    };

    fetchOutfits();
  }, [season]);


  if (errorMsg) return <Text style={weatherStyles.errorText}>{errorMsg}</Text>;
  if (!weather) return <ActivityIndicator size="large" color="teal" />;

  const temp = weather.current?.temp_c ?? '--';
  const locationName = weather.location?.name ?? 'your location';

  return (
    <View style={weatherStyles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.headerText}>An ODE</Text>
      </View>

      <View style={weatherStyles.weatherSection}>
        <Text style={weatherStyles.title}>Weather in {locationName}</Text>
        <Text style={weatherStyles.info}>Temperature: {temp}°C</Text>
        <Text style={weatherStyles.info}>Condition: {weather.current?.condition?.text}</Text>

        <Text style={weatherStyles.title}>Your Outfits:</Text>
        {outfits.length === 0 ? (
          <Text style={weatherStyles.info}>No outfits found for this season.</Text>
        ) : (
          <FlatList
            data={outfits}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OutfitCard outfit={item} />
            )}
            contentContainerStyle={weatherStyles.outfitList}
          />
        )}
      </View>
    </View>
  );
}
