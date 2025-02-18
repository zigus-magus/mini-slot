export enum StateNames {
	Init = 'Init',
	Idle = 'Idle',
	Spin = 'Spin',
	Stop = 'Stop',
	Result = 'Result'
}

export interface IGameState {
	onEnter(): void;
	onExit(): void;
}

export class GameStateMachine {
	private currentState: IGameState | null = null;
	private states: Map<StateNames, IGameState> = new Map();
	
	public addState(type: StateNames, state: IGameState): void {
		this.states.set(type, state);
	}
	
	public changeState(type: StateNames): void {
		if (this.currentState) {
			this.currentState.onExit();
		}
		
		this.currentState = this.states.get(type) || null;
		
		if (this.currentState) {
			this.currentState.onEnter();
		}
	}
	
	public getCurrentState(): IGameState | null {
		return this.currentState;
	}
}