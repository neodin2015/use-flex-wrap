type Callback = () => void;

export const createObservers = (
	element: HTMLElement,
	callback: Callback,
): { disconnect: () => void } => {
	const resizeObserver = new ResizeObserver(callback);
	const mutationObserver = new MutationObserver(callback);

	resizeObserver.observe(element);
	mutationObserver.observe(element, { childList: true, subtree: true });

	return {
		disconnect: () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		},
	};
};