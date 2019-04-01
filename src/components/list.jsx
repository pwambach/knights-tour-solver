import React from 'react'
import styles from './list.styl'

export default function List({ levels, onLevelClick }) {
  return (
    <ul className={styles.list}>
      {levels.map((level, index) => (
        <li
          key={index}
          onClick={() => onLevelClick(level)}
          className={styles.listItem}>
          Level #{index + 1}
        </li>
      ))}
    </ul>
  )
}
