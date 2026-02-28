import { describe, it, expect } from 'vitest';
import { generateEpisodeNfo } from '../../src/index.js';

describe('Episode NFO Generator', () => {
    it('generates episode NFO', () => {
        const xml = generateEpisodeNfo({
            title: 'Pilot',
            showTitle: 'Awesome Show',
            season: 1,
            episode: 1,
            plot: 'The beginning.',
            outline: 'Brief outline.',
            runtime: 45,
            playcount: 0,
            dateadded: '2024-01-02',
            airDate: '2024-01-01',
            rating: 9.0,
            contentRating: 'TV-MA',
            imdbId: 'tt9999999',
            tmdbId: '98765',
            directors: ['Dir Two'],
            writers: ['Writer Two'],
            actors: ['Actor One']
        });

        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<episodedetails>\n')).toBe(true);
        expect(xml.endsWith('</episodedetails>\n')).toBe(true);
        expect(xml).toContain('<title>Pilot</title>');
        expect(xml).toContain('<showtitle>Awesome Show</showtitle>');
        expect(xml).toContain('<season>1</season>');
        expect(xml).toContain('<episode>1</episode>');
        expect(xml).toContain('<plot>The beginning.</plot>');
        expect(xml).toContain('<outline>Brief outline.</outline>');
        expect(xml).toContain('<runtime>45</runtime>');
        expect(xml).toContain('<playcount>0</playcount>');
        expect(xml).toContain('<dateadded>2024-01-02</dateadded>');
        expect(xml).toContain('<aired>2024-01-01</aired>');
        expect(xml).toContain('<rating>9</rating>');
        expect(xml).toContain('<mpaa>TV-MA</mpaa>');
        expect(xml).toContain('<uniqueid type="imdb" default="true">tt9999999</uniqueid>');
        expect(xml).toContain('<uniqueid type="tmdb">98765</uniqueid>');
        expect(xml).toContain('<director>Dir Two</director>');
        expect(xml).toContain('<credits>Writer Two</credits>');
        expect(xml).toContain('<name>Actor One</name>');
    });

    it('generates episode NFO fallback releaseDate when airDate missing', () => {
        const xml = generateEpisodeNfo({
            title: 'Pilot 2',
            releaseDate: '2022-02-02'
        });
        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<episodedetails>\n')).toBe(true);
        expect(xml.endsWith('</episodedetails>\n')).toBe(true);
        expect(xml).toContain('<aired>2022-02-02</aired>');
    });

    it('generates episode NFO with minimal data', () => {
        const xml = generateEpisodeNfo({
            title: 'Pilot 3'
        });
        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<episodedetails>\n')).toBe(true);
        expect(xml.endsWith('</episodedetails>\n')).toBe(true);
        expect(xml).toContain('<title>Pilot 3</title>');
    });
});
