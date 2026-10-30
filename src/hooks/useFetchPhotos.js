import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

// Custom hook: owns ALL the data-fetching logic.
// Returns: { photos, loading, error }
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController cancels the request if the component unmounts
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        // An abort is not a real failure, so ignore it
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
