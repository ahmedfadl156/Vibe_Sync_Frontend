import { SpotifyArtist } from '@/types/spotify';
import { ArtistCard } from './ArtistCard';

export const TopArtists = ({ artists }: { artists: SpotifyArtist[] }) => {
    if (!artists || artists.length === 0) return null;

    return (
        <section className="mt-16 relative">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-linear-to-r from-[#fef3c7] to-[#D97706] bg-clip-text text-transparent">
                    Top Artists
                </h2>
                <div className="h-px flex-1 bg-linear-to-r from-[#D97706]/20 to-transparent ml-6"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {artists.map((artist, i) => (
                    <ArtistCard key={artist.id} artist={artist} index={i} />
                ))}
            </div>
        </section>
    );
};
