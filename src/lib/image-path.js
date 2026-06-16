const base = import.meta.env.BASE_URL || '/'

export function imagePath(path) {
  if (!path) return path
  return base + path.replace(/^\//, '')
}
