import { Asteroid, Asteroids } from './interfaces';
import { parseLOS } from './parse-los';
import { parseMap } from './parse-map';

export function solveMap(map: string): Asteroid {
  const parsedMap = parseMap(map);
  parseLOS(parsedMap);
  const mostConnected: Asteroid = parsedMap.reduce((prev: Asteroid, cur: Asteroid): Asteroid =>
    (!prev || cur.connections > prev.connections) ? cur : prev, { x: 0, y: 0, connections: 0 });

  return mostConnected;
}
