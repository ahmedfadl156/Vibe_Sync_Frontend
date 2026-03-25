import { SpotifyTrack } from '@/types/spotify';
import { TrackCard } from './TrackCard';

export const TopTracks = ({ tracks }: { tracks: SpotifyTrack[] }) => {
    if (!tracks || tracks.length === 0) return null;

    return (
        <section className="mt-16 relative">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-linear-to-r from-[#fef3c7] to-[#D97706] bg-clip-text text-transparent">
                    Top Tracks
                </h2>
                <div className="h-px flex-1 bg-linear-to-r from-[#D97706]/20 to-transparent ml-6"></div>
            </div>

            <div className="flex flex-col gap-2">
                {tracks.map((track, i) => (
                    <TrackCard key={track.id} track={track} index={i} />
                ))}
            </div>
        </section>
    );
};
