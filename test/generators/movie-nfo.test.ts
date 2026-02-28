import { describe, it, expect } from 'vitest';
import { generateMovieNfo } from '../../src/index.js';

describe('Movie NFO Generator', () => {
    it('generates movie NFO', () => {
        const xml = generateMovieNfo({
            title: 'Test Movie',
            originalTitle: 'Original Test Movie',
            sortTitle: 'Test Movie 01',
            set: 'Test Collection',
            year: 2023,
            tagline: 'A cool tagline',
            plot: 'A test plot with <>&"\' special chars.',
            outline: 'A short outline.',
            rating: 8.5,
            runtime: 120,
            contentRating: 'PG-13',
            releaseDate: '2023-01-01',
            trailer: 'plugin://plugin.video.youtube/?action=play_video&videoid=xyz',
            playcount: 1,
            dateadded: '2024-01-01',
            imdbId: 'tt1234567',
            tmdbId: '7654321',
            genres: ['Action'],
            studios: ['Test Studio'],
            countries: ['US', 'CA'],
            directors: ['Dir One'],
            writers: ['Writer One'],
            actors: ['John Doe', 'Jane Smith']
        });

        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<movie>\n')).toBe(true);
        expect(xml.endsWith('</movie>\n')).toBe(true);
        expect(xml).toContain('<title>Test Movie</title>');
        expect(xml).toContain('<originaltitle>Original Test Movie</originaltitle>');
        expect(xml).toContain('<sorttitle>Test Movie 01</sorttitle>');
        expect(xml).toContain('<set>Test Collection</set>');
        expect(xml).toContain('<tagline>A cool tagline</tagline>');
        expect(xml).toContain('<year>2023</year>');
        expect(xml).toContain('A test plot with &lt;&gt;&amp;&quot;&apos; special chars.');
        expect(xml).toContain('<outline>A short outline.</outline>');
        expect(xml).toContain('<runtime>120</runtime>');
        expect(xml).toContain('<rating>8.5</rating>');
        expect(xml).toContain('<mpaa>PG-13</mpaa>');
        expect(xml).toContain('<premiered>2023-01-01</premiered>');
        expect(xml).toContain('<trailer>plugin://plugin.video.youtube/?action=play_video&amp;videoid=xyz</trailer>');
        expect(xml).toContain('<playcount>1</playcount>');
        expect(xml).toContain('<dateadded>2024-01-01</dateadded>');
        expect(xml).toContain('<uniqueid type="imdb" default="true">tt1234567</uniqueid>');
        expect(xml).toContain('<uniqueid type="tmdb">7654321</uniqueid>');
        expect(xml).toContain('<genre>Action</genre>');
        expect(xml).toContain('<studio>Test Studio</studio>');
        expect(xml).toContain('<country>US</country>');
        expect(xml).toContain('<country>CA</country>');
        expect(xml).toContain('<director>Dir One</director>');
        expect(xml).toContain('<credits>Writer One</credits>');
        expect(xml).toContain('<name>John Doe</name>');
        expect(xml).toContain('<name>Jane Smith</name>');
    });

    it('generates movie NFO with minimal data (tests empty/null)', () => {
        const xml = generateMovieNfo({
            title: 'Empty Movie'
        });
        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<movie>\n')).toBe(true);
        expect(xml.endsWith('</movie>\n')).toBe(true);
        expect(xml).toContain('<title>Empty Movie</title>');
        expect(xml).not.toContain('<tagline>');
        expect(xml).not.toContain('<year>');
    });
});
