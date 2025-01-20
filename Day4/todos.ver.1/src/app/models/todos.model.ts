export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export interface TodoResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}



export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    ip: string;
    macAddress: string;
    university: string;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

export interface UserResponse {
    users: UserInfo[];
    total: number;
    skip: number;
    limit: number;
}
