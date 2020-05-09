import { Asteroids, MapMarker } from './interfaces';

export function parseMap(map: string): Asteroids {
  const asteroids: Asteroids = [];
  const mapRows = map
    .trim()
    .split('\n')
    .map(row => row.trim());

  for (let y = 0; y < mapRows.length; ++y) {
    const mapCells = mapRows[y].split('');

    for (let x = 0; x < mapCells.length; ++x) {
      const mapCell = mapCells[x];

      if (mapCell === MapMarker.Asteroid) {
        asteroids.push({x, y, connections: 0});
      }
    }
  }

  return asteroids;
}
