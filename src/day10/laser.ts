import { Asteroid, Asteroids, Targets } from './interfaces';
import { parseMap } from './parse-map';
import { solveMap } from './solve-map';

export function laser(map: string): Asteroids {
  const laserLocation = solveMap(map);
  const targets: Targets = parseMap(map)
    .filter(a => a !== laserLocation)
    .map(a => ({
      ...a,
      angle: calculateAngle(laserLocation, a),
      distance: calculateDistance(laserLocation, a),
      removed: false,
    }))
    .sort((a, b) => a.angle - b.angle);

  const angles: Set<number> = new Set();
  targets.forEach(target => angles.add(target.angle));

  const removalOrder: Asteroids = [];

  while (targets.some(target => !target.removed)) {
    angles.forEach(angle => {
      const asteroidToRemove = targets
        .filter(asteroid => !asteroid.removed)
        .filter(asteroid => asteroid.angle === angle)
        .sort((a, b) => a.distance - b.distance);

      if (asteroidToRemove.length > 0) {
        const removed = asteroidToRemove[0];

        removalOrder.push({ x: removed.x, y: removed.y, connections: removed.connections });
        removed.removed = true;
      }
    });
  }

  return removalOrder;
}

function calculateAngle(asteroid1: Asteroid, asteroid2: Asteroid): number {
  // the unit here is degrees * 100, because rounding to degrees is not accurate enough
  // and dealing with floating point math sucks
  const y = asteroid2.y - asteroid1.y;
  const x = asteroid2.x - asteroid1.x;

  const angle = 9000 + Math.atan2(y, x) * 18000 / Math.PI;

  return Math.round(angle >= 0 ? angle : angle + 36000);
}

function calculateDistance(asteroid1: Asteroid, asteroid2: Asteroid): number {
  // this is intentionally badly calculated since we don't need an exact distance,
  // only good enough result to sort two asteroids at same angle

  return Math.abs(asteroid2.x - asteroid1.x) + Math.abs(asteroid2.y - asteroid1.y);
}
