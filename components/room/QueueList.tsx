import { QueueItem } from "@/types/queue";
import { Music, Plus, ThumbsUp, Disc3, FastForward, PlayCircle } from "lucide-react";
import { PopulatedUser } from "@/types/room";

interface QueueListProps {
    queue: QueueItem[];
    error?: string | null;
    onAddClick: () => void;
    onVoteClick: (queueItemId: string) => void;
    hostId: string;
    currentUserId: string;
    isVoting: boolean;
}

export const QueueList = ({ queue, error, onAddClick, onVoteClick, hostId, currentUserId, isVoting }: QueueListProps) => {
    // Separate playing vs pending
    const nowPlaying = queue.find(item => item.status === 'playing') || queue[0];
    const upcoming = queue.filter(item => item._id !== nowPlaying?._id);

    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
    };

    return (
        <div className="bg-[#1C1408]/60 backdrop-blur-xl border border-[#D97706]/20 p-6 rounded-3xl h-full flex flex-col gap-8">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                    Error loading queue: {error}
                </div>
            )}
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#fef3c7] flex items-center gap-2">
                    <Music className="text-[#D97706]" size={24} />
                    Vibe Queue
                </h2>
                {(currentUserId === hostId || true) && (
                    <button 
                        onClick={onAddClick}
                        className="flex items-center gap-2 bg-[#D97706] hover:bg-[#b86504] text-[#4d2600] font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                    >
                        <Plus size={16} strokeWidth={3} />
                        Add Track
                    </button>
                )}
            </div>

            {/* Now Playing - CD Player Style */}
            <div className="flex flex-col gap-3">
                <h3 className="text-[#1DB954] uppercase tracking-widest text-xs font-bold font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
                    NOW PLAYING
                </h3>
                
                {nowPlaying ? (
                    <div className="relative overflow-hidden rounded-3xl border border-[#1DB954]/20 bg-linear-to-br from-[#1DB954]/20 via-[#1C1408] to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 shadow-2xl shadow-[#1DB954]/10">
                        {/* CD Animation */}
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
                            {/* CD Outer Edge */}
                            <div className="absolute inset-0 rounded-full border-4 border-[#1DB954]/20 bg-black animate-[spin_4s_linear_infinite] shadow-[0_0_30px_rgba(29,185,84,0.3)] flex items-center justify-center overflow-hidden">
                                <img src={nowPlaying.trackData.albumArtUrl} alt="Album Art" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
                                {/* CD Inner Ring */}
                                <div className="absolute w-12 h-12 bg-[#1C1408] rounded-full border border-zinc-800"></div>
                                <div className="absolute w-4 h-4 bg-zinc-900 rounded-full border border-black z-10"></div>
                            </div>
                        </div>

                        {/* Track Details & Controls */}
                        <div className="flex flex-col w-full text-center sm:text-left gap-4">
                            <div>
                                <h4 className="text-2xl sm:text-3xl font-black text-white truncate max-w-full drop-shadow-md">
                                    {nowPlaying.trackData.name}
                                </h4>
                                <p className="text-lg text-[#A8956A] font-medium truncate mt-1">
                                    {nowPlaying.trackData.artistName}
                                </p>
                            </div>

                            {/* Progress Bar (Static Mock) */}
                            <div className="flex flex-col gap-1 w-full mt-2">
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-[#1DB954] w-1/3 rounded-full relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-[#A8956A] font-mono mt-1">
                                    <span>{'0:00'}</span>
                                    <span>{formatDuration(nowPlaying.trackData.durationMs)}</span>
                                </div>
                            </div>

                            {/* Playback Controls */}
                            <div className="flex items-center justify-center sm:justify-start gap-6 mt-2">
                                <button className="text-[#A8956A] hover:text-white transition-colors">
                                    <Disc3 size={24} />
                                </button>
                                <button className="text-green-500 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(29,185,84,0.4)] rounded-full">
                                    <PlayCircle size={48} />
                                </button>
                                <button className="text-[#A8956A] hover:text-white transition-colors">
                                    <FastForward size={24} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 border border-dashed border-[#D97706]/30 rounded-3xl flex flex-col items-center justify-center text-center gap-4 bg-[#1C1408]/40">
                        <Disc3 className="text-[#D97706]/50 animate-spin-slow" size={64} />
                        <div>
                            <p className="text-[#fef3c7] text-xl font-bold">The Vibe is Quiet</p>
                            <p className="text-sm text-[#A8956A] mt-1">Add a track to the queue to get the room bumping.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Upcoming Queue */}
            <div className="flex flex-col gap-3 flex-1 min-h-0">
                <h3 className="text-[#A8956A] uppercase tracking-widest text-xs font-bold font-mono sticky top-0 bg-[#1C1408] z-10 py-2">
                    Up Next ({upcoming.length})
                </h3>
                
                <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                    {upcoming.length > 0 ? (
                        upcoming.map((track, i) => {
                            // Backend voters is an array of objects since populated
                            const hasVoted = (track.voters as unknown as PopulatedUser[]).some(v => v._id === currentUserId);

                            return (
                                <div key={track._id} className="flex items-center gap-4 p-3 rounded-2xl bg-black/20 hover:bg-black/40 border border-transparent hover:border-white/10 transition-all group shadow-sm">
                                    {/* Number / Cover Box */}
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-md">
                                        {track.trackData.albumArtUrl ? (
                                            <img src={track.trackData.albumArtUrl} alt="Art" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-[#2A1E08]"></div>
                                        )}
                                        <div className="absolute top-0 left-0 bg-black/70 backdrop-blur-sm text-[#A8956A] font-bold text-xs px-2 py-0.5 rounded-br-lg">
                                            #{i + 1}
                                        </div>
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="flex-col flex flex-1 min-w-0 justify-center">
                                        <h4 className="text-[#fef3c7] font-bold truncate text-base">{track.trackData.name}</h4>
                                        <p className="text-[#A8956A] text-sm truncate mt-0.5">{track.trackData.artistName}</p>
                                    </div>

                                    {/* Duration */}
                                    <div className="hidden sm:block text-xs font-mono text-[#A8956A] px-2 opacity-50">
                                        {formatDuration(track.trackData.durationMs)}
                                    </div>

                                    {/* Vote Button */}
                                    <button 
                                        onClick={() => onVoteClick(track._id)}
                                        disabled={isVoting}
                                        className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl border transition-all ${
                                            hasVoted 
                                            ? 'bg-[#1DB954]/20 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 shadow-[0_0_10px_rgba(29,185,84,0.2)]' 
                                            : 'bg-white/5 border-white/10 text-[#A8956A] hover:bg-white/10 hover:text-white'
                                        } disabled:opacity-50 disabled:cursor-wait`}
                                    >
                                        <ThumbsUp size={18} className={hasVoted ? 'fill-current' : ''} />
                                        <span className="text-xs font-bold leading-none">{track.score}</span>
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-[#A8956A] text-sm py-12 border border-dashed border-[#D97706]/20 rounded-2xl flex flex-col items-center gap-3">
                            <Music size={24} className="opacity-50" />
                            The queue is empty. Keep the vibe alive by adding more!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
