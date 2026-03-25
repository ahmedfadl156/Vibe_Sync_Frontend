import Image from 'next/image';
import Link from 'next/link';
import { SpotifyArtist } from '@/types/spotify';
import { ExternalLink } from 'lucide-react';

export const ArtistCard = ({ artist, index }: { artist: SpotifyArtist; index: number }) => {
    const image = artist.images[1] || artist.images[0] || artist.images[2];

    return (
        <div className="group relative rounded-2xl bg-[#1C1408]/40 border border-[#D97706]/10 p-4 hover:bg-[#1C1408]/80 hover:border-[#D97706]/30 transition-all duration-300">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 shadow-lg shadow-black/40">
                {image ? (
                    <Image
                        src={image.url}
                        alt={artist.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-[#2A1E08] flex items-center justify-center">
                        <span className="text-[#A8956A]">No Image</span>
                    </div>
                )}
                
                {/* Overlay with rank number */}
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 font-bold text-[#EBE0DA]">
                    {index + 1}
                </div>

                {/* Spotify Link Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link 
                        href={artist.external_urls.spotify} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#1DB954] text-black w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#1ed760] transition-all shadow-lg shadow-[#1DB954]/20"
                    >
                        <ExternalLink size={20} className="ml-0.5" />
                    </Link>
                </div>
            </div>

            <h3 className="text-xl font-bold text-[#fef3c7] truncate">{artist.name}</h3>
            <p className="text-sm text-[#A8956A] capitalize mt-1">
                {artist.type}
            </p>
        </div>
    );
};
