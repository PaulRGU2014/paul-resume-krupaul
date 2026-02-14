/**
 * Safe date utilities for subscriber widgets.
 */

/**
 * Return a valid ISO string for a date-like value, or '' when invalid.
 */
export function safeDateISO(ts?: string | number | Date | null | undefined): string {
  if (ts === null || ts === undefined) return ''
  const date = ts instanceof Date ? ts : new Date(ts as any)
  const t = date && typeof (date as Date).getTime === 'function' ? (date as Date).getTime() : NaN
  if (isNaN(t)) return ''
  return new Date(t).toISOString()
}

/**
 * Return a localized date/time string or 'Unknown' when invalid.
 */
export function safeLocaleString(
  ts?: string | number | Date | null | undefined,
  locale?: string | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  const iso = safeDateISO(ts)
  if (!iso) return 'Unknown'
  try {
    return new Date(iso).toLocaleString(locale, options)
  } catch {
    return 'Unknown'
  }
}

/**
 * Format a date key as 'YYYY-MM-DD' for grouping, or 'unknown-date' when invalid.
 */
export function formatDateKeyYYYYMMDD(ts?: string | number | Date | null | undefined): string {
  const iso = safeDateISO(ts)
  if (!iso) return 'unknown-date'
  return iso.split('T')[0]
}

/**
 * Normalize an email to trimmed lowercase. Returns null if input is missing or fails a basic validation.
 */
export function validateEmail(email?: unknown): string | null {
  if (typeof email !== 'string') return null
  const normalized = email.trim().toLowerCase()
  if (!normalized) return null
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(normalized) ? normalized : null
}

/**
 * Escape a value for CSV per RFC4180. Null/undefined become '""'.
 */
export function escapeCsvField(value: unknown): string {
  if (value === null || value === undefined) return '""'
  const s = String(value)
  const escaped = s.replace(/"/g, '""')
  return `"${escaped}"`
}