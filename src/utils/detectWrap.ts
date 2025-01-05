export const detectWrap = (
	container: HTMLElement,
): { isWrap: boolean; wrapStage: number } => {
	const isRow = getComputedStyle(container).flexDirection === 'row';
	const containerHeight = container.clientHeight;

	const childOffsets = Array.from(container.children).map((child) =>
		isRow ? (child as HTMLElement).offsetTop : (child as HTMLElement).offsetLeft,
	);

	const uniqueLines = Array.from(new Set(childOffsets));
	const numberOfLines = uniqueLines.length;

	const isWrap =
		uniqueLines.length > 1 || container.scrollHeight > containerHeight;

	return {
		isWrap,
		wrapStage: isWrap ? numberOfLines - 1 : 0,
	};
};
