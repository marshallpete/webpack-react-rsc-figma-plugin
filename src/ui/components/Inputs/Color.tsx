import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkColor } from '../../store/slices/chartSlice';
import { MultiInput } from './MultiInput/MultiInput';
import { InputType } from '../../types';

export const Color = () => {
	const { color } = useSelector(selectMarkProps);
	const dispatch = useDispatch();

	const inputType = useMemo(() => {
		if (!color || typeof color === 'string' || Array.isArray(color)) return 'key';
		if (isSpectrumColorValue(color.value)) {
			return 'spectrumValue';
		}
		return 'cssValue';
	}, [color]);

	const onInputChange = (value: string, type: InputType) => {
		if (type === 'key') {
			dispatch(setMarkColor(value));
			return;
		}
		dispatch(setMarkColor({ value }));
	};

	const inputValue = useMemo(() => {
		if (!color) return;
		if (typeof color === 'object' && 'value' in color) {
			return color.value;
		}
		if (Array.isArray(color)) return color[0];
		return color;
	}, [color, inputType]);

	return (
		<MultiInput
			inputTypes={['key', 'spectrumValue', 'cssValue']}
			inputValue={inputValue}
			label="Color"
			onInputChange={onInputChange}
			selectedInputType={inputType}
		/>
	);
};

const isSpectrumColorValue = (color: string): boolean => {
	return color.match(/(red|blue|green)-[4-9]00/) !== null;
};
