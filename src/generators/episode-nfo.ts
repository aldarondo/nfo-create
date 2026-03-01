import { EpisodeData, ActorData } from '../types.js';
import { XML_HEADER, elem, escapeXml } from './xml-utils.js';

function actorXml(actor: string | ActorData): string {
    const a: ActorData = typeof actor === 'string' ? { name: actor } : actor;
    let xml = '  <actor>\n';
    xml += `    <name>${escapeXml(a.name)}</name>\n`;
    if (a.role)      xml += `    <role>${escapeXml(a.role)}</role>\n`;
    if (a.type)      xml += `    <type>${escapeXml(a.type)}</type>\n`;
    if (a.sortOrder != null) xml += `    <sortorder>${a.sortOrder}</sortorder>\n`;
    if (a.thumb)     xml += `    <thumb>${escapeXml(a.thumb)}</thumb>\n`;
    xml += '  </actor>\n';
    return xml;
}

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
    if (data.lockdata != null) xml += elem('lockdata', String(data.lockdata));

    if (data.imdbId)  xml += `  <uniqueid type="imdb" default="true">${escapeXml(data.imdbId)}</uniqueid>\n`;
    if (data.tmdbId)  xml += `  <uniqueid type="tmdb">${escapeXml(data.tmdbId)}</uniqueid>\n`;
    if (data.tvdbId)  xml += `  <uniqueid type="tvdb" default="true">${escapeXml(data.tvdbId)}</uniqueid>\n`;
    if (data.sonarId) xml += `  <uniqueid type="sonarr">${escapeXml(data.sonarId)}</uniqueid>\n`;

    if (Array.isArray(data.tags))      for (const t of data.tags)      xml += elem('tag', t);
    if (Array.isArray(data.directors)) for (const d of data.directors) xml += elem('director', d);
    if (Array.isArray(data.writers))   for (const w of data.writers)   xml += elem('credits', w);
    if (Array.isArray(data.actors))    for (const a of data.actors)    xml += actorXml(a);

    if (data.art) {
        xml += '  <art>\n';
        if (data.art.poster)  xml += `    <poster>${escapeXml(data.art.poster)}</poster>\n`;
        if (data.art.fanart)  xml += `    <fanart>${escapeXml(data.art.fanart)}</fanart>\n`;
        xml += '  </art>\n';
    }

    xml += '</episodedetails>\n';
    return xml;
}
