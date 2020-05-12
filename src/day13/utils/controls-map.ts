import { ControlInput, Controls } from '../interfaces';

export const controlMap = new Map<Controls | null, ControlInput>([
  [Controls.Left, ControlInput.Left],
  [Controls.Right, ControlInput.Right],
  [null, ControlInput.Center],
]);
