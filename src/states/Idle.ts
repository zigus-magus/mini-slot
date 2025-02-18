import {IGameState, StateNames} from "./StateMachine.ts";
import {Game} from "../game.ts";
import {logStateTransition} from "../utils/Logger.ts";

export class IdleState implements IGameState {
	constructor(private game: Game) {}
	
	onEnter(): void {
		logStateTransition('enter', 'Idle');
		this.game.spinButton.enabled = this.game.isSpinAvailable;
		
		if (this.game.isSpinAvailable) {
			this.game.spinButton.setHandler(() => {
				this.game.registerSpinAttempt();
				this.game.changeState(StateNames.Spin)
			});
		}
	}
	
	onExit(): void {
		logStateTransition('exit', 'Idle');
		this.game.spinButton.clearHandler();
	}
}