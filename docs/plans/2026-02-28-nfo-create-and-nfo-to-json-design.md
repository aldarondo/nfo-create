# Design: nfo-create updates + nfo-to-json

**Date:** 2026-02-28
**Status:** Approved

---

## Overview

Two coordinated changes:

1. **nfo-create** — non-breaking type/generator enhancements so it covers the full field set found in real Kodi/Jellyfin NFO files.
2. **nfo-to-json** — new repo (cloned from `aldarondo/nfo-to-json`) that crawls directories of `.nfo` files, parses them, and produces either per-file JSON or aggregate `movies.json` / `tv-shows.json`. Uses `nfo-create` types as its public output types.

---

## Part 1 — nfo-create changes

### New `ActorData` interface (non-breaking)

`actors` stays as a single field but changes from `string[]` to `(string | ActorData)[]`.
Existing callers passing plain strings continue to work unchanged.

```typescript
export interface ActorData {
    name: string;
    role?: string;
    type?: string;       // "Actor" | "Director" | "Writer" | ...
    sortOrder?: number;
    thumb?: string;
}

// In BaseMediaData:
actors?: (string | ActorData)[];
```

Generators resolve names via `typeof actor === 'string' ? actor : actor.name`, and conditionally emit `<role>`, `<type>`, `<sortorder>`, `<thumb>` sub-elements when the richer form is used.

### New fields — Tier 1

**`BaseMediaData`** additions:
| Field | Type | XML element |
|---|---|---|
| `tvdbId` | `string` | `<uniqueid type="tvdb">` |
| `art` | `{ poster?: string; fanart?: string }` | `<art><poster>…</poster><fanart>…</fanart></art>` |
| `tags` | `string[]` | repeated `<tag>` |

**`MovieData`** additions:
| Field | Type | XML element |
|---|---|---|
| `criticRating` | `number` | `<criticrating>` |

**Generator fix — movie `releaseDate`:**
`movie-nfo.ts` currently emits only `<premiered>`. Real NFO files carry both `<premiered>` and `<releasedate>`. The generator will emit both from the single `releaseDate` property.

### New fields — Tier 2

**`BaseMediaData`** additions:
| Field | Type | XML element |
|---|---|---|
| `lockdata` | `boolean` | `<lockdata>` |

**`EpisodeData`** additions:
| Field | Type | XML element |
|---|---|---|
| `sonarId` | `string` | `<uniqueid type="sonarr">` |

**`MovieData`** additions:
| Field | Type | XML element |
|---|---|---|
| `collectionNumber` | `number` | `<collectionnumber>` |

### Version bump
Minor version bump (1.x → 1.y) — all changes are backward-compatible.

---

## Part 2 — nfo-to-json (new repo)

### Source structure

```
src/
  types.ts        — re-exports MovieData, EpisodeData, ShowData, ActorData
                    from nfo-create; adds ParsedNfo union + TvShowSummary
  parser.ts       — parseNfo(filePath): Promise<ParsedNfo>
  crawler.ts      — crawlDir(dir): AsyncIterable<string>
  aggregator.ts   — buildMoviesJson(), buildTvShowsJson()
  cli.ts          — Commander CLI (thin wrapper around above)
  index.ts        — public API exports (all functions + types)
test/
  parser.test.ts
  crawler.test.ts
  aggregator.test.ts
  cli.test.ts
samples/           — existing NFO sample files (used as test fixtures)
```

### Public API (programmatic use)

```typescript
import { crawlDir, parseNfo, buildMoviesJson, buildTvShowsJson } from 'nfo-to-json';
import type { ParsedNfo, MovieData, EpisodeData, TvShowSummary } from 'nfo-to-json';
```

All core logic lives in exported functions; CLI is a thin consumer of them.

### CLI

```
nfo-to-json [options]

Options:
  -i, --input <path>     Directory to scan for .nfo files (required)
  --aggregate            Write movies.json + tv-shows.json instead of individual files
  --output <path>        Output directory for aggregate files (default: same as --input)
  --dry-run              Preview what would be written without touching disk
  -v, --verbose          Show per-file detail
  -V, --version
  -h, --help
```

**Without `--aggregate`:** writes `<basename>.json` alongside each `.nfo`.
**With `--aggregate`:** skips individual files; writes `movies.json` + `tv-shows.json` to `--output` (or `--input` root).

### NFO type detection

Root XML element determines type:

| Root element | Output type |
|---|---|
| `<movie>` | `MovieData` |
| `<episodedetails>` | `EpisodeData` |
| `<tvshow>` | `ShowData` |
| Anything else | warning emitted, file skipped |

### Aggregate output shapes

**`movies.json`**
```json
[ /* array of MovieData objects */ ]
```

**`tv-shows.json`**
```json
[
  {
    "title": "Chainsaw Man",
    "year": 2022,
    "seasons": [
      { "season": 1, "episodeCount": 12 }
    ]
  }
]
```
Grouped by `(showTitle, year)`, sorted alphabetically by title.

### Tooling uplift (from fork)

| Before | After |
|---|---|
| `jest` + `ts-jest` + `babel-jest` | `vitest` + `@vitest/coverage-v8` |
| `xml2js` | `fast-xml-parser` |
| `eslint v8` + `eslint-config-next/turbo` | `typescript-eslint v9` flat config |
| `tsc` build | `tsup` (ESM + CJS dual output) |
| `commander` v11 in devDeps | `commander` v12 in deps |
| `execa`, `next`, `turbo`, `eslint-config-*` | removed |
| Node >= 14 | Node >= 18 |

### Security controls

- Input directory validated to exist before scanning
- Output paths resolved with `path.resolve()`; output cannot escape to arbitrary locations
- `fast-xml-parser` used with `allowPrototypes: false` to prevent prototype pollution
- Per-file size cap: refuse to parse NFO files > 10 MB
- No eval/execution of parsed content

### Test coverage target: 100%

| Module | Key scenarios |
|---|---|
| `parser.ts` | movie NFO, episode NFO, tvshow NFO, unknown root, malformed XML, oversized file, missing optional fields |
| `crawler.ts` | empty dir, deep nesting, mixed file types, no `.nfo` files present |
| `aggregator.ts` | movies grouping, TV grouping/sorting, multi-season, multiple shows, empty inputs |
| `cli.ts` | valid run, missing `--input`, nonexistent dir, aggregate mode, dry-run, verbose |
