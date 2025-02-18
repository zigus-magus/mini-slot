import {IGameState, StateNames} from "./StateMachine.ts";
import {Game} from "../game.ts";
import {logStateTransition} from "../utils/Logger.ts";

export class StopState implements IGameState {
	constructor(private game: Game) {}
	
	async onEnter(): Promise<void> {
		logStateTransition('enter', 'Stop');
		this.game.spinButton.enabled = false;
		await this.game.stopSpin();
		this.game.changeState(StateNames.Result);
	}
	
	onExit(): void {
		logStateTransition('exit', 'Stop');
	}
}