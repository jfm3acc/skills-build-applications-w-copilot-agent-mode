import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

export function useApiCollection(endpoint, request = fetch) {
  const [result, setResult] = useState({ records: [], loading: true, error: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, request, controller.signal)
      .then((records) => {
        if (!controller.signal.aborted) {
          setResult({ records, loading: false, error: '' })
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setResult({ records: [], loading: false, error: error.message })
        }
      })

    return () => controller.abort()
  }, [endpoint, request, attempt])

  return {
    ...result,
    retry: () => {
      setResult((previous) => ({ ...previous, loading: true, error: '' }))
      setAttempt((current) => current + 1)
    },
  }
}