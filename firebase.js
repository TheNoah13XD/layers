import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

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

export const usersRef = collection(db, "users");
export const groupsRef = collection(db, "groups");
export const postsRef = collection(db, "posts");
export const chatsRef = collection(db, "chats");

export { auth, db };
