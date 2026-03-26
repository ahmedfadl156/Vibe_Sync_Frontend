"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LinkIcon } from "lucide-react";

const JoinRoomPage = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);

    // Redirect to home if unauthenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        const code = roomCode.trim().toUpperCase();
        if (!code) return;

        setIsJoining(true);
        // We navigate to the room page directly, where the useRoomData hook
        // will automatically attempt to join the user to the room via the backend API.
        router.push(`/room/${code}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-4 flex justify-center items-center bg-[#0D0906]">
                <div className="w-12 h-12 border-4 border-[#D97706]/30 border-t-[#D97706] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[url('/bg-pattern.svg')] bg-cover bg-center flex items-center justify-center">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-[#0D0906]/90 mix-blend-multiply z-0 pointer-events-none"></div>
            
            <div className="relative z-10 w-full max-w-md mx-auto">
                <form 
                    onSubmit={handleJoin} 
                    className="w-full bg-[#1C1408]/60 backdrop-blur-xl border border-[#D97706]/20 p-8 rounded-3xl shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500"
                >
                    <div className="text-center mb-2">
                        <div className="w-16 h-16 bg-[#1DB954]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1DB954]/20">
                            <LinkIcon className="text-[#1DB954]" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#fef3c7] mb-2">Join a Room</h2>
                        <p className="text-[#A8956A]">Enter the code given by your host to sync your vibes.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="roomCode" className="text-sm font-semibold text-[#EBE0DA] ml-1">Room Code</label>
                        <input
                            id="roomCode"
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            required
                            placeholder="e.g. AF-YWMFE"
                            className="w-full bg-[#0D0906] border border-white/10 rounded-xl px-4 py-4 text-center text-2xl font-mono tracking-[0.2em] text-[#fef3c7] placeholder:text-white/20 focus:outline-none focus:border-[#1DB954]/50 focus:ring-1 focus:ring-[#1DB954]/50 transition-all uppercase"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isJoining || roomCode.length < 3}
                        className="mt-4 w-full bg-[#1DB954] text-black font-bold py-4 rounded-xl hover:bg-[#1ed760] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isJoining ? (
                            <>
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                <span>Joining...</span>
                            </>
                        ) : (
                            "Join Room"
                        )}
                    </button>
                    
                    <p className="text-center text-xs text-[#A8956A] mt-2">
                        Joining automatically connects your Spotify profile to this room.
                    </p>
                </form>
            </div>
        </main>
    );
};

export default JoinRoomPage;
