import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

interface User {
    id: string;
    email: string;
    name?: string;
    username?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
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
    
    const updateUserData = useCallback(async (userId: string) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser(prevUser => {
                if (prevUser?.id === userId && prevUser.email === data.email && prevUser.name === data.name && prevUser.username === data.username) {
                    return prevUser;
                }
    
                return {
                    id: userId,
                    email: data.email,
                    name: data.name,
                    username: data.username
                };
            });
        } else {
            throw new Error(`No user document for user ID ${userId}`);
        }
    }, []);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoading(true);
                setIsAuthenticated(true);
                try {
                    await updateUserData(user.uid);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed to update user data:", error);
                    setIsAuthenticated(false); 
                    setIsLoading(false);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
    
        return () => unsubscribe();
    }, [updateUserData]);

    const signin = async (email: string, password: string): Promise<UserCredential | String> => {
        try {
            setIsLoading(true);
            const response = await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(false);
            return response;
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }

    const signup = async (email: string, password: string, name: string, username: string): Promise<UserCredential | String> => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
    
            await setDoc(doc(db, "users", response.user.uid), {
                userId: response.user.uid,
                email,
                name,
                username
            });
    
            return response;
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }

    const signout = async (): Promise<void | String> => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            signin,
            signup,
            signout
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
