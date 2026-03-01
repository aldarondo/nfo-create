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

    it('emits releasedate alongside premiered', () => {
        const xml = generateMovieNfo({ title: 'T', releaseDate: '2023-05-01' });
        expect(xml).toContain('<premiered>2023-05-01</premiered>');
        expect(xml).toContain('<releasedate>2023-05-01</releasedate>');
    });

    it('emits criticrating when provided', () => {
        const xml = generateMovieNfo({ title: 'T', criticRating: 87 });
        expect(xml).toContain('<criticrating>87</criticrating>');
    });

    it('emits collectionnumber when provided', () => {
        const xml = generateMovieNfo({ title: 'T', collectionNumber: 404609 });
        expect(xml).toContain('<collectionnumber>404609</collectionnumber>');
    });

    it('emits lockdata when provided', () => {
        const xml = generateMovieNfo({ title: 'T', lockdata: false });
        expect(xml).toContain('<lockdata>false</lockdata>');
    });

    it('emits tags when provided', () => {
        const xml = generateMovieNfo({ title: 'T', tags: ['martial arts', 'sequel'] });
        expect(xml).toContain('<tag>martial arts</tag>');
        expect(xml).toContain('<tag>sequel</tag>');
    });

    it('emits art block when provided', () => {
        const xml = generateMovieNfo({ title: 'T', art: { poster: '/media/folder.jpg', fanart: '/media/backdrop.jpg' } });
        expect(xml).toContain('<art>');
        expect(xml).toContain('<poster>/media/folder.jpg</poster>');
        expect(xml).toContain('<fanart>/media/backdrop.jpg</fanart>');
        expect(xml).toContain('</art>');
    });

    it('emits tvdbId when provided', () => {
        const xml = generateMovieNfo({ title: 'T', tvdbId: '9999' });
        expect(xml).toContain('<uniqueid type="tvdb">9999</uniqueid>');
    });

    it('emits rich actor data when ActorData objects provided', () => {
        const xml = generateMovieNfo({
            title: 'T',
            actors: [
                { name: 'Keanu Reeves', role: 'John Wick', type: 'Actor', sortOrder: 0, thumb: '/people/K/Keanu Reeves/folder.jpg' },
                'Plain Name',
            ]
        });
        expect(xml).toContain('<name>Keanu Reeves</name>');
        expect(xml).toContain('<role>John Wick</role>');
        expect(xml).toContain('<type>Actor</type>');
        expect(xml).toContain('<sortorder>0</sortorder>');
        expect(xml).toContain('<thumb>/people/K/Keanu Reeves/folder.jpg</thumb>');
        expect(xml).toContain('<name>Plain Name</name>');
        expect(xml).not.toContain('<role>Plain Name</role>');
    });
});
