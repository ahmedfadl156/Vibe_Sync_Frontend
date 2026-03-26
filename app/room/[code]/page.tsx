"use client";

import { use, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRoomData } from "@/hooks/useRoomData";
import { useVibeSocket } from "@/hooks/useVibeSocket";
import { useToast } from "@/hooks/useToast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { leaveRoom, closeRoom } from "@/services/room";
import { useRouter } from "next/navigation";
import { ParticipantsList } from "@/components/room/ParticipantsList";
import { QueueList } from "@/components/room/QueueList";
import { AddTrackModal } from "@/components/room/AddTrackModal";
import { ToastContainer } from "@/components/ui/Toast";
import { Share, CheckCircle2 } from "lucide-react";

const RoomPage = ({ params }: { params: Promise<{ code: string }> }) => {
    const { isAuthenticated, isLoading: authLoading, user } = useAuth();
    const queryClient = useQueryClient();
    const { toasts, addToast, removeToast } = useToast();
    const router = useRouter();

    const resolvedParams = use(params);
    const roomCode = resolvedParams.code;

    const {
        roomData,
        roomId,
        isRoomLoading,
        roomError,
        queueData,
        queueError,
        addTrack,
        isAddingTrack,
        voteTrack,
        isVoting
    } = useRoomData(roomCode);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useVibeSocket(roomId, {
        onUserJoined: (joinedUser, message) => {
            queryClient.invalidateQueries({ queryKey: ["room", roomCode] });
            addToast({
                variant: "info",
                title: message,
                description: "The vibe just got bigger 🎉",
            });
        },

        onQueueUpdated: (payload) => {
            queryClient.invalidateQueries({ queryKey: ["queue", roomId] });

            if (payload.action === "add") {
                addToast({
                    variant: "success",
                    title: `🎵 ${payload.track.trackData.name}`,
                    description: `Added by ${payload.track.trackData.artistName}`,
                });
            } else if (payload.action === "vote") {
                addToast({
                    variant: "vote",
                    title: `👍 Someone voted!`,
                    description: `${payload.track.trackData.name} · ${payload.track.score} votes`,
                });
            } else if (payload.action === "shuffle") {
                addToast({
                    variant: "shuffle",
                    title: "🔀 Queue shuffled!",
                    description: payload.message,
                });
            }
        },
    });

    const copyRoomLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { mutate: leave, isPending: isLeaving } = useMutation({
        mutationFn: () => leaveRoom(roomCode),
        onSuccess: () => router.push("/rooms"),
        onError: (err: Error) => addToast({ variant: "info", title: "Could not leave", description: err.message }),
    });

    const { mutate: close, isPending: isClosing } = useMutation({
        mutationFn: () => closeRoom(roomCode),
        onSuccess: () => router.push("/rooms"),
        onError: (err: Error) => addToast({ variant: "info", title: "Could not close room", description: err.message }),
    });

    if (authLoading || isRoomLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 pb-20 bg-[#0D0906]">
                <div className="w-12 h-12 border-4 border-[#D97706]/30 border-t-[#D97706] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 flex justify-center bg-[#0D0906]">
                <p className="text-[#A8956A]">Please login via the navbar to access this room.</p>
            </div>
        );
    }

    if (roomError || !roomData) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[#0D0906] flex items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-2">Room not found</h2>
                    <p className="text-[#EBE0DA]/70">{roomError?.message || "The room code is invalid or the room is closed."}</p>
                </div>
            </div>
        );
    }

    // Determine host: either populated object or string ID
    const hostId = typeof roomData.host === 'object' ? roomData.host._id : roomData.host;

    return (
        <main className="min-h-screen pt-24 pb-8 px-4 md:px-8 bg-[url('/bg-pattern.svg')] bg-cover bg-center overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-[#0D0906]/95 mix-blend-multiply z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col">
                {/* Dashboard Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#1C1408]/60 border border-[#D97706]/20 py-4 px-6 rounded-2xl backdrop-blur-md">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#fef3c7] truncate max-w-[300px] md:max-w-md">
                            {roomData.roomName}
                        </h1>
                        <p className="text-[#A8956A] text-sm">
                            Created {new Date(roomData.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-[#0D0906] border border-[#D97706]/30 px-4 py-2 rounded-xl flex items-center gap-3">
                            <span className="text-[#A8956A] text-xs font-bold uppercase tracking-widest">Code</span>
                            <span className="text-[#fef3c7] font-mono text-xl tracking-widest">{roomData.roomCode}</span>
                        </div>

                        <button
                            onClick={copyRoomLink}
                            className="bg-white/5 hover:bg-white/10 text-[#A8956A] p-3 rounded-xl transition-colors border border-white/10 flex items-center gap-2"
                        >
                            {copied ? <CheckCircle2 size={20} className="text-[#1DB954]" /> : <Share size={20} />}
                            <span className="sr-only md:not-sr-only md:text-sm md:font-semibold">
                                {copied ? 'Copied' : 'Share'}
                            </span>
                        </button>

                        {/* Leave Room — available to all participants */}
                        <button
                            onClick={() => leave()}
                            disabled={isLeaving || isClosing}
                            className="
                                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
                                border border-amber-500/30 bg-amber-500/8 text-amber-400
                                hover:bg-amber-500/15 hover:border-amber-500/50
                                active:scale-95 transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed
                            "
                        >
                            {isLeaving ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                                </svg>
                            )}
                            <span className="hidden sm:inline">{isLeaving ? "Leaving…" : "Leave"}</span>
                        </button>

                        {/* Close Room — host only */}
                        {user?._id === hostId && (
                            <button
                                onClick={() => close()}
                                disabled={isClosing || isLeaving}
                                className="
                                    flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
                                    border border-red-500/30 bg-red-500/8 text-red-400
                                    hover:bg-red-500/15 hover:border-red-500/50
                                    active:scale-95 transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {isClosing ? (
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                <span className="hidden sm:inline">{isClosing ? "Closing…" : "Close Room"}</span>
                            </button>
                        )}
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                    <div className="lg:col-span-2 h-full flex flex-col">
                        <QueueList
                            queue={queueData || []}
                            error={queueError instanceof Error ? queueError.message : null}
                            onAddClick={() => setIsAddModalOpen(true)}
                            onVoteClick={(id) => voteTrack(id)}
                            hostId={hostId}
                            currentUserId={user?._id || ""}
                            isVoting={isVoting}
                        />
                    </div>

                    <div className="h-full flex flex-col">
                        <ParticipantsList
                            participants={roomData.participants as any[]}
                            hostId={hostId}
                        />
                    </div>
                </div>
            </div>

            <AddTrackModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddTrack={(trackData) => addTrack(trackData)}
                isAdding={isAddingTrack}
            />

            {/* Real-time Toast Notifications */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </main>
    );
};

export default RoomPage;
