export interface VibeMatchData {
    targetUserId: string;
    matchScore: number;
    analysis: string;
    commonGround: string[];
    generatedAt: string;
    _id: string;
}

export interface VibeMatchResponse {
    status: string;
    source: string;
    targetUserName: string;
    data: VibeMatchData;
}

export interface BlendPlaylistResponse {
    status: string;
    message: string;
    totalTracks?: number;
    playlistUrl?: string;
}
