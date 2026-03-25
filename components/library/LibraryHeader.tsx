import { useAuth } from "@/hooks/useAuth";
import { User, Music } from "lucide-react";

export const LibraryHeader = () => {
    const { user } = useAuth();

    return (
        <div className="relative overflow-hidden bg-linear-to-r from-[#D97706]/20 to-[#1DB954]/10 rounded-3xl p-8 mb-12 border border-white/5 shadow-2xl">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-[#D97706] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1C1408] border-4 border-[#D97706]/30 flex items-center justify-center relative overflow-hidden shadow-xl z-10">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl md:text-5xl font-bold bg-linear-to-br from-[#fef3c7] to-[#D97706] bg-clip-text text-transparent">
                                {user?.displayName?.charAt(0).toUpperCase() || <User size={48} className="text-[#A8956A]" />}
                            </span>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#1DB954] text-sm font-medium mb-3">
                        <Music size={14} />
                        <span>Connected to Spotify</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#fef3c7] mb-2 tracking-tight">
                        {user?.displayName}&apos;s Library
                    </h1>
                    <p className="text-lg text-[#A8956A] max-w-2xl">
                        Your top tracks and artists, curated directly from your Spotify history. Check out your exact musical vibe.
                    </p>
                </div>
            </div>
        </div>
    );
};
