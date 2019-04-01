import React from 'react'
import styles from './tile.styl'
import cx from 'classnames'
import { T } from '../constants'

const Tile = ({ type, isStart, onTileClick, onStartClick, isActivated }) => {
  const classes = cx(
    styles.tileContent,
    type === T.Hidden && styles.hidden,
    type === T.Default && styles.default,
    type === T.Double && styles.double,
    type === T.Multi && styles.multi,
    isStart && styles.start,
    isActivated && type !== T.Hidden && styles.activated
  )

  return (
    <div
      className={styles.tile}
      onClick={() => onTileClick()}
      onContextMenu={event => {
        event.preventDefault()
        onStartClick()
      }}>
      <div className={classes} />
    </div>
  )
}

export default Tile
