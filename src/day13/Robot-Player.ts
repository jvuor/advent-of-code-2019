import { ControlInput } from './interfaces';
import { Screen } from './Screen';
import { VirtualScreen } from './Virtual-screen';

export class RobotPlayer {
  private screen: Screen;
  private virtualScreen: VirtualScreen;
  private ballX: number | undefined;

  public constructor(screen: Screen, virtualScreen: VirtualScreen) {
    this.screen = screen;
    this.virtualScreen = virtualScreen;
  }

  public getInput(): ControlInput {
    const oldBallX = this.ballX;
    const ballX = this.virtualScreen.getBallX();
    this.ballX = ballX;
    const paddleX = this.virtualScreen.getPaddleX();

    // this.screen.debug(0, this.ballX);
    // this.screen.debug(1, paddleX);

    if (ballX !== undefined && paddleX !== undefined) {
      let wantedPosition: number;
      if (oldBallX !== undefined) {
        const ballDirection = ballX - oldBallX;
        wantedPosition = ballX + ballDirection;
      } else {
        wantedPosition = ballX;
      }
      // this.screen.debug(2, wantedPosition);
      if (wantedPosition > paddleX) {
        return ControlInput.Right;
      } else if (wantedPosition < paddleX) {
        return ControlInput.Left;
      } else {
        return ControlInput.Center;
      }
    } else {
      return ControlInput.Center;
    }
  }
}
