import { customFetch } from "./api";
import { VibeMatchResponse, BlendPlaylistResponse } from "@/types/vibeMatch";

export const generateVibeMatch = async (targetUserId: string): Promise<VibeMatchResponse> => {
    return await customFetch<VibeMatchResponse>(`/features/vibe-match/${targetUserId}`, {
        method: 'GET',
    });
};

export const generateBlendPlaylist = async (targetUserId: string): Promise<BlendPlaylistResponse> => {
    return await customFetch<BlendPlaylistResponse>(`/features/vibe-match/${targetUserId}/blend`, {
        method: 'POST',
    });
};
