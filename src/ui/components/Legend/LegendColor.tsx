import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLegend } from '../../hooks/useLegend';
import { setLegendColor, setMarkColor } from '../../store/slices/chartSlice';
import { InputType } from '../../types';
import { isSpectrumColorValue } from '../../utils';
import { MultiInput } from '../Inputs/MultiInput/MultiInput';

interface LegendColorProps {
	id: string;
}

export const LegendColor: FC<LegendColorProps> = ({ id }) => {
	const { color } = useLegend(id);
	const dispatch = useDispatch();

	const inputType = useMemo(() => {
		if (!color || typeof color === 'string') return 'key';
		if (isSpectrumColorValue(color.value)) {
			return 'spectrumValue';
		}
		return 'cssValue';
	}, [color]);

	const onInputChange = (value: string, type: InputType) => {
		if (type === 'key') {
			dispatch(setLegendColor({ id, color: value }));
			return;
		}
		dispatch(setLegendColor({ id, color: { value } }));
	};

	const inputValue = useMemo(() => {
		if (!color) return;
		if (typeof color === 'object' && 'value' in color) {
			return color.value;
		}
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
