export interface RoomVibeSettings {
    totalEnergy: number;
    genres: string[];
}

export interface PopulatedUser {
    _id: string;
    displayName: string;
    avatar?: string;
}

export interface Room {
    _id: string;
    roomName: string;
    roomCode: string;
    roomLimit: number;
    isPublic: boolean;
    host: string | PopulatedUser;
    participants: (string | PopulatedUser)[];
    status: string;
    vibeSettings: RoomVibeSettings;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRoomRequest {
    name: string;
    isPublic: boolean;
    roomLimit: number;
    totalEnergy?: number;
    genres?: string[];
}

export interface CreateRoomResponse {
    status: string;
    message: string;
    data: {
        room: Room;
    };
}

export interface PublicRoom {
    _id: string;
    roomName: string;
    roomCode: string;
    roomLimit: number;
    isPublic: boolean;
    host: PopulatedUser;
    participants: { _id: string }[];
    status: 'waiting' | 'active' | 'ended';
    vibeSettings: RoomVibeSettings;
    expiresAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface GetPublicRoomsResponse {
    status: string;
    results: number;
    data: PublicRoom[];
}
