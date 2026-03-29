import { customFetch } from "./api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5500/api/v1";


export interface SaveTopTracksResponse {
    status: string;
    message: string;
    data: {
        playlistName: string;
        playlistUrl: string;
    }
}

export const saveTopTracks = async (): Promise<SaveTopTracksResponse> => {
    return await customFetch<SaveTopTracksResponse>('/users/save-top-tracks', {
        method: 'POST',
    });
};


export interface GeneratePlaylistRequest {
    vibe: string;
    mixRatio: { arabic: number; english: number };
    genres: string[];
    era: string;
    length: number;
}

export interface GeneratePlaylistResponse {
    status: string;
    message: string;
    data: {
        playlistName: string;
        playlistUrl: string;
        trackCount: number;
    };
}

export const generateVibePlaylist = async (
    body: GeneratePlaylistRequest
): Promise<GeneratePlaylistResponse> => {
    return await customFetch<GeneratePlaylistResponse>('/users/generate-vibe', {
        method: 'POST',
        body: JSON.stringify(body),
    });
};

export const logout = async (): Promise<void> => {
    await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
};