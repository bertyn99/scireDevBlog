export function isClientHttpError(error: unknown): error is { statusCode: number } {
  return (
    typeof error === 'object'
    && error !== null
    && 'statusCode' in error
    && typeof (error as { statusCode: unknown }).statusCode === 'number'
    && (error as { statusCode: number }).statusCode >= 400
    && (error as { statusCode: number }).statusCode < 500
  )
}

export function rethrowClientHttpError(error: unknown): void {
  if (isClientHttpError(error)) {
    throw error
  }
}
