"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateRoom } from "@/hooks/useRoom";
import { Music, AlertCircle, Users, Unlock, Lock } from "lucide-react";

export const CreateRoomForm = () => {
    const router = useRouter();
    const { mutate: createRoom, isPending, error } = useCreateRoom();

    const [name, setName] = useState("");
    const [roomLimit, setRoomLimit] = useState(10);
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        createRoom(
            { name, roomLimit, isPublic },
            {
                onSuccess: (response) => {
                    const code = response.data.room.roomCode;
                    router.push(`/room/${code}`);
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-[#1C1408]/60 backdrop-blur-xl border border-[#D97706]/20 p-8 rounded-3xl shadow-2xl flex flex-col gap-6">
            <div className="text-center mb-2">
                <div className="w-16 h-16 bg-[#D97706]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D97706]/20">
                    <Music className="text-[#D97706]" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-[#fef3c7] mb-2">Create a Vibe Room</h2>
                <p className="text-[#A8956A]">Set up your space, invite friends, and sync your music tastes instantly.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-200 text-sm">
                    <AlertCircle className="shrink-0 text-red-400" size={18} />
                    <p>{error.message || "Failed to create room. Please try again."}</p>
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-[#EBE0DA] ml-1">Room Name <span className="text-red-400">*</span></label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Weekend Vibes, Code & Chill..."
                    className="w-full bg-[#0D0906] border border-white/10 rounded-xl px-4 py-3 text-[#fef3c7] placeholder:text-white/20 focus:outline-none focus:border-[#D97706]/50 focus:ring-1 focus:ring-[#D97706]/50 transition-all"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="limit" className="text-sm font-semibold text-[#EBE0DA] ml-1 flex items-center gap-2">
                    <Users size={16} className="text-[#A8956A]" /> Participant Limit
                </label>
                <div className="flex items-center gap-4">
                    <input
                        id="limit"
                        type="range"
                        min="1"
                        max="10"
                        value={roomLimit}
                        onChange={(e) => setRoomLimit(parseInt(e.target.value))}
                        className="flex-1 accent-[#D97706]"
                    />
                    <span className="w-12 text-center text-lg font-bold text-[#fef3c7] bg-[#0D0906] py-1 rounded-lg border border-white/10">
                        {roomLimit}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#EBE0DA] ml-1">Room Visibility</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setIsPublic(true)}
                        className={`flex items-center gap-3 justify-center py-3 rounded-xl border transition-all ${
                            isPublic 
                            ? 'bg-[#1DB954]/10 border-[#1DB954]/50 text-[#1DB954]' 
                            : 'bg-[#0D0906] border-white/10 text-[#A8956A] hover:bg-white/5'
                        }`}
                    >
                        <Unlock size={18} />
                        <span className="font-medium">Public</span>
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setIsPublic(false)}
                        className={`flex items-center gap-3 justify-center py-3 rounded-xl border transition-all ${
                            !isPublic 
                            ? 'bg-[#D97706]/10 border-[#D97706]/50 text-[#D97706]' 
                            : 'bg-[#0D0906] border-white/10 text-[#A8956A] hover:bg-white/5'
                        }`}
                    >
                        <Lock size={18} />
                        <span className="font-medium">Private</span>
                    </button>
                </div>
                {isPublic ? (
                    <p className="text-xs text-[#A8956A] ml-1 mt-1">Anyone can see and join this room.</p>
                ) : (
                    <p className="text-xs text-[#A8956A] ml-1 mt-1">Only people with the invite link or code can join.</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending || !name.trim()}
                className="mt-4 w-full bg-[#D97706] text-[#4d2600] font-bold py-4 rounded-xl hover:bg-[#b86504] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isPending ? (
                    <>
                        <div className="w-5 h-5 border-2 border-[#4d2600]/30 border-t-[#4d2600] rounded-full animate-spin"></div>
                        <span>Creating Room...</span>
                    </>
                ) : (
                    "Create Room"
                )}
            </button>
        </form>
    );
};
