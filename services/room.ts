import { customFetch } from "./api";
import { CreateRoomRequest, CreateRoomResponse, GetPublicRoomsResponse } from "@/types/room";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5500/api/v1";

export const createRoom = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
    return await customFetch<CreateRoomResponse>('/rooms', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const joinRoom = async (roomCode: string): Promise<CreateRoomResponse> => {
    return await customFetch<CreateRoomResponse>(`/rooms/join/${roomCode}`, {
        method: 'POST',
    });
};

export const getPublicRooms = async (): Promise<GetPublicRoomsResponse> => {
    return await customFetch<GetPublicRoomsResponse>('/rooms/public');
};

export const leaveRoom = async (roomCode: string): Promise<{ status: string; message: string }> => {
    return await customFetch(`/rooms/leave/${roomCode}`, { method: 'PATCH' });
};

export const closeRoom = async (roomCode: string): Promise<{ status: string; message: string }> => {
    return await customFetch(`/rooms/close/${roomCode}`, { method: 'PATCH' });
};

export const logout = async (): Promise<void> => {
    await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
};
