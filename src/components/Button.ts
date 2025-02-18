import * as PIXI from 'pixi.js';

export class Button extends PIXI.Container {
	private enabledSprite!: PIXI.Sprite;
	private disabledSprite!: PIXI.Sprite;
	private _enabled: boolean = true;
	
	constructor({enabledSprite, disabledSprite}: {enabledSprite: string, disabledSprite: string}) {
		super();
		
		this.createButtonSprites(enabledSprite, disabledSprite);
		this.updateState();
		this.setButtonInteractivity();
	}
	
	private createButtonSprites(enabledSprite: string, disabledSprite: string): void {
		this.enabledSprite = PIXI.Sprite.from(PIXI.Assets.get(enabledSprite));
		this.disabledSprite = PIXI.Sprite.from(PIXI.Assets.get(disabledSprite));
		
		this.enabledSprite.anchor.set(0.5);
		this.disabledSprite.anchor.set(0.5);
		
		this.addChild(this.enabledSprite);
		this.addChild(this.disabledSprite);
	}
	
	private setButtonInteractivity(): void {
		this.eventMode = 'static';
		this.cursor = 'pointer';
	}
	
	public setHandler(callback: () => void): void {
		this.clearHandler();
		this.on('pointerdown', () => {
			console.log(' ');
			console.log('CLICK');
			console.log(' ');
			if (this._enabled) {
				callback();
			}
		});
	}
	
	public clearHandler(): void {
		this.removeAllListeners('pointerdown'); // ✅ Removes all existing handlers
	}
	
	get enabled(): boolean {
		return this._enabled;
	}
	
	set enabled(value: boolean) {
		if (this._enabled !== value) {
			this._enabled = value;
			this.updateState();
		}
	}
	
	private updateState(): void {
		this.enabledSprite.visible = this._enabled;
		this.disabledSprite.visible = !this._enabled;
		this.eventMode = this._enabled ? 'static' : 'none';
		this.cursor = this._enabled ? 'pointer' : 'default';
	}
}