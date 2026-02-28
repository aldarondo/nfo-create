import { describe, it, expect } from 'vitest';
import { generateShowNfo } from '../../src/index.js';

describe('Show NFO Generator', () => {
    it('generates show NFO', () => {
        const xml = generateShowNfo({
            title: 'Awesome Show',
            sortTitle: 'Awesome Show 01',
            status: 'Continuing',
            year: 2020,
            plot: 'Show plot.',
            outline: 'Brief show outline.',
            runtime: 30,
            playcount: 5,
            dateadded: '2024-01-03',
            rating: 8.8,
            contentRating: 'TV-14',
            imdbId: 'tt8888888',
            tmdbId: '77777',
            genres: ['Action', 'Drama'],
            studios: ['Awesome Network'],
            directors: ['Dir Show'],
            actors: ['Show Actor']
        });

        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<tvshow>\n')).toBe(true);
        expect(xml.endsWith('</tvshow>\n')).toBe(true);
        expect(xml).toContain('<title>Awesome Show</title>');
        expect(xml).toContain('<sorttitle>Awesome Show 01</sorttitle>');
        expect(xml).toContain('<status>Continuing</status>');
        expect(xml).toContain('<year>2020</year>');
        expect(xml).toContain('<plot>Show plot.</plot>');
        expect(xml).toContain('<outline>Brief show outline.</outline>');
        expect(xml).toContain('<runtime>30</runtime>');
        expect(xml).toContain('<playcount>5</playcount>');
        expect(xml).toContain('<dateadded>2024-01-03</dateadded>');
        expect(xml).toContain('<rating>8.8</rating>');
        expect(xml).toContain('<mpaa>TV-14</mpaa>');
        expect(xml).toContain('<uniqueid type="imdb" default="true">tt8888888</uniqueid>');
        expect(xml).toContain('<uniqueid type="tmdb">77777</uniqueid>');
        expect(xml).toContain('<genre>Action</genre>');
        expect(xml).toContain('<genre>Drama</genre>');
        expect(xml).toContain('<studio>Awesome Network</studio>');
        expect(xml).toContain('<director>Dir Show</director>');
        expect(xml).toContain('<name>Show Actor</name>');
    });

    it('generates show NFO with minimal data', () => {
        const xml = generateShowNfo({
            title: '' // tests empty element handling in xml-utils
        });
        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<tvshow>\n')).toBe(true);
        expect(xml.endsWith('</tvshow>\n')).toBe(true);
        expect(xml).not.toContain('<title>');
        expect(xml).not.toContain('<year>');
    });
});
