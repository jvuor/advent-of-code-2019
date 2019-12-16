export class Orbiter {
  public readonly name: string;
  public readonly orbits: number;
  public readonly parent: Orbiter | null;

  public constructor(name: string, parent: Orbiter | null) {
    this.name = name;
    this.parent = parent;

    this.orbits = this.parent === null
      ? 0
      : this.parent.orbits + 1;
  }
}
