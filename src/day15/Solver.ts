import { Map } from "./Map";
import { RemoteOperator } from "./Remote-Operator";
import { Coordinate, Direction, Response, NeighboursMap, SquareType } from "./interfaces";

export class Solver {
  private map: Map;
  private remote: RemoteOperator;
  private location: Coordinate;
  
  public constructor() {
    this.map = new Map;
    this.remote = new RemoteOperator;

    this.location = { x: 0, y: 0 };
  }

  public solvePart1(): void {
    // rough outline:
    // 1. find route to closest unknown location

    let route = this.map.findNearestUnknown(this.location);
    let initialCoord = { x: this.location.x, y: this.location.y };
 
    // 2. move there
    // 3. repeat until no unknown locations exist

    while (route !== null) {
      const fullRoute = [...route];

      while (route.length > 0) {
        const nextStep = route.shift() as Direction;

        const isLastStep = route.length === 0;
        const response = this.remote.step(nextStep);

        // // only the last step of the route is to unknown terrain so we should not encounter any walls
        if (!isLastStep && response === Response.Wall) {
          this.map.outputMap();
          console.log(initialCoord, this.location, fullRoute, route, response);
          throw new Error('Walked into a wall on route to new location');
        }

        // if not a wall, robot moved => update location
        if (response !== Response.Wall) {
          this.location.x += NeighboursMap[nextStep].x;
          this.location.y += NeighboursMap[nextStep].y;
        }

        if (isLastStep) {
          // if wall then we need to offset the location to reflect the fact that the robot didn't move
          if (response === Response.Wall) {
            this.map.addSquare(
              { x: this.location.x + NeighboursMap[nextStep].x, y: this.location.y + NeighboursMap[nextStep].y },
              SquareType.Wall
            );
          } else {
            this.map.addSquare(
              { x: this.location.x, y: this.location.y },
              response === Response.System ? SquareType.System : SquareType.Empty
            );
          }
        }
      }

      route = this.map.findNearestUnknown(this.location);
      initialCoord = { ...this.location };
    }

    // At this point we have reveled the whole map
    // 4. calculate shortest route from 0,0 to system

    const solution = this.map.findNearest({ x: 0, y: 0 }, SquareType.System)?.length;
    console.log('Solution to part 1:', solution);
  }

  public solvePart2(): void {
    const spreader = this.map.getOxygenSpreader();
    spreader.initialize();
    const solution = spreader.cycleToFull();
    console.log('Solution to part 2:', solution);
  }
}
