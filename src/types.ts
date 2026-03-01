export interface ActorData {
    name: string;
    role?: string;
    type?: string;
    sortOrder?: number;
    thumb?: string;
}

export interface BaseMediaData {
    title?: string;
    originalTitle?: string;
    year?: number;
    plot?: string;
    outline?: string;
    rating?: number;
    contentRating?: string;
    releaseDate?: string;
    runtime?: number;
    playcount?: number;
    dateadded?: string;
    lockdata?: boolean;
    genres?: string[];
    tags?: string[];
    directors?: string[];
    writers?: string[];
    actors?: (string | ActorData)[];
    imdbId?: string;
    tmdbId?: string;
    tvdbId?: string;
    art?: { poster?: string; fanart?: string };
}

export interface MovieData extends BaseMediaData {
    tagline?: string;
    sortTitle?: string;
    set?: string;
    trailer?: string;
    studios?: string[];
    countries?: string[];
    criticRating?: number;
    collectionNumber?: number;
}

export interface EpisodeData extends BaseMediaData {
    showTitle?: string;
    season?: number;
    episode?: number;
    airDate?: string;
    sonarId?: string;
}

export interface ShowData extends BaseMediaData {
    sortTitle?: string;
    status?: string;
    studios?: string[];
}
