import React from 'react'

export default function Stats({ stats }) {
  return <pre>{JSON.stringify(stats, null, 2)}</pre>
}
