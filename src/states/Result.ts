import {IGameState, StateNames} from "./StateMachine.ts";
import {Game} from "../game.ts";
import {logStateTransition} from "../utils/Logger.ts";

export class ResultState implements IGameState {
	constructor(private game: Game) {}
	
	async onEnter(): Promise<void> {
		logStateTransition('enter', 'Result');
		await this.game.evaluateResult();
		this.game.changeState(StateNames.Idle);
	}
	
	onExit(): void {
		logStateTransition('exit', 'Result');
	}
}
