import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
  TOGGLE_FAVOURITE,
} from '../reducers/favouritesReducer.js'
import SearchBar from './SearchBar.jsx'
import PhotoCard from './PhotoCard.jsx'
import Spinner from './Spinner.jsx'
import ErrorMessage from './ErrorMessage.jsx'

// Full class names written out so Tailwind can detect them
const CARD_COLORS = [
  'bg-pop-yellow',
  'bg-pop-cyan',
  'bg-pop-pink',
  'bg-pop-lime',
  'bg-pop-violet',
  'bg-pop-orange',
]

export default function Gallery() {
  // 1. Data comes from the custom hook (Gallery never calls fetch itself)
  const { photos, loading, error } = useFetchPhotos()

  // 2. Search text -> plain useState is fine here
  const [query, setQuery] = useState('')

  // 3. Favourites -> useReducer, initialised from localStorage
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites
  )

  // Save favourites to localStorage every time they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // storage may be full or blocked – the app still works without it
    }
  }, [favourites])

  // useCallback: keeps the SAME function between renders, so the memoised
  // SearchBar / PhotoCard do not re-render because of a "new" function.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, id })
  }, [])

  // useMemo: the filtering only runs again when `photos` or `query` change,
  // not on every re-render (e.g. when a heart is toggled).
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">
          <span className="text-pop-yellow">Snapshot</span>{' '}
          <span className="text-pop-pink">Fiesta</span>
        </h1>
        <p className="max-w-md text-lg font-medium text-white/90">
          Browse 30 photos, search by photographer, and tap the heart to keep
          your favourites.
        </p>
        <SearchBar value={query} onChange={handleSearchChange} />
      </header>

      {loading && <Spinner />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-16 text-center font-display text-2xl font-extrabold text-pop-yellow">
          No photographer matches “{query.trim()}”.
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggleFavourite}
              colorClass={CARD_COLORS[Number(photo.id) % CARD_COLORS.length]}
            />
          ))}
        </div>
      )}
    </section>
  )
}
