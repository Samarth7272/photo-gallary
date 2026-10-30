# Snapshot Fiesta – React Photo Gallery

React + Vite + Tailwind CSS (no other UI libraries).

## Run it
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Structure
```
src/
  hooks/useFetchPhotos.js          custom hook -> { photos, loading, error }
  reducers/favouritesReducer.js    reducer + localStorage loader
  components/Gallery.jsx           uses the hook, useReducer, useCallback, useMemo
  components/PhotoCard.jsx         photo, author, heart button
  components/SearchBar.jsx         search input
  components/Spinner.jsx           loading state
  components/ErrorMessage.jsx      error state
```

## Video cheat-sheet
- **useFetchPhotos**: returns `photos, loading, error`. On failure (network error or non-OK status) it catches the error, stores the message in `error`, and `loading` becomes false, so Gallery shows the error box.
- **useReducer**: one action, `TOGGLE_FAVOURITE` (adds the id if absent, removes if present). Chosen over useState because the next state depends on the previous state through a named action, and the logic lives in one testable function. Initial state is read from localStorage (lazy init); a `useEffect` saves it on every change.
- **useCallback** (`handleSearchChange`, `handleToggleFavourite`): keeps the function identity stable so memoised children (`SearchBar`, `PhotoCard`) don't re-render needlessly. Without it every keystroke would re-render all 30 cards.
- **useMemo** (`filteredPhotos`): the filter runs only when `photos` or `query` change, not when a heart is toggled. Without it, filtering would be recomputed on every render.
