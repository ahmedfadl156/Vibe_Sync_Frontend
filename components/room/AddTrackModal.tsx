import { useState } from "react";
import { X, Search, Music, Clock } from "lucide-react";
import { AddTrackRequest } from "@/types/queue";

interface AddTrackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTrack: (trackData: AddTrackRequest) => void;
    isAdding: boolean;
}

export const AddTrackModal = ({ isOpen, onClose, onAddTrack, isAdding }: AddTrackModalProps) => {
    // Basic state for track mock search because there's no backend search API yet
    const [trackUrl, setTrackUrl] = useState("");
    const [trackName, setTrackName] = useState("");
    const [artistName, setArtistName] = useState("");
    
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let trackId = `mock-${Date.now()}`;
        if (trackUrl.includes('track/')) {
            const parts = trackUrl.split('track/');
            trackId = parts[1].split('?')[0];
        }

        const newTrack: AddTrackRequest = {
            spotifyTrackId: trackId,
            trackData: {
                name: trackName || "Unknown Track",
                artistName: artistName || "Unknown Artist",
                albumArtUrl: "https://i.scdn.co/image/ab67616d0000b273cf97e2ac180ed08c02c6b412", 
                durationMs: 180000 
            }
        };

        onAddTrack(newTrack);
        setTrackUrl("");
        setTrackName("");
        setArtistName("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0D0906]/80 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative bg-[#1C1408] border border-[#D97706]/30 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#A8956A] hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-[#fef3c7] mb-6 flex items-center gap-2">
                    <Search className="text-[#D97706]" size={24} />
                    Add a Track
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#EBE0DA]">Spotify Track URL</label>
                        <input
                            type="text"
                            value={trackUrl}
                            onChange={(e) => setTrackUrl(e.target.value)}
                            placeholder="https://open.spotify.com/track/..."
                            className="bg-[#0D0906] border border-white/10 rounded-xl px-4 py-2.5 text-[#fef3c7] focus:border-[#D97706]/50 focus:ring-1 focus:ring-[#D97706]/50 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#EBE0DA]">Track Name</label>
                        <input
                            type="text"
                            value={trackName}
                            onChange={(e) => setTrackName(e.target.value)}
                            required
                            placeholder="e.g. Blinding Lights"
                            className="bg-[#0D0906] border border-white/10 rounded-xl px-4 py-2.5 text-[#fef3c7] focus:border-[#D97706]/50 focus:ring-1 focus:ring-[#D97706]/50 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-[#EBE0DA]">Artist Name</label>
                        <input
                            type="text"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            required
                            placeholder="e.g. The Weeknd"
                            className="bg-[#0D0906] border border-white/10 rounded-xl px-4 py-2.5 text-[#fef3c7] focus:border-[#D97706]/50 focus:ring-1 focus:ring-[#D97706]/50 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isAdding || !trackName || !artistName}
                        className="mt-6 w-full bg-[#D97706] text-[#4d2600] font-bold py-3.5 rounded-xl hover:bg-[#b86504] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isAdding ? (
                            <div className="w-5 h-5 border-2 border-[#4d2600]/30 border-t-[#4d2600] rounded-full animate-spin"></div>
                        ) : (
                            <Music size={18} />
                        )}
                        <span>{isAdding ? "Adding..." : "Add to Queue"}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
