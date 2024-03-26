import { BarProps } from '@adobe/react-spectrum-charts';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkOpacity } from '../../store/slices/chartSlice';
import { InputType } from '../../types';
import { MultiInput } from './MultiInput/MultiInput';

export const Opacity = () => {
	const opacity = useSelector(selectMarkProps).opacity as BarProps['opacity'];
	const dispatch = useDispatch();

	const inputType = useMemo(() => {
		if (!opacity) return 'opacityNumber';
		if (typeof opacity === 'object' && 'value' in opacity) return 'opacityNumber';
		return 'key';
	}, [opacity]);

	const onInputChange = (value: string, type: InputType) => {
		if (type === 'key') {
			dispatch(setMarkOpacity(value));
			return;
		}
		dispatch(setMarkOpacity({ value: parseFloat(value) }));
	};

	const inputValue = useMemo(() => {
		if (!opacity) return;
		if (typeof opacity === 'object' && 'value' in opacity) {
			return opacity.value.toPrecision(2);
		}
		if (Array.isArray(opacity)) return opacity[0];
		return opacity;
	}, [opacity, inputType]);

	return (
		<MultiInput
			inputTypes={['key', 'opacityNumber']}
			inputValue={inputValue}
			label="Opacity"
			onInputChange={onInputChange}
			selectedInputType={inputType}
		/>
	);
};
