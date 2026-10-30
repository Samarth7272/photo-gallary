export const STORAGE_KEY = 'photo-gallery-favourites'

// Action types
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// Reducer: state is an array of favourite photo ids, e.g. ['10', '237']
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id) // already a favourite -> remove
        : [...state, action.id] // not a favourite -> add
    default:
      return state
  }
}

// Lazy initialiser: reads saved favourites from localStorage on first render
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
