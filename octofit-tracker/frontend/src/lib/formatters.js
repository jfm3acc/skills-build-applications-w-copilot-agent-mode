export function displayMember(users, id) {
  const memberId = String(id?._id ?? id ?? '')
  const member = users.find((user) => String(user._id) === memberId)
  return member?.name ?? (memberId ? `Member ${memberId.slice(-4)}` : 'Unassigned')
}

export function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function initials(name) {
  return String(name ?? 'A')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}