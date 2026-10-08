const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) return payload[key]
    }
  }

  return []
}

export async function fetchCollection(endpoint, request = fetch, signal) {
  const response = await request(`${API_BASE_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}