export const SCENE_CONFIG = {
	reel: {
		position: {x: 400, y: 380},
	},
	spinButton: {
		enabledSprite: 'PLAY',
		disabledSprite: 'PLAY_DISABLED',
		position: {x: 400, y: 700}
	},
	balanceText: {
		fontSize: 24,
		fill: 0xFFFFFF,
		position: {x: 20, y: 20}
	},
	winText: {
		fontSize: 32,
		fill: 0xFFFFFF,
		position: {x: 400, y: 100},
	},
	winBg: {
		sprite: 'winBg',
		position: {x: 400, y: 100}
	}
};

export const REEL_STRIP = [
	'SYM1','SYM5','SYM1','SYM3','SYM4','SYM3','SYM2','SYM4','SYM3','SYM6',
	'SYM3','SYM1','SYM6','SYM1','SYM2','SYM1','SYM2','SYM2','SYM2','SYM1',
	'SYM2','SYM1','SYM4','SYM1','SYM3','SYM6','SYM1','SYM3','SYM2','SYM5',
	'SYM3','SYM1','SYM2','SYM2','SYM2','SYM1','SYM4','SYM1','SYM4','SYM1',
	'SYM3','SYM2','SYM4','SYM4','SYM5','SYM2','SYM3','SYM1','SYM1','SYM1',
	'SYM4','SYM5','SYM2','SYM2','SYM2','SYM1','SYM5','SYM6','SYM1','SYM3',
	'SYM4','SYM2','SYM5','SYM2','SYM1','SYM5','SYM1','SYM2','SYM1','SYM1',
	'SYM1','SYM4','SYM4','SYM3','SYM3','SYM5','SYM5','SYM4','SYM2','SYM5',
	'SYM2','SYM1','SYM3','SYM2','SYM3','SYM1','SYM4','SYM3','SYM4','SYM2',
	'SYM3','SYM4','SYM1','SYM1','SYM1','SYM2','SYM6','SYM3','SYM2','SYM3',
	'SYM1','SYM5'
];

export const REEL_CONFIG = {
	backgroundSprite: 'REEL',
	size: {width: 140, height: 396},
	symbolSize: {width: 128, height: 128},
	visibleSymbols: 3,
	totalSymbols: 5,
	spinDuration: 3,
	symbolSpacing: 128,
	mask: {
		position: {x: -64, y: -192},
		size: {width: 128, height: 384}
	}
};