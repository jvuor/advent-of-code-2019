export class Orbiter {
  public name: string;
  public readonly orbits: number;
  private parent: Orbiter | null;

  public constructor(name: string, parent: Orbiter | null) {
    this.name = name;
    this.parent = parent;

    this.orbits = this.parent === null
      ? 0
      : this.parent.orbits + 1;
  }
}
