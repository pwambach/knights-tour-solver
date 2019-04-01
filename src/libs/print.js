import { T } from '../constants'

const template = (typeStrings, start) => `
list.Add(new Level(new TileType[,] {
${typeStrings}
}, new int[2] { ${start[0]}, ${start[1]} }, Color.white));
`

function typeString(type) {
  switch (type) {
    case T.Hidden:
      return `TileType.Hidden`
    case T.Default:
      return `TileType.Default`
    case T.Double:
      return `TileType.Double`
    case T.Multi:
      return `TileType.Multi`
  }
}

export default function printLevel(level) {
  console.log(level.types)

  const typeStrings = level.types
    .map(typeString)
    .reduce((all, typeString, index) => {
      const j = Math.floor(index / 6)
      all[j] = all[j] ? [...all[j], typeString] : [typeString]
      return all
    }, [])
    .map(ts => `{${ts.join(', ')}}`)
    .join(',\n')

  console.log(template(typeStrings, level.start))
}
