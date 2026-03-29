export interface RoastData {
    roastText: string;
    guiltyPleasures: string[];
    therapyPlaylist: string[];
    language: string;
    generatedAt: string;
}

export interface RoastResponse {
    status: string;
    source: 'ai' | 'cache';
    data: RoastData;
}
