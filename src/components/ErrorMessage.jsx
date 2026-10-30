export default function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-xl rounded-3xl border-4 border-ink bg-pop-pink p-8 text-center shadow-hard"
    >
      <p className="font-display text-3xl font-extrabold text-ink">
        Could not load photos
      </p>
      <p className="mt-3 font-medium text-ink">{message}</p>
      <p className="mt-1 text-sm text-ink/80">
        Check your internet connection and refresh the page.
      </p>
    </div>
  )
}
