const key = 'knightstoursolver'

export function saveLevel(level) {
  const levels = loadLevels()
  levels.push(level)
  localStorage.setItem(key, JSON.stringify(levels))
}

export function loadLevels() {
  const content = localStorage.getItem(key)
  if (!content) {
    return []
  }

  return JSON.parse(content)
}

export function deleteLevel(level) {
  const levels = loadLevels()
  const newLevels = levels.filter(l => !levelEquals(l, level))
  localStorage.setItem(key, JSON.stringify(newLevels))
}

function levelEquals(l1, l2) {
  const l1String = JSON.stringify(l1)
  const l2String = JSON.stringify(l2)

  return l1String === l2String
}
