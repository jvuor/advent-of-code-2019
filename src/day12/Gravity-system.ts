import { Moon, Moons } from './interfaces';

export class GravitySystem {
  private moons: Moons;
  private steps: number;

  public constructor(input: string) {
    this.moons = this.parseInitialPositions(input);
    this.steps = 0;
  }

  public step(): void {
    this.steps += 1;

    this.moons.forEach(moon1 => {
      this.moons
        .filter(moon2 => moon2 !== moon1)
        .forEach(moon2 => this.adjustVelocity(moon1, moon2));
    });
    this.adjustPositions();
  }

  public output(): void {
    console.log(`${this.steps} steps:`);
    this.moons.forEach(moon => {
      console.log(moon);
    });
    console.log(`Total energy: ${this.getTotalEnergy()}`);
  }

  public getTotalEnergy(): number {
    return this.moons.reduce((prev, cur) => prev + this.getEnergyForMoon(cur), 0);
  }

  public getSteps(): number {
    return this.steps;
  }

  private parseInitialPositions(input: string): Moons {
    const moons: Moons = [];
    let continueParsing = true;
    let currentPosition = 0;

    while (continueParsing) {
      const startOfNextMoon = input.indexOf('<', currentPosition);
      if (startOfNextMoon === -1) {
        continueParsing = false;
        break;
      }
      const endOfNextMoon = input.indexOf('>', startOfNextMoon);
      currentPosition = endOfNextMoon + 1;
      const moonPosition: any = {};
      const moonValues = input.substr(startOfNextMoon + 1, endOfNextMoon - startOfNextMoon - 1)
        .trim()
        .split(',')
        .map(value => value.trim())
        .map(valueStr => {
          const [ key, value ] = valueStr.split('=');
          moonPosition[key] = parseInt(value, 10);
        });
      moons.push({
        position: { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z },
        velocity: { x: 0, y: 0, z: 0 },
      });
    }

    return moons;
  }

  private adjustVelocity(moon1: Moon, moon2: Moon) {
    const xDiff = moon2.position.x - moon1.position.x;
    const yDiff = moon2.position.y - moon1.position.y;
    const zDiff = moon2.position.z - moon1.position.z;

    if (xDiff > 0) {
      moon1.velocity.x += 1;
    } else if (xDiff < 0) {
      moon1.velocity.x += -1;
    }

    if (yDiff > 0) {
      moon1.velocity.y += 1;
    } else if (yDiff < 0) {
      moon1.velocity.y += -1;
    }

    if (zDiff > 0) {
      moon1.velocity.z += 1;
    } else if (zDiff < 0) {
      moon1.velocity.z += -1;
    }
  }

  private adjustPositions(): void {
    this.moons.forEach(moon => {
      moon.position.x += moon.velocity.x;
      moon.position.y += moon.velocity.y;
      moon.position.z += moon.velocity.z;
    });
  }

  private getEnergyForMoon(moon: Moon): number {
    return (Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z))
      * (Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z));
  }
}
