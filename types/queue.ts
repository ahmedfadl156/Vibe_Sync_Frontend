import { SpotifyTrack } from "./spotify";

export interface QueueItem {
    _id: string;
    room: string;
    spotifyTrackId: string;
    trackData: {
        name: string;
        artistName: string;
        albumArtUrl: string;
        durationMs: number;
    };
    score: number;
    voters: string[];
    status: 'pending' | 'playing' | 'played';
    createdAt: string;
    updatedAt: string;
}

/** Discriminated union matching the backend's `queue_updated` socket payloads */
export type QueueSocketPayload =
    | { action: 'add' | 'vote'; track: QueueItem }
    | { action: 'shuffle'; message: string; track?: never };

export interface AddTrackRequest {
    spotifyTrackId: string;
    trackData: QueueItem['trackData'];
}

export interface AddTrackResponse {
    status: string;
    message: string;
    data: {
        queueItem: QueueItem;
    };
}

export interface GetQueueResponse {
    status: string;
    data: {
        queue: QueueItem[];
    };
}
