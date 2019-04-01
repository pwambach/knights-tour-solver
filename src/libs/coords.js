export function indexToXy(index, size) {
  const x = index % size
  const y = Math.floor(index / size)
  return [x, y]
}

export function xyToIndex([x, y], size) {
  return y * size + x
}
