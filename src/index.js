import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Grid from './components/grid'
import Stats from './components/stats'
import List from './components/list'
import { T } from './constants'
import checkLevel from './libs/check-level'
import print from './libs/print'
import { saveLevel, loadLevels, deleteLevel } from './libs/persist'

const getInitialLevel = () => ({
  /* prettier-ignore */
  types: [
    T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden,
    T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden,
    T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden,
    T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden,
    T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden,
    T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden, T.Hidden
  ],
  /* prettier-ignore */
  start: [0, 0]
})

const App = () => {
  const [stats, setStats] = useState({})
  const [level, setLevel] = useState(getInitialLevel())
  const [levels, setLevels] = useState([])

  useEffect(() => {
    setLevels(loadLevels())
  }, [])

  return (
    <div>
      <Grid
        size={6}
        level={level}
        onLevelChange={level => setLevel(level)}
        stats={stats}
      />
      <button onClick={() => checkLevel(level).then(stats => setStats(stats))}>
        Check Level
      </button>
      <button
        onClick={() => {
          setLevel(getInitialLevel())
          setStats({})
        }}>
        Clear
      </button>
      <button onClick={() => setStats({})}>Clear stats</button>
      <button onClick={() => print(level)}>Print</button>
      <br />
      <br />
      <button
        onClick={() => {
          saveLevel(level)
          setLevels(loadLevels())
        }}>
        Save
      </button>
      <button
        onClick={() => {
          deleteLevel(level)
          setLevels(loadLevels())
        }}>
        Delete
      </button>
      <Stats stats={stats} />
      <List
        levels={levels}
        onLevelClick={level => {
          setLevel(level)
          setStats({})
        }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
