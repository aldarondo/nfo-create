import { MovieData } from '../types.js';
import { XML_HEADER, elem, escapeXml } from './xml-utils.js';

/**
 * Generates a Jellyfin/Kodi-compatible movie.nfo XML string.
 */
export function generateMovieNfo(data: MovieData): string {
    let xml = XML_HEADER;
    xml += '<movie>\n';
    xml += elem('title', data.title);
    xml += elem('originaltitle', data.originalTitle || data.title);
    if (data.sortTitle) xml += elem('sorttitle', data.sortTitle);
    if (data.set) xml += elem('set', data.set);
    if (data.tagline) xml += elem('tagline', data.tagline);
    if (data.year) xml += elem('year', data.year);
    xml += elem('plot', data.plot);
    xml += elem('outline', data.outline);
    if (data.runtime) xml += elem('runtime', data.runtime);
    if (data.rating) xml += elem('rating', data.rating);
    if (data.contentRating) xml += elem('mpaa', data.contentRating);
    if (data.releaseDate) xml += elem('premiered', data.releaseDate);
    if (data.trailer) xml += elem('trailer', data.trailer);
    if (data.playcount != null) xml += elem('playcount', data.playcount);
    if (data.dateadded) xml += elem('dateadded', data.dateadded);

    if (data.imdbId) {
        xml += `  <uniqueid type="imdb" default="true">${escapeXml(data.imdbId)}</uniqueid>\n`;
    }
    if (data.tmdbId) {
        xml += `  <uniqueid type="tmdb">${escapeXml(data.tmdbId)}</uniqueid>\n`;
    }

    if (Array.isArray(data.genres)) {
        for (const genre of data.genres) {
            xml += elem('genre', genre);
        }
    }

    if (Array.isArray(data.studios)) {
        for (const studio of data.studios) {
            xml += elem('studio', studio);
        }
    }

    if (Array.isArray(data.countries)) {
        for (const country of data.countries) {
            xml += elem('country', country);
        }
    }

    if (Array.isArray(data.directors)) {
        for (const director of data.directors) {
            xml += elem('director', director);
        }
    }

    if (Array.isArray(data.writers)) {
        for (const writer of data.writers) {
            xml += elem('credits', writer);
        }
    }

    if (Array.isArray(data.actors)) {
        for (const actor of data.actors) {
            xml += '  <actor>\n';
            xml += `    <name>${escapeXml(String(actor))}</name>\n`;
            xml += '  </actor>\n';
        }
    }

    xml += '</movie>\n';
    return xml;
}
