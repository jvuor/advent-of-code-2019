import { Asteroid, Asteroids, Vector } from './interfaces';

// Euclidean algorithm
function euclid(a: number, b: number): number {
  return a === 0
    ? b
    : euclid(b % a, a);
}

function getStep(path: Vector): Vector {
  if (path.x === 0) {
    return {
      x: 0,
      y: path.y > 0 ? 1 : -1,
    };
  } else if (path.y === 0) {
    return {
      x: path.x > 0 ? 1 : -1,
      y: 0,
    };
  } else if (Math.abs(path.x) === Math.abs(path.y)) {
    return {
      x: path.x > 0 ? 1 : -1,
      y: path.y > 0 ? 1 : -1,
    };
  } else {
    const GCD = euclid(Math.abs(path.x), Math.abs(path.y)); // greatest common divisor
    if (GCD === 1) {
      return {
        x: path.x,
        y: path.y,
      };
    } else {
      return {
        x: path.x / GCD,
        y: path.y / GCD,
      };
    }
  }
}

export function parseLOS(map: Asteroids): void {
  const solvePath = (a1: Asteroid, a2: Asteroid): Vector =>
    ({
      x: a2.x - a1.x,
      y: a2.y - a1.y,
    });

  map.forEach(asteroid1 => {
    let connections = 0;

    map
      .filter(a => a !== asteroid1)
      .forEach(asteroid2 => {
        const path = solvePath(asteroid1, asteroid2);
        const step = getStep(path);

        let placeX = asteroid1.x;
        let placeY = asteroid1.y;
        let LOSExists = true;

        const testPlace = () => placeX === asteroid2.x && placeY === asteroid2.y;

        while (LOSExists && !testPlace()) {
          const blockExists = map
            .filter(a => (a !== asteroid1 && a !== asteroid2))
            .some(a => (a.x === placeX && a.y === placeY));

          if (blockExists) {
            LOSExists = false;
          }

          placeX += step.x;
          placeY += step.y;
        }

        if (LOSExists) {
          connections += 1;
        }
      });

    asteroid1.connections = connections;
  });
}
