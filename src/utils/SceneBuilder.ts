import * as PIXI from 'pixi.js';
import { Reel } from '../components/Reel.ts';
import {SCENE_CONFIG, REEL_CONFIG} from '../config/general.ts';
import { Button } from '../components/Button.ts';


export class SceneBuilder {
	private scene: PIXI.Container;
	
	constructor(scene: PIXI.Container) {
		this.scene = scene;
	}
	
	public createReel(): Reel {
		const reel = new Reel(REEL_CONFIG);
		const {x, y} = SCENE_CONFIG.reel.position;
		reel.position.set(x, y);
		this.scene.addChild(reel);
		return reel;
	}
	
	public createSpinButton(): Button {
		const {enabledSprite, disabledSprite, position} = SCENE_CONFIG.spinButton;
		const button = new Button({enabledSprite, disabledSprite});
		button.position.set(position.x, position.y);
		this.scene.addChild(button);
		return button;
	}
	
	public createBalanceText(): PIXI.Text {
		const {fontSize, fill, position} = SCENE_CONFIG.balanceText;
		const text = new PIXI.Text(``, {fontSize, fill});
		text.position.set(position.x, position.y);
		this.scene.addChild(text);
		return text;
	}
	
	public createWinText(): PIXI.Text {
		const {fontSize, fill, position} = SCENE_CONFIG.winText;
		const text = new PIXI.Text('', {fontSize, fill, align: 'center'});
		text.anchor.set(0.5);
		text.position.set(position.x, position.y);
		this.scene.addChild(text);
		return text;
	}
	
	public createWinBg(): PIXI.Sprite {
		const {sprite, position} = SCENE_CONFIG.winBg;
		const texture = PIXI.Assets.get(sprite);
		const bg = PIXI.Sprite.from(texture);
		bg.anchor.set(0.5);
		bg.position.set(position.x, position.y);
		bg.visible = false;
		this.scene.addChild(bg);
		return bg;
	}
}