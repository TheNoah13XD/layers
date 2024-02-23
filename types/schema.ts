import { Timestamp } from "firebase/firestore";

export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    bio?: string;
    age?: number;
    gender?: 'male' | 'female';
    role?: 'helper' | 'seeker';
    score?: number;
    goals?: Array<keyof Goals>;
    groups?: string[];
    streak?: number;
    signal?: string;
    signalId?: string;
    prevSignals?: string[];
    seekers?: string[];
}

export interface Goals {
    smoking: boolean;
    drinking: boolean;
    substance: boolean;
    porn: boolean;
    gambling: boolean;
    depression: boolean;
    suicidal: boolean;
    selfharm: boolean;
}

export interface Record {
    id: string;
    date: string;
    day: string;
    feels: boolean;
    journal: boolean;
    score: number;
}

export interface Journal {
    id: string;
    date: Timestamp;
}

export interface SignalRequest {
    id: string;
    time: Timestamp;
    username: string;
}

export interface Group {
    id: string;
    name: string;
    members: number;
    owner: string;
    ownerUsername: string;
    description: string;
    tags: Array<keyof Goals>;
}

export interface Member {
    id: string;
    username: string;
    role: 'owner' | 'admin' | 'member';
}

export interface Post {
    id: string;
    user: string;
    username: string;
    time: Timestamp;
    groupId: string;
    groupName: string;
    content: string;
    likedBy: string[];
}

export interface Message {
    id: string;
    userId: string;
    username: string;
    role: 'helper' | 'seeker' | 'bot';
    time: Timestamp;
    message: string;
}
