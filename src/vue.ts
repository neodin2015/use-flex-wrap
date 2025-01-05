import { onMounted, onUnmounted, ref } from 'vue';
import { debounce, detectWrap, createObservers } from './utils';
import { IUseFlexWrapOptions } from './types.ts';
import { options } from './options.ts';

export const useFlexWrap = (userOptions?: IUseFlexWrapOptions) => {
	const { debounceTime } = { ...options, ...userOptions };
	const containerRef = ref<HTMLElement | null>(null);
	const wrap = ref(false);
	const wrapStage = ref(0);

	const detectWrapCallback = () => {
		if (!containerRef.value) return;

		const { isWrap, wrapStage: stage } = detectWrap(containerRef.value);
		wrap.value = isWrap;
		wrapStage.value = stage;
	};

	onMounted(() => {
		const debouncedFunction = debounce(detectWrapCallback, debounceTime!);

		if (containerRef.value) {
			const { disconnect } = createObservers(
				containerRef.value,
				debouncedFunction,
			);

			window.addEventListener('resize', debouncedFunction);

			onUnmounted(() => {
				disconnect();
				window.removeEventListener('resize', debouncedFunction);
			});
		}
	});

	return {
		containerRef,
		wrap,
		wrapStage,
		detectWrap: detectWrapCallback,
	};
};