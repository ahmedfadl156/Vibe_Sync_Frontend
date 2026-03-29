import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { PopulatedUser } from "@/types/room";
import { QueueSocketPayload } from "@/types/queue";
import { SyncedPlaybackState } from "@/types/player";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || "http://127.0.0.1:5500";

export const useVibeSocket = (
    roomId: string | undefined,
    callbacks: {
        onUserJoined?: (user: PopulatedUser, message: string) => void;
        onQueueUpdated?: (payload: QueueSocketPayload) => void;
        onPlaybackState?: (state: SyncedPlaybackState) => void;
    }
) => {
    const socketRef = useRef<Socket | null>(null);
    const callbacksRef = useRef(callbacks);

    // Keep callbacks ref always up-to-date to avoid stale closures
    useEffect(() => {
        callbacksRef.current = callbacks;
    }, [callbacks]);

    useEffect(() => {
        if (!roomId) return;

        socketRef.current = io(SOCKET_URL, {
            withCredentials: true,
            transports: ['websocket', 'polling']
        });

        socketRef.current.emit('join_room', { roomId });

        socketRef.current.on('user_joined', (data: { user: PopulatedUser; message: string }) => {
            callbacksRef.current.onUserJoined?.(data.user, data.message);
        });

        socketRef.current.on('queue_updated', (payload: QueueSocketPayload) => {
            callbacksRef.current.onQueueUpdated?.(payload);
        });

        // Fires if the backend emits playback sync events to participants
        socketRef.current.on('playback_state', (state: SyncedPlaybackState) => {
            callbacksRef.current.onPlaybackState?.(state);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off('user_joined');
                socketRef.current.off('queue_updated');
                socketRef.current.off('playback_state');
                socketRef.current.disconnect();
            }
        };
    }, [roomId]);

    return socketRef.current;
};