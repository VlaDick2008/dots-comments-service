export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

export function toNumber(val: any, fallback = 0): number {
	const n = Number(val);
	return Number.isNaN(n) ? fallback : n;
}
