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
    streak?: number;
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
