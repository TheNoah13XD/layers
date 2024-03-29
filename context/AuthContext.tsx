import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

import { auth, db } from "@firebase";
import { User } from "@types";
import { checkIfUsernameExists } from "utils/firebase";

WebBrowser.maybeCompleteAuthSession();

interface UserUpdate {
    age?: number;
    gender?: 'male' | 'female';
    role?: 'helper' | 'seeker';
    score?: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
    promptAsync: any;
    userUpdate: (userId: string, data: UserUpdate) => Promise<void | String>;
    signin: (email: string, password: string) => Promise<UserCredential | String>;
    signup: (email: string, password: string, name: string, username: string) => Promise<UserCredential | String>;
    signout: () => Promise<void | String>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    const [request, response, promptAsync] = Google.useAuthRequest({
        // @ts-ignore
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        // @ts-ignore
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    });
    
    const isUserEqual = (prevUser: User | null, data: any) => {
        if (!prevUser || !data) {
            return false;
        }

        return (
            prevUser.id === data.id &&
            prevUser.email === data.email &&
            prevUser.name === data.name &&
            prevUser.username === data.username &&
            prevUser.bio === data.bio &&
            prevUser.age === data.age &&
            prevUser.gender === data.gender &&
            prevUser.role === data.role &&
            prevUser.score === data.score &&
            prevUser.goals === data.goals &&
            prevUser.groups === data.groups &&
            prevUser.streak === data.streak &&
            prevUser.signal === data.signal &&
            prevUser.signalId === data.signalId &&
            prevUser.prevSignals === data.prevSignals &&
            prevUser.seekers === data.seekers
        );
    };

    const updateLocalUser = useCallback((userId: string) => {
        const docRef = doc(db, "users", userId);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                let data = docSnap.data();

                setUser(prevUser => {
                    if (isUserEqual(prevUser, data)) {
                        return prevUser;
                    }

                    return {
                        id: userId,
                        email: data.email,
                        name: data.name,
                        username: data.username,
                        bio: data.bio,
                        age: data.age,
                        gender: data.gender,
                        role: data.role,
                        score: data.score,
                        goals: data.goals,
                        groups: data.groups,
                        streak: data.streak,
                        signal: data.signal,
                        signalId: data.signalId,
                        prevSignals: data.prevSignals,
                        seekers: data.seekers
                    };
                });
            } else {
                throw new Error(`No user document for user ID ${userId}`);
            }
        });

        return unsubscribe;
    }, []);
    
    const userUpdate = async (userId: string, data: UserUpdate): Promise<void | String> => {
        setIsLoading(true);
        try {
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, { 
                ...data,
                bio: 'I am a new user!',
                score: 85,
                goals: ['smoking', 'drinking', 'substance', 'porn', 'gambling', 'depression', 'suicidal', 'selfharm'],
                groups: [],
                streak: 0,
                signal: "",
                signalId: "",
                prevSignals: [],
                seekers: []
            }, { merge: true });
    
            updateLocalUser(userId);
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoading(true);
                setIsAuthenticated(true);
                try {
                    updateLocalUser(user.uid);
                } catch (error) {
                    console.error("Failed to update user data:", error);
                    setIsAuthenticated(false); 
                }
                setIsLoading(false);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
    
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential).then((userCredential) => {
                const userRef = doc(db, 'users', userCredential.user.uid);
                getDoc(userRef).then((docSnapshot) => {
                    if (!docSnapshot.exists()) {
                        setDoc(userRef, {
                            id: userCredential.user.uid,
                            email: userCredential.user.email,
                            name: userCredential.user.displayName,
                            username: userCredential.user.uid,
                        });
                    }
                });
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [response]);

    const signin = async (email: string, password: string): Promise<UserCredential | String> => {
        setIsLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            updateLocalUser(response.user.uid);
            return response;
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        } finally {
            setIsLoading(false);
        }
    }

    const signup = async (email: string, password: string, name: string, username: string): Promise<UserCredential | String> => {
        setIsLoading(true);
        try {
            const usernameTaken = await checkIfUsernameExists(username);
            if (usernameTaken) {
                return 'Username is taken';
            }

            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", response.user.uid), {
                id: response.user.uid,
                email,
                name,
                username
            });

            return response;
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        } finally {
            setIsLoading(false);
        }
    }

    const signout = async (): Promise<void | String> => {
        setIsLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            promptAsync,
            signin,
            signup,
            signout,
            userUpdate,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }

    return value;
}
