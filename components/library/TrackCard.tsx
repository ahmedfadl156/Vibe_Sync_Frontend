import Image from 'next/image';
import Link from 'next/link';
import { SpotifyTrack } from '@/types/spotify';
import { Play } from 'lucide-react';

export const TrackCard = ({ track, index }: { track: SpotifyTrack; index: number }) => {
    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
    };

    const albumImage = track.album.images[2] || track.album.images[1] || track.album.images[0];

    return (
        <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#1C1408]/60 transition-colors border border-transparent hover:border-[#D97706]/10">
            <div className="flex items-center gap-4">
                {/* Index / Play Button on Hover */}
                <div className="w-8 flex justify-center items-center text-[#A8956A] font-bold">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <Link 
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden group-hover:flex text-white hover:text-[#1DB954]"
                    >
                        <Play size={20} fill="currentColor" />
                    </Link>
                </div>

                {/* Album Art */}
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#2A1E08]">
                    {albumImage && (
                        <Image
                            src={albumImage.url}
                            alt={track.album.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Track Info */}
                <div className="flex flex-col max-w-[200px] sm:max-w-xs md:max-w-md">
                    <h4 className="text-[#fef3c7] font-medium truncate group-hover:text-white transition-colors">
                        {track.name}
                    </h4>
                    <p className="text-sm text-[#A8956A] truncate">
                        {track.artists.map(a => a.name).join(', ')}
                    </p>
                </div>
            </div>

            {/* Album Name (Hidden on very small screens) */}
            <div className="hidden md:flex text-sm text-[#A8956A] truncate max-w-[200px]">
                {track.album.name}
            </div>

            {/* Duration */}
            <div className="text-sm text-[#A8956A] w-12 text-right">
                {formatDuration(track.duration_ms)}
            </div>
        </div>
    );
};
