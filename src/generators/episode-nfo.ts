import { EpisodeData } from '../types.js';
import { XML_HEADER, elem, escapeXml } from './xml-utils.js';

/**
 * Generates a Jellyfin/Kodi-compatible episode .nfo XML string.
 */
export function generateEpisodeNfo(data: EpisodeData): string {
    let xml = XML_HEADER;
    xml += '<episodedetails>\n';
    xml += elem('title', data.title);
    xml += elem('showtitle', data.showTitle);
    xml += elem('season', data.season);
    xml += elem('episode', data.episode);
    xml += elem('plot', data.plot);
    xml += elem('outline', data.outline);
    if (data.runtime) xml += elem('runtime', data.runtime);
    if (data.airDate) xml += elem('aired', data.airDate);
    else if (data.releaseDate) xml += elem('aired', data.releaseDate);
    if (data.rating) xml += elem('rating', data.rating);
    if (data.contentRating) xml += elem('mpaa', data.contentRating);
    if (data.playcount != null) xml += elem('playcount', data.playcount);
    if (data.dateadded) xml += elem('dateadded', data.dateadded);

    if (data.imdbId) {
        xml += `  <uniqueid type="imdb" default="true">${escapeXml(data.imdbId)}</uniqueid>\n`;
    }
    if (data.tmdbId) {
        xml += `  <uniqueid type="tmdb">${escapeXml(data.tmdbId)}</uniqueid>\n`;
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

    xml += '</episodedetails>\n';
    return xml;
}
