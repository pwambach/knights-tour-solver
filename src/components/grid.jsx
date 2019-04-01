import React from 'react'
import styles from './grid.styl'
import Tile from './tile'
import Path from './path'
import { T } from '../constants'
import { xyToIndex, indexToXy } from '../libs/coords'

export default function Grid({ size, level, onLevelChange, stats }) {
  const changeTileType = (level, index) => {
    const type = level.types[index]
    const allTypes = Object.values(T)
    const currentIndex = allTypes.indexOf(type)
    const newIndex = (currentIndex + 1) % allTypes.length
    level.types[index] = allTypes[newIndex]
    onLevelChange({ ...level })
  }

  const changeStart = (level, index) => {
    level.start = indexToXy(index, 6)
    onLevelChange({ ...level })
  }

  return (
    <div className={styles.grid}>
      {level.types.map((tileType, index) => (
        <Tile
          key={index}
          type={tileType}
          isStart={xyToIndex(level.start, 6) === index}
          onTileClick={() => changeTileType(level, index)}
          onStartClick={() => changeStart(level, index)}
          isActivated={stats.path && stats.path.includes(index)}
        />
      ))}
      {stats.path && (
        <Path
          indices={stats.path}
          className={styles.path}
          isPossible={stats.isPossible}
        />
      )}
    </div>
  )
}
