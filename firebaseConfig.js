import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyDUsGPhwVP-kgObG2ymU394BQ0NF18-dwM",
  authDomain: "an-0de.firebaseapp.com",
  projectId: "an-0de",
  storageBucket: "an-0de.appspot.com",
  messagingSenderId: "59435364276",
  appId: "1:59435364276:web:8d21c0f8aceb6f8f494ce1"
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
