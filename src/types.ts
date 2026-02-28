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
    genres?: string[];
    directors?: string[];
    writers?: string[];
    actors?: string[];
    imdbId?: string;
    tmdbId?: string;
}

export interface MovieData extends BaseMediaData {
    tagline?: string;
    sortTitle?: string;
    set?: string;
    trailer?: string;
    studios?: string[];
    countries?: string[];
}

export interface EpisodeData extends BaseMediaData {
    showTitle?: string;
    season?: number;
    episode?: number;
    airDate?: string;
}

export interface ShowData extends BaseMediaData {
    sortTitle?: string;
    status?: string;
    studios?: string[];
}
