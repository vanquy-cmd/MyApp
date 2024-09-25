import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyDnkqHUQdajYBDfBd4EobWwy2nyLC9jgCI",
  authDomain: "fir-auth-fb638.firebaseapp.com",
  projectId: "fir-auth-fb638",
  storageBucket: "fir-auth-fb638.appspot.com",
  messagingSenderId: "1082860192043",
  appId: "1:1082860192043:web:7749eeb95b856d7006456e"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth với AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Kiểm tra khởi tạo
if (!app || !auth) {
  console.error('Firebase app or auth initialization failed');
}

export { auth };