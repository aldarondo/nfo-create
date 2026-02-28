# nfo-create

A lightweight, dependency-free utility to generate Jellyfin/Kodi compatible `.nfo` XML strings from programmatic JavaScript/TypeScript objects.

## Installation

```bash
npm install nfo-create
```

## Usage

```typescript
import { generateMovieNfo, generateEpisodeNfo, generateShowNfo } from 'nfo-create';

const movieXml = generateMovieNfo({
  title: 'My Awesome Movie',
  year: 2024,
  plot: 'A great plot summary.',
  imdbId: 'tt1234567',
  actors: ['Actor 1', 'Actor 2']
});

console.log(movieXml);
```
