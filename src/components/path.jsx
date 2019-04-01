import React from 'react'
import { indexToXy } from '../libs/coords'

export default function Path({ indices, isPossible, className }) {
  const rel = n => ((n / 6) * 100).toFixed(2) + '%'
  return (
    <svg width="100%" height="100%" className={className}>
      {indices.map((index, i) => {
        const next = indices[i + 1]
        if (!next) {
          return null
        }

        const [x1, y1] = indexToXy(index, 6)
        const [x2, y2] = indexToXy(next, 6)

        return (
          <line
            key={i}
            x1={rel(x1)}
            y1={rel(y1)}
            x2={rel(x2)}
            y2={rel(y2)}
            style={{
              stroke: isPossible ? 'green' : 'rgb(255,0,0)',
              strokeWidth: 2
            }}
          />
        )
      })}
    </svg>
  )
}
