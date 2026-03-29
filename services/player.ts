import { customFetch } from './api';
import { PlayTrackPayload, PausePayload, SeekPayload } from '@/types/player';

interface PlayerAPIResponse {
    status: string;
    message: string;
}

/** Tell the backend (and Spotify) to play a track on a specific device */
export const playTrack = async (payload: PlayTrackPayload): Promise<PlayerAPIResponse> => {
    return await customFetch<PlayerAPIResponse>('/player/play', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
};

/** Tell the backend (and Spotify) to pause playback */
export const pauseTrack = async (payload: PausePayload): Promise<PlayerAPIResponse> => {
    return await customFetch<PlayerAPIResponse>('/player/pause', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
};

/** Tell the backend (and Spotify) to seek to a position in ms */
export const seekTrack = async (payload: SeekPayload): Promise<PlayerAPIResponse> => {
    return await customFetch<PlayerAPIResponse>('/player/seek', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
};
