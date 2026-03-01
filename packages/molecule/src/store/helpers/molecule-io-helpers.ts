export function isValidJnmol(data: unknown): boolean {
  if (
    !data ||
    typeof data !== 'object' ||
    !('atoms' in data) ||
    !('bonds' in data) ||
    !('id' in data) ||
    typeof (data as Record<string, unknown>).id !== 'string' ||
    !('title' in data) ||
    typeof (data as Record<string, unknown>).title !== 'string'
  ) {
    return false;
  }

  return true;
}
