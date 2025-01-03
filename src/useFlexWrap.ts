import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from './debounce.ts';

interface IUseFlexWrapOptions {
	debounceTime?: number;
}


export const useFlexWrap = <T extends HTMLElement>({ debounceTime = 300 }: IUseFlexWrapOptions = {}) => {
	const containerRef = useRef<T>(null);
	const [wrap, setWrap] = useState(false);
	const [wrapStage, setWrapStage] = useState(0);

	const detectWrap = useCallback(() => {
		if (!containerRef.current) {
			setWrap(false);
			setWrapStage(0);
			return;
		}

		const container = containerRef.current;
		const isRow = getComputedStyle(container).flexDirection === 'row';
		const containerHeight = container.clientHeight;
		const childOffsets = Array.from(container.children).map(
			(child) => isRow ? (child as HTMLElement).offsetTop : (child as HTMLElement).offsetLeft,
		);

		const uniqueLines = Array.from(new Set(childOffsets));

		const numberOfLines = uniqueLines.length;

		const isWrap = uniqueLines.length > 1 || container.scrollHeight > containerHeight;

		setWrap(isWrap);
		setWrapStage(isWrap ? (numberOfLines - 1) : 0);
	}, []);

	useEffect(() => {
		const debouncedCalculateWrap = debounce(detectWrap, debounceTime);

		const observer = new ResizeObserver(debouncedCalculateWrap);
		const mutationObserver = new MutationObserver(debouncedCalculateWrap);

		if (containerRef.current) {
			observer.observe(containerRef.current);
			mutationObserver.observe(containerRef.current, { childList: true, subtree: true });
		}

		window.addEventListener('resize', debouncedCalculateWrap);

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
				mutationObserver.disconnect();
			}
			observer.disconnect();
			window.removeEventListener('resize', debouncedCalculateWrap);
		};
	}, [detectWrap, debounceTime]);

	return { ref: containerRef, wrap, wrapStage, detectWrap };
};

