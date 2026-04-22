# nfo-create

## What This Project Is
Lightweight, dependency-free npm library to programmatically generate Jellyfin/Kodi-compatible .nfo XML metadata strings from JavaScript/TypeScript objects. Provides `generateMovieNfo()`, `generateEpisodeNfo()`, and `generateShowNfo()`. Used as a core dependency by ds-video-to-jellyfin and vsmeta-to-nfo.

## Tech Stack
- Node.js / TypeScript
- vitest (testing)
- tsup (bundler)
- ESLint
- Changesets (versioning)
- No runtime dependencies

## Key Decisions
- Zero runtime dependencies — intentional for use as a library dependency
- Pure string generation — no file I/O (callers handle writing)
- Follows Jellyfin/Kodi .nfo XML schema exactly
- Published as npm package; versioned via Changesets

## Session Startup Checklist
1. Read ROADMAP.md to find the current active task
2. Check MEMORY.md if it exists — it contains auto-saved learnings from prior sessions
3. Run `npm install` if node_modules are stale
4. Run `npm test` to verify all tests pass before making changes
5. Do not break the public API — downstream packages depend on it

## Key Files
- `src/` — library source (generateMovieNfo, generateEpisodeNfo, generateShowNfo)
- `test/` — vitest tests
- `dist/` — compiled output
- `CHANGELOG.md` — version history

---
@~/Documents/GitHub/CLAUDE.md

## Git Rules
- Never create pull requests. Push directly to main.
- solo/auto-push OK
