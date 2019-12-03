import { Coordinate } from '../5/interfaces/coordinate.interface';
import { Direction } from '../5/interfaces/direction.enum';
import { Path } from '../5/interfaces/path.interface';

const directionVectors: {[key in Direction]: Coordinate} = {
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
  U: { x: 0, y: -1 },
};

interface PathCoordinate extends Coordinate {
  length: number;
}

function parsePath(path: string): Path[] {
  const parsedPath: Path[] = path
    .split(',')
    .map(segment => segment.trim())
    .map(segment => ({
      direction: segment[0] as Direction,
      length: parseInt(segment.substring(1), 10),
    }));

  return parsedPath;
}

function fillGrid(path: Path[]): PathCoordinate[] {
  const grid: PathCoordinate[] = [];
  let place: Coordinate = { x: 0, y: 0 };
  let pathLength = 0;

  path.forEach(segment => {
    for (let l = 0; l < segment.length; l++) {
      place = addCoordinates(place, directionVectors[segment.direction]);
      ++pathLength;
      grid.push({ x: place.x, y: place.y, length: pathLength });
    }
  });

  return grid;
}

function addCoordinates(coordinate1: Coordinate, coordinate2: Coordinate): Coordinate {
  return {
    x: coordinate1.x + coordinate2.x,
    y: coordinate1.y + coordinate2.y,
  };
}

function checkIntersections(grid1: PathCoordinate[], grid2: PathCoordinate[]): PathCoordinate[] {
  const intersections: PathCoordinate[] = [];
  grid1.forEach(point1 => {
    grid2.forEach(point2 => {
      if (point1.x === point2.x && point1.y === point2. y) {
        intersections.push({ x: point1.x, y: point1.y, length: point1.length + point2.length });
      }
    });
  });

  return intersections;
}

function nearestIntersection(intersections: PathCoordinate[]): number {
  return intersections.reduce(
    (prev: number, next: PathCoordinate) => next.length < prev ? next.length : prev, Infinity);
}

function solve(path1: string, path2: string): number {
  return nearestIntersection(
    checkIntersections(
      fillGrid(parsePath(path1)),
      fillGrid(parsePath(path2)),
  ));
}

export { solve, parsePath };
