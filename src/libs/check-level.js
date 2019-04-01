import { T, Tcounts } from '../constants'
import { xyToIndex, indexToXy } from '../libs/coords'

const NUMBER_OF_ITERATIONS = 100000
const MAX_MOVES_PER_ITERATION = 100

export default function checkLevel(level) {
  return new Promise(resolve => {
    const now = performance.now()
    const startIndex = xyToIndex(level.start, 6)
    console.log({ startIndex })

    const stats = {}

    stats.totalTiles = level.types.filter(type => type !== T.Hidden).length

    bruteForce(startIndex, level.types, stats)

    stats.time = ((performance.now() - now) / 1000).toFixed(2) + 's'
    resolve(stats)
  })
}

function bruteForce(startIndex, types, stats) {
  for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    const reached = [...types].fill(0)
    const path = []
    let index = startIndex

    for (let j = 0; j < MAX_MOVES_PER_ITERATION; j++) {
      path.push(index)
      reached[index]++

      if (getActivatedTilesCount(types, reached) === stats.totalTiles) {
        stats.isPossible = true
        stats.checkIterations = i + 1
        stats.requiredMoves = path.length
        stats.path = path
        break
      }

      const possibleMoves = getPossibleTiles(index, types, reached)

      if (possibleMoves.length < 1) {
        stats.isPossible = false
        stats.checkIterations = i + 1
        stats.path = path
        break
      }

      index = chooseRandomMove(possibleMoves)
    }

    if (stats.isPossible) {
      break
    }
  }
}

function getPossibleTiles(index, types, reached) {
  return types
    .map((type, targetIndex) => ({ type, targetIndex }))
    .filter(({ type }) => type !== T.Hidden) // only non-hidden tiles
    .filter(({ targetIndex }) => hasCorrectDistance(index, targetIndex)) // only tiles with correct distance
    .filter(({ type, targetIndex }) => {
      return !isTileActivated(type, reached[targetIndex]) || type === T.Multi
    }) // only tiles which have not been activated yet
    .map(({ targetIndex }) => targetIndex)
}

function hasCorrectDistance(sourceIndex, targetIndex) {
  const [xS, yS] = indexToXy(sourceIndex, 6)
  const [xT, yT] = indexToXy(targetIndex, 6)
  const dx = Math.abs(xS - xT)
  const dy = Math.abs(yS - yT)

  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
}

function chooseRandomMove(indices) {
  const all = [...indices, ...indices, ...indices]
  return all[Math.floor(Math.random() * all.length)]
}

function isTileActivated(type, reach) {
  if (type === T.Hidden) {
    return false
  }

  return reach >= Tcounts[type]
}

function getActivatedTilesCount(types, reached) {
  const active = types.filter((type, index) =>
    isTileActivated(type, reached[index])
  )

  return active.length
}
