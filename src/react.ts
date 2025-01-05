import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, detectWrap, createObservers } from './utils';
import { IUseFlexWrapOptions } from './types.ts';
import { options } from './options.ts';


export const useFlexWrap = <T extends HTMLElement>(userOptions?: IUseFlexWrapOptions) => {
	const { debounceTime } = { ...options, ...userOptions };
	const containerRef = useRef<T>(null);
	const [wrap, setWrap] = useState(false);
	const [wrapStage, setWrapStage] = useState(0);

	const detectWrapCallback = useCallback(() => {
		if (!containerRef.current) return;

		const { isWrap, wrapStage: stage } = detectWrap(containerRef.current);
		setWrap(isWrap);
		setWrapStage(stage);
	}, []);

	useEffect(() => {
		const debouncedFunction = debounce(detectWrapCallback, debounceTime!);

		if (containerRef.current) {
			const { disconnect } = createObservers(
				containerRef.current,
				debouncedFunction,
			);

			window.addEventListener('resize', debouncedFunction);

			return () => {
				disconnect();
				window.removeEventListener('resize', debouncedFunction);
			};
		}
	}, [debounceTime, detectWrapCallback]);

	return {
		ref: containerRef,
		wrap,
		wrapStage,
		detectWrap: detectWrapCallback,
	};
};