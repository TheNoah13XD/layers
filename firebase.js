import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCvcz21MI5XuXme4CVLC2BDoZLG3Xtaojo",
	authDomain: "layers-solution.firebaseapp.com",
	projectId: "layers-solution",
	storageBucket: "layers-solution.appspot.com",
	messagingSenderId: "131774972809",
	appId: "1:131774972809:web:cc10b0e81751094b7d9758"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
