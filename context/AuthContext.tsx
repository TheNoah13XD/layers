import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
    id: string;
    email: string;
    // add more fields
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean | undefined;
    signin: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticated(true);
        }, 2000);
    }, []);

    const signin = async (email: string, password: string) => {
        try {

        } catch (error) {

        }
    }

    const signup = async (email: string, password: string) => {
        try {

        } catch (error) {

        }
    }

    const signout = async () => {
        try {

        } catch (error) {

        }
    }

    return (
        <AuthContext.Provider value={{
            user,
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
