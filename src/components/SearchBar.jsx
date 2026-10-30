import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <label htmlFor="search" className="sr-only">
        Search photos by author name
      </label>
      <div className="flex items-center gap-3 rounded-full border-4 border-ink bg-white px-5 py-3 shadow-hard">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 text-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <input
          id="search"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by author name…"
          autoComplete="off"
          className="w-full bg-transparent font-medium text-ink placeholder:text-ink/50 focus:outline-none"
        />
      </div>
    </div>
  )
}

export default memo(SearchBar)
