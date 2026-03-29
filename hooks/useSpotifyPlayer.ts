'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { PlayerState, SpotifyPlayer, SpotifyPlayerState } from '@/types/player';
import { playTrack, pauseTrack, seekTrack } from '@/services/player';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5500/api/v1';

interface UseSpotifyPlayerOptions {
    isHost: boolean;
}

interface UseSpotifyPlayerReturn {
    deviceId: string | null;
    playerState: PlayerState | null;
    isReady: boolean;
    isPremiumRequired: boolean;
    play: (trackUri: string, positionMs?: number) => Promise<void>;
    pause: () => Promise<void>;
    seek: (positionMs: number) => Promise<void>;
    setVolume: (volume: number) => Promise<void>;
}

const DEFAULT_PLAYER_STATE: PlayerState = {
    isPlaying: false,
    positionMs: 0,
    durationMs: 0,
    currentTrackUri: null,
    currentTrackName: null,
    currentTrackArtist: null,
    currentTrackAlbumArt: null,
    timestamp: 0,
};

export const useSpotifyPlayer = ({ isHost }: UseSpotifyPlayerOptions): UseSpotifyPlayerReturn => {
    const playerRef = useRef<SpotifyPlayer | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [playerState, setPlayerState] = useState<PlayerState | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isPremiumRequired, setIsPremiumRequired] = useState(false);
    const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const stateRef = useRef<PlayerState | null>(null);

    useEffect(() => {
        stateRef.current = playerState;
    }, [playerState]);

    // Local progress ticker 
    const startTicker = useCallback(() => {
        if (tickRef.current) clearInterval(tickRef.current);
        tickRef.current = setInterval(() => {
            setPlayerState(prev => {
                if (!prev || !prev.isPlaying) return prev;
                const newPos = Math.min(prev.positionMs + 1000, prev.durationMs);
                return { ...prev, positionMs: newPos };
            });
        }, 1000);
    }, []);

    const stopTicker = useCallback(() => {
        if (tickRef.current) {
            clearInterval(tickRef.current);
            tickRef.current = null;
        }
    }, []);

    //  SDK state → our PlayerState
    const syncStateFromSDK = useCallback((sdkState: SpotifyPlayerState) => {
        const track = sdkState.track_window.current_track;
        const albumArt = track.album.images?.[0]?.url ?? null;

        const newState: PlayerState = {
            isPlaying: !sdkState.paused,
            positionMs: sdkState.position,
            durationMs: sdkState.duration,
            currentTrackUri: track.uri,
            currentTrackName: track.name,
            currentTrackArtist: track.artists.map(a => a.name).join(', '),
            currentTrackAlbumArt: albumArt,
            timestamp: Date.now(),
        };

        setPlayerState(newState);

        if (!sdkState.paused) {
            startTicker();
        } else {
            stopTicker();
        }
    }, [startTicker, stopTicker]);

    // Initialize SDK
    useEffect(() => {
        let isMounted = true;

        const initPlayer = () => {
            if (!isMounted || !window.Spotify) return;

            const player = new window.Spotify.Player({
                name: 'VibeSync Room Player',
                getOAuthToken: async (cb) => {
                    try {
                        const res = await fetch(`${API_URL}/auth/token`, {
                            credentials: 'include',
                        });
                        if (!res.ok) throw new Error('Token fetch failed');
                        const data = await res.json();
                        cb(data.accessToken ?? data.data?.accessToken ?? '');
                    } catch {
                        console.error('[VibeSync] Could not retrieve Spotify token for SDK');
                    }
                },
                volume: 0.8,
            });

            playerRef.current = player;

            // SDK Event Listeners 
            player.addListener('ready', ({ device_id }: { device_id: string }) => {
                console.log('[VibeSync] Spotify Player ready. Device ID:', device_id);
                if (isMounted) setDeviceId(device_id);
                if (isMounted) setIsReady(true);
            });

            player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                console.warn('[VibeSync] Spotify Player not ready. Device:', device_id);
                if (isMounted) setIsReady(false);
            });

            player.addListener('player_state_changed', (state: SpotifyPlayerState | null) => {
                if (!isMounted || !state) return;
                syncStateFromSDK(state);
            });

            player.addListener('authentication_error', () => {
                console.error('[VibeSync] Spotify authentication error');
            });

            player.addListener('account_error', () => {
                // Fired for free-tier / non-premium accounts
                console.warn('[VibeSync] Spotify Premium required');
                if (isMounted) setIsPremiumRequired(true);
            });

            player.addListener('playback_error', (e: { message: string }) => {
                console.error('[VibeSync] Spotify playback error:', e.message);
            });

            player.connect();
        };

        if (window.Spotify) {
            initPlayer();
        } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
                initPlayer();
            };

            if (!document.getElementById('spotify-player-script')) {
                const script = document.createElement('script');
                script.id = 'spotify-player-script';
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                script.async = true;
                document.body.appendChild(script);
            }
        }

        return () => {
            isMounted = false;
            stopTicker();
            playerRef.current?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Playback controls (only makes sense for the host — calls backend) 
    const play = useCallback(async (trackUri: string, positionMs = 0) => {
        if (!isHost) return;
        try {
            await playTrack({ trackUri, positionMs, deviceId: deviceId ?? undefined });
        } catch (err) {
            console.error('[VibeSync] play error:', err);
            throw err;
        }
    }, [isHost, deviceId]);

    const pause = useCallback(async () => {
        if (!isHost) return;
        try {
            stopTicker();
            await pauseTrack({ deviceId: deviceId ?? undefined });
        } catch (err) {
            console.error('[VibeSync] pause error:', err);
            throw err;
        }
    }, [isHost, deviceId, stopTicker]);

    const seek = useCallback(async (positionMs: number) => {
        if (!isHost) return;
        try {
            setPlayerState(prev => prev ? { ...prev, positionMs } : prev);
            await seekTrack({ positionMs, deviceId: deviceId ?? undefined });
        } catch (err) {
            console.error('[VibeSync] seek error:', err);
            throw err;
        }
    }, [isHost, deviceId]);

    const setVolume = useCallback(async (volume: number) => {
        await playerRef.current?.setVolume(volume);
    }, []);

    return { deviceId, playerState, isReady, isPremiumRequired, play, pause, seek, setVolume };
};
