interface WinResult {
	isWin: boolean;
	winAmount: number;
	winningPositions: number[];
	symbolType?: string;
}

export class WinEvaluator {
	public static evaluateWin(symbolTypes: string[]): WinResult {
		const symbolCounts = new Map<string, number[]>();
		symbolTypes.forEach((type, index) => {
			if (!symbolCounts.has(type)) {
				symbolCounts.set(type, []);
			}
			symbolCounts.get(type)?.push(index);
		});
		
		let bestWin: WinResult = {
			isWin: false,
			winAmount: 0,
			winningPositions: [],
			symbolType: undefined
		};
		
		symbolCounts.forEach((positions, symbolType) => {
			if (positions.length >= 2) {
				bestWin = {
					isWin: true,
					winAmount: 2,
					winningPositions: positions,
					symbolType: symbolType
				};
			}
		});
		
		return bestWin;
	}
}