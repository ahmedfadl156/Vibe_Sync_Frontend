
export interface SpotifyArtist {
    name: string;
    uri: string;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyAlbum {
    name: string;
    images: SpotifyImage[];
    uri: string;
}

export interface SpotifyTrackWindow {
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration_ms: number;
    uri: string;
    id: string;
}

export interface SpotifyPlayerState {
    paused: boolean;
    position: number; // ms
    duration: number; // ms
    track_window: {
        current_track: SpotifyTrackWindow;
    };
    shuffle: boolean;
    repeat_mode: number;
    timestamp: number;
}

export interface PlayerState {
    isPlaying: boolean;
    positionMs: number;
    durationMs: number;
    currentTrackUri: string | null;
    currentTrackName: string | null;
    currentTrackArtist: string | null;
    currentTrackAlbumArt: string | null;
    timestamp: number;
}


export interface PlayTrackPayload {
    trackUri: string;
    positionMs?: number;
    deviceId?: string;
}

export interface PausePayload {
    deviceId?: string;
}

export interface SeekPayload {
    positionMs: number;
    deviceId?: string;
}


export interface SyncedPlaybackState {
    action: 'play' | 'pause' | 'seek';
    trackUri?: string;
    positionMs?: number;
    timestamp?: number; 
}


declare global {
    interface Window {
        Spotify: {
            Player: new (options: {
                name: string;
                getOAuthToken: (cb: (token: string) => void) => void;
                volume?: number;
            }) => SpotifyPlayer;
        };
        onSpotifyWebPlaybackSDKReady: () => void;
    }
}

export interface SpotifyPlayer {
    connect: () => Promise<boolean>;
    disconnect: () => void;
    addListener: (event: string, callback: (data: any) => void) => void;
    removeListener: (event: string, callback?: (data: any) => void) => void;
    getCurrentState: () => Promise<SpotifyPlayerState | null>;
    setVolume: (volume: number) => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    seek: (positionMs: number) => Promise<void>;
    nextTrack: () => Promise<void>;
    previousTrack: () => Promise<void>;
}
