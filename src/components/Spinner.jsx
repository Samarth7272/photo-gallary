export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-6 py-24"
    >
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-pop-yellow border-r-pop-pink border-b-pop-cyan border-l-pop-lime" />
      <p className="font-display text-2xl font-extrabold">Loading photos…</p>
    </div>
  )
}
