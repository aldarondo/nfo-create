# nfo-create — Roadmap

## Current Milestone
✅ Stable library — actively used as a dependency by ds-video-to-jellyfin and vsmeta-to-nfo

### 🔨 In Progress
[Empty]

### 🟢 Ready (Next Up)
[Empty — library is stable; update only when downstream needs require schema changes]

### 📋 Backlog
- Add support for `musicvideo` .nfo format (if needed by future tools)
- Add support for `artist` and `album` .nfo formats (Kodi music library)
- Validate generated XML against official Jellyfin/Kodi schema in CI

### 🔴 Blocked
[Empty]

## ✅ Completed
- `generateMovieNfo()` — movie.nfo generation
- `generateEpisodeNfo()` — episodedetails.nfo generation
- `generateShowNfo()` — tvshow.nfo generation
- Full vitest test suite
- Zero runtime dependencies
- Published as npm package with Changesets versioning
