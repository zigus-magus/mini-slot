export function logStateTransition(action: 'enter' | 'exit', stateName: string): void {
	const color = action === 'enter' ? 'color: green; font-weight: bold;' : 'color: red; font-weight: bold;';
	console.log(`%c${action.toUpperCase()} ${stateName} STATE`, color);
}