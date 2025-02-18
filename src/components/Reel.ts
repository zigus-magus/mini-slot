import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import {REEL_STRIP, REEL_CONFIG} from '../config/general.ts';

export class Reel extends PIXI.Container {
	private readonly config;
	private symbols: PIXI.Sprite[] = [];
	private reelMask!: PIXI.Graphics;
	private currentIndex: number = 0;
	private symbolsContainer!: PIXI.Container;
	private spinAnimation: gsap.core.Tween | null = null;
	private visibleSymbolsArray: string[] = [];
	
	constructor(config = REEL_CONFIG) {
		super();
		
		this.config = config;
		
		this.initializeReel();
		this.initializeSymbols();
	}
	
	private initializeReel(): void {
		this.createReelBackground();
		this.createSymbolContainer();
		this.createReelMask();
	}
	
	private createSymbolContainer(): void {
		this.symbolsContainer = new PIXI.Container();
		this.addChild(this.symbolsContainer);
	}
	
	private createReelBackground(): void {
		if (!this.config.backgroundSprite) return;
		
		const reelBg = PIXI.Sprite.from(PIXI.Assets.get(this.config.backgroundSprite));
		reelBg.anchor.set(0.5);
		this.addChild(reelBg);
	}
	
	private createReelMask() {
		if (!this.config.mask || !this.symbolsContainer) return;
		const {position, size} = this.config.mask;
		
		this.reelMask = new PIXI.Graphics();
		this.reelMask.beginFill(0xFFFFFF);
		this.reelMask.drawRect(position.x, position.y, size.width, size.height);
		this.reelMask.endFill();
		this.addChild(this.reelMask);
		this.symbolsContainer.mask = this.reelMask;
	}
	
	private initializeSymbols(): void {
		const {visibleSymbols, totalSymbols} = this.config;
		const symbolSpacing = this.config.symbolSpacing;
		
		for (let i = 0; i < totalSymbols; i++) {
			const symbolIndex = (this.currentIndex + i) % REEL_STRIP.length;
			const symbol = this.createSymbol(REEL_STRIP[symbolIndex]);
			symbol.y = (i - 2) * symbolSpacing;
			this.symbolsContainer.addChild(symbol);
			this.symbols.push(symbol);
			
			
			if (i >= 2 && i < 2 + visibleSymbols) {
				this.visibleSymbolsArray.push(REEL_STRIP[symbolIndex]);
			}
		}
	}
	
	private createSymbol(symbolName: string): PIXI.Sprite {
		const symbol = PIXI.Sprite.from(PIXI.Assets.get(symbolName));
		const {width, height} = this.config.symbolSize;
		
		symbol.anchor.set(0.5);
		symbol.width = width;
		symbol.height = height;
		
		return symbol;
	}
	
	public getVisibleSymbolIds(): string[] {
		return this.visibleSymbolsArray.slice(1, 4)
	}
	
	public spin(): Promise<void> {
		return new Promise((resolve) => {
			const symbolSpacing = this.config.size.height / this.config.visibleSymbols;
			const totalDistance = symbolSpacing * 20;
			
			this.spinAnimation = gsap.to(this.symbolsContainer, {
				y: `+=${totalDistance}`,
				duration: 2,
				onUpdate: this.updateSymbolsPosition.bind(this),
				onComplete: () => {
					this.resetSymbolsPosition();
					resolve();
				}
			});
		})
	}
	
	public stop(force: boolean): Promise<void> {
		const duration = force ? 0.1 : 1;
		return new Promise((resolve) => {
			gsap.to(this.spinAnimation, {
				duration,
				ease: "power1.out",
				progress: 1,
				onComplete: () => {
					this.spinAnimation = null;
					this.resetSymbolsPosition();
					resolve();
				}
			});
		})
	}
	
	private updateSymbolsPosition(): void {
		const symbolSpacing = this.config.symbolSpacing;
		if (Math.abs(this.symbolsContainer.y) >= symbolSpacing) {
			const moveCount = Math.floor(Math.abs(this.symbolsContainer.y) / symbolSpacing);
			this.currentIndex = (this.currentIndex + moveCount) % REEL_STRIP.length;
			
			const newSymbols = this.getNextSymbols(this.config.totalSymbols);
			for (let i = 0; i < this.symbols.length; i++) {
				this.symbols[i].texture = PIXI.Assets.get(newSymbols[i]);
			}
			
			this.symbolsContainer.y %= symbolSpacing;
			
			
			this.visibleSymbolsArray = newSymbols.slice(0, this.config.visibleSymbols + 2);
		}
	}
	
	private getNextSymbols(count: number): string[] {
		const symbols: string[] = [];
		for (let i = 0; i < count; i++) {
			const index = (this.currentIndex + i) % REEL_STRIP.length;
			symbols.push(REEL_STRIP[index]);
		}
		return symbols;
	}
	
	private resetSymbolsPosition(): void {
		this.symbolsContainer.y = 0;
		const symbolSpacing = this.config.symbolSpacing;
		for (let i = 0; i < this.config.totalSymbols; i++) {
			this.symbols[i].y = (i - 2) * symbolSpacing;
		}
	}
}