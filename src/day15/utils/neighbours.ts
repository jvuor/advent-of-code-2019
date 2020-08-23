import { Coordinate, NeighboursMap, Coordinates, Direction, Square, Squares } from '../interfaces';

export function getNeighbourCoordinates(coordinate: Coordinate): Coordinates {
  return Object.values(NeighboursMap).map(c => ({ x: coordinate.x + c.x, y: coordinate.y + c.y }));
}

export function getNeighbourRoute(coordinate: Coordinate, squares: Squares): Record<Direction, Square | undefined> {
  const getNeighbourFromOffsetCoordinates = (offsetCoordinate: Coordinate): Square | undefined => {
    const square = squares.find(s => s.coordinate.x === (coordinate.x + offsetCoordinate.x) && s.coordinate.y === (coordinate.y + offsetCoordinate.y))
    return square;
  }

  return {
    [Direction.North]: getNeighbourFromOffsetCoordinates(NeighboursMap[Direction.North]),
    [Direction.South]: getNeighbourFromOffsetCoordinates(NeighboursMap[Direction.South]),
    [Direction.East]: getNeighbourFromOffsetCoordinates(NeighboursMap[Direction.East]),
    [Direction.West]: getNeighbourFromOffsetCoordinates(NeighboursMap[Direction.West]),
  }
}
