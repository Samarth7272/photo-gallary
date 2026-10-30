import { memo } from 'react'

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={filled ? '#FF1F5A' : 'white'}
      stroke="#14082E"
      strokeWidth="2.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2 0 3.7 1.1 5.4 3 1.7-1.9 3.4-3 5.4-3 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

// memo: the card only re-renders when its own props change
function PhotoCard({ photo, isFavourite, onToggle, colorClass }) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-3xl border-4 border-ink p-3 shadow-hard ${colorClass}`}
    >
      <div className="overflow-hidden rounded-2xl border-4 border-ink bg-ink/10">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          width="600"
          height="450"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-1 pb-1">
        <p className="font-display text-lg font-extrabold leading-tight text-ink">
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          className="shrink-0 rounded-full border-4 border-ink bg-white p-2 shadow-hard-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </article>
  )
}

export default memo(PhotoCard)
