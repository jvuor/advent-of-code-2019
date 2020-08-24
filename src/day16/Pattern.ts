export class Pattern {
  private currentPosition = 1;
  private pattern: number[];
  private readonly basePattern = [0, 1, 0, -1];

  public constructor(position: number) {
    this.pattern = this.basePattern
      .map(number => new Array(position).fill(number))
      .flat(1);
  }

  public getNext(): number {
    const nextElement = this.pattern[this.currentPosition];
    this.currentPosition = (this.currentPosition === (this.pattern.length - 1))
      ? 0
      : this.currentPosition + 1;

    return nextElement;
  }
}
