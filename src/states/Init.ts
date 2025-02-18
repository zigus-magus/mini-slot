import { IGameState } from "./StateMachine";
import { Game } from "../game";
import { GAME_ASSETS } from '../config/assets';
import { SceneBuilder } from "../utils/SceneBuilder";
import { StateNames } from "./StateMachine";
import { logStateTransition } from "../utils/Logger";
import * as PIXI from 'pixi.js';

export class InitState implements IGameState {
	constructor(private game: Game) {}
	
	async onEnter(): Promise<void> {
		logStateTransition('enter', 'Init');
		
		await this.loadAssets();
		this.setupGameScene();
		this.game.changeState(StateNames.Idle);
	}
	
	onExit(): void {
		logStateTransition('exit', 'Init');
	}
	
	private async loadAssets(): Promise<void> {
		try {
			const assets = [];
			for (const asset of GAME_ASSETS) {
				PIXI.Assets.add({alias: asset.alias, src: asset.src});
				assets.push(asset.alias);
			}
			
			await PIXI.Assets.load(assets);
			console.log('All assets loaded successfully');
		} catch (error) {
			console.error('Error loading assets:', error);
		}
	}
	
	private setupGameScene(): void {
		const sceneBuilder = new SceneBuilder(this.game.getGameContainer());
		
		const reel = sceneBuilder.createReel();
		const spinButton = sceneBuilder.createSpinButton();
		const balanceText = sceneBuilder.createBalanceText();
		const winBg = sceneBuilder.createWinBg();
		const winText = sceneBuilder.createWinText();
		
		// Set components in game
		this.game.setReel(reel);
		this.game.setSpinButton(spinButton);
		this.game.setBalanceText(balanceText);
		this.game.setWinText(winText);
		this.game.setWinBg(winBg);
		
		// Initial balance display
		balanceText.text = `Balance: ${this.game.getBalance()}`;
	}
}