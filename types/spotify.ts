export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    type: string;
    uri: string;
    href: string;
    images: SpotifyImage[];
    external_urls: SpotifyExternalUrls;
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    album_type: string;
    type: string;
    uri: string;
    href: string;
    images: SpotifyImage[];
    external_urls: SpotifyExternalUrls;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    is_playable: boolean;
    artists: Pick<SpotifyArtist, "id" | "name" | "type" | "uri" | "href" | "external_urls">[];
}

export interface SpotifyTrack {
    id: string;
    name: string;
    type: string;
    uri: string;
    href: string;
    external_urls: SpotifyExternalUrls;
    is_playable: boolean;
    is_local: boolean;
    duration_ms: number;
    explicit: boolean;
    track_number: number;
    disc_number: number;
    album: SpotifyAlbum;
    artists: Pick<SpotifyArtist, "id" | "name" | "type" | "uri" | "href" | "external_urls">[];
}

export interface LibraryResponseData {
    artists: SpotifyArtist[];
    tracks: SpotifyTrack[];
}

export interface LibraryResponse {
    status: string;
    data: LibraryResponseData;
}
