import { Game } from './game';

window.addEventListener('load', () => {
	const game = new Game();
	document.getElementById('game')?.appendChild(game.view);
});