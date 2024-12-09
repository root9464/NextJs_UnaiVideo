export function generateId(): string {
  const timestamp = Date.now().toString(36); // Base-36 timestamp
  const randomPart = Math.random().toString(36).substring(2, 10); // Random part
  return `${timestamp}-${randomPart}`;
}
