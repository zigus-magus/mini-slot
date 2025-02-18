import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { StateNames, GameStateMachine } from './states/StateMachine';
import { InitState, IdleState, SpinState, StopState, ResultState } from './states';
import { Button } from './components/Button';
import { Reel } from './components/Reel';
import { WinEvaluator } from './components/WinEvaluator';

export class Game {
	public spinButton!: Button;
	private app: PIXI.Application;
	private gameContainer: PIXI.Container;
	private reel!: Reel;
	private stateMachine: GameStateMachine;
	private balance: number;
	private balanceText!: PIXI.Text;
	private winText!: PIXI.Text;
	private winBg!: PIXI.Sprite;
	
	constructor() {
		this.balance = parseInt(localStorage.getItem('balance') || '100');
		this.app = new PIXI.Application({
			width: 800,
			height: 800,
			backgroundColor: 0x1099bb,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
		});
		
		this.gameContainer = new PIXI.Container();
		this.app.stage.addChild(this.gameContainer);
		
		this.stateMachine = new GameStateMachine();
		this.setupStateMachine();
		
		this.stateMachine.changeState(StateNames.Init);
	}
	
	public changeState(stateName: StateNames): void {
		this.stateMachine.changeState(stateName);
	}
	
	public get isSpinAvailable(): boolean {
		return this.balance > 0;
	}
	
	public registerSpinAttempt(): void {
		if (this.isSpinAvailable) {
			this.balance -= 1;
			this.updateBalanceDisplay();
		}
	}
	
	private setupStateMachine(): void {
		this.stateMachine.addState(StateNames.Init, new InitState(this));
		this.stateMachine.addState(StateNames.Idle, new IdleState(this));
		this.stateMachine.addState(StateNames.Spin, new SpinState(this));
		this.stateMachine.addState(StateNames.Stop, new StopState(this));
		this.stateMachine.addState(StateNames.Result, new ResultState(this));
	}
	
	// Getters and setters for UI components
	setReel(reel: Reel): void {
		this.reel = reel;
	}
	
	setSpinButton(button: Button): void {
		this.spinButton = button;
	}
	
	setBalanceText(text: PIXI.Text): void {
		this.balanceText = text;
	}
	
	setWinText(text: PIXI.Text): void {
		this.winText = text;
	}
	
	setWinBg(sprite: PIXI.Sprite): void {
		this.winBg = sprite;
	}
	
	getGameContainer(): PIXI.Container {
		return this.gameContainer;
	}
	
	getBalance(): number {
		return this.balance;
	}
	
	public startSpin(): Promise<void> {
		return this.reel.spin();
		
	}
	
	public stopSpin(force = false): Promise<void> {
		return this.reel.stop(force);
	}
	
	public async evaluateResult(): Promise<void> {
		const visibleSymbols = this.reel.getVisibleSymbolIds();
		const winResult = WinEvaluator.evaluateWin(visibleSymbols);
		
		if (winResult.isWin) {
			this.balance += winResult.winAmount;
			await this.showWin(winResult.winAmount);
		}
		
		localStorage.setItem('balance', this.balance.toString());
		this.updateBalanceDisplay();
	}
	
	private showWin(amount: number): Promise<void> {
		const timeLine = gsap.timeline();
		return new Promise((resolve) => {
			timeLine
				.to([this.winBg,this.winText], {
					alpha: 1,
					duration: 0.3,
					ease: "back.out",
					onStart: () => {
						this.winBg.alpha = 0;
						this.winBg.visible = true;
						this.winText.alpha = 0;
						this.winText.visible = true;
						this.winText.text = `WIN ${amount}`;
					}
				})
				.to([this.winBg,this.winText], {
				alpha: 0,
				duration: 0.3,
				ease: "back.out",
				onComplete: () => {
					this.winBg.visible = false;
					this.winText.visible = false;
					resolve();
				}
			})
		})
	}
	
	private updateBalanceDisplay(): void {
		this.balanceText.text = `Balance: ${this.balance}`;
		
		if (this.balance === 0) {
			this.spinButton.enabled = false;
		}
	}
	
	get view(): HTMLCanvasElement {
		return this.app.view as HTMLCanvasElement;
	}
}