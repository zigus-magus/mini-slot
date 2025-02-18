import {IGameState, StateNames} from "./StateMachine.ts";
import {Game} from "../game.ts";
import {logStateTransition} from "../utils/Logger.ts";

export class SpinState implements IGameState {
	constructor(private game: Game) {}
	
	async onEnter(): Promise<void> {
		logStateTransition('enter', 'Spin');
		this.game.spinButton.setHandler(async () => {
			await this.game.stopSpin(true);
			this.game.changeState(StateNames.Stop)
		});
		
		await this.game.startSpin();
		this.game.changeState(StateNames.Stop);
	}
	
	onExit(): void {
		logStateTransition('exit', 'Spin');
		this.game.spinButton.clearHandler();
	}
}