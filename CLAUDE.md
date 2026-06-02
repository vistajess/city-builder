# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Next.js + Turbopack) on http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`)

Package manager is **npm** (`package-lock.json`). There is **no test framework** configured — no `test` script and no test files exist.

Environment: the weather API route needs `OPENWEATHER_API_KEY` in `.env.local` (note: there is a hardcoded dev-fallback key in source at `src/app/api/weather/route.ts` that should not be relied on).

## Stack

Next.js 15.2 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind CSS v4 (configured via CSS, **no `tailwind.config`**) · TanStack React Query v5 · Radix UI primitives wrapped shadcn-style in `src/components/ui/` · localStorage for persistence.

Path alias: imports resolve as `@/*` from repo root, so app code uses `@/src/...`.

## Architecture

Single-page app (`/`) at `src/app/page.tsx`; the only server endpoint is `GET /api/weather` (`src/app/api/weather/route.ts`, an OpenWeather proxy). Provider tree: `layout.tsx` → `HouseContextProvider` → `Providers` (React Query) → page. House state wraps everything; React Query is used only for weather.

### Domain model (`src/types/`)
Hierarchy is **Location → House → Floor**:
- `House` — `id`, `name`, `color`, `totalFloors`, `floors: Floor[]`, `location`.
- `Floor` — **denormalized**: carries `houseId`/`houseName` plus `floorId`, `level`, `color`. Floors are *derived*, not authored — `generateFloors()` in `house-context.tsx` rebuilds the `Floor[]` from `totalFloors` + house `color` whenever either changes.
- `Location` — comes from a fixed `AVAILABLE_LOCATIONS` list in `src/constants/location.ts`; users don't create locations.
- There is **no Building or Roof entity** — the "roof" is purely visual UI (`src/components/house/roof-popover.tsx`).

### State management — split Context (no Redux/Zustand)
The key structural pattern lives in `src/contexts/`, deliberately split to limit re-renders:
- `house-data.context.tsx` — read state (`useHouseData()`): `houses: Map<string,House>`, `selectedHouse`, `selectedFloor`, `savedLocation`.
- `house-actions.context.tsx` — mutators (`useHouseActions()`): `addHouse`, `updateHouse`, `deleteHouse`, `cloneHouse`, `updateFloor`, `setSelected*`, etc.
- `house-context.tsx` — the single `HouseContextProvider` implementing all logic and nesting both providers; also exports `useHouseContext()` merging both.

Components that only dispatch subscribe to the stable actions context and avoid re-rendering on data changes (data/actions are each `useMemo`'d, actions are `useCallback`'d). This is what the "context dependencies" commits refer to.

State mechanics: houses are a **`Map`** (keyed by id), lazily initialized from localStorage (key in `src/constants/local-storage.ts`) serialized as `[...map]` entries — any reader must do `new Map(JSON.parse(...))`. Writes are **debounced 500ms** before flushing to localStorage.

### Component patterns (`src/components/`)
- **Imperative modals**: `modals/base-modal.tsx` (Radix Dialog wrapper) is the base; feature modals expose a `ModalRef` (`{ openModal, closeModal }`) via `forwardRef` + `useImperativeHandle`. Parents hold a `useRef<ModalRef>` and call `ref.current.openModal()` rather than passing open-state props.
- **Lazy/Suspense**: `overview/overview.tsx` `lazy()`-imports modals wrapped in `<Suspense>`. Named-export modals need `.then(mod => ({ default: mod.X }))`. The active branch concerns Suspense behavior around these modals.
- **Floor selection drives a modal**: clicking a floor (`house/floor-list.tsx`, which uses single-handler event delegation up the DOM) calls `setSelectedFloor`; a `useEffect` in `page.tsx` then opens the conditionally-mounted `ManageFloorModal`.
- `house/house-list.tsx` virtualizes houses with `react-window` (horizontal `FixedSizeList`); `house/floor.tsx` is a memoized compound component (`Floor.Normal` / `Floor.WithDoor`).

### Hooks (`src/hooks/`)
`useWeatherQuery` (React Query → `services/weather.ts` → `/api/weather`), `useFilteredHouses` (wraps `getHousesByLocation` so the canvas/overview show only the saved location's houses), `useModal`.

## Known gotchas
- `ManageFloorModal` has a copy-paste `displayName = "ManageHouseModal"`.
- Editing a house name does not propagate to existing floors' denormalized `houseName` unless floors are regenerated.
- `@/src/...` alias vs relative imports are used inconsistently across files.
