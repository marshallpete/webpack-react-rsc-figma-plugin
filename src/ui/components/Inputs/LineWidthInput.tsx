import { BarProps, LineWidth } from '@adobe/react-spectrum-charts';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkBarLineWidth } from '../../store/slices/chartSlice';
import { InputType } from '../../types';
import { MultiInput } from './MultiInput/MultiInput';

export const LineWidthInput = () => {
	const lineWidth = (useSelector(selectMarkProps) as BarProps).lineWidth;
	const dispatch = useDispatch();

	const inputType = useMemo(() => {
		if (!lineWidth || isNamedLineWidth(lineWidth)) return 'lineWidthPicker';
		return 'lineWidthNumber';
	}, [lineWidth]);

	const onInputChange = (value: string, type: InputType) => {
		switch (type) {
			case 'lineWidthPicker':
				dispatch(setMarkBarLineWidth(value as LineWidth));
				break;
			case 'lineWidthNumber':
				dispatch(setMarkBarLineWidth(parseFloat(value)));
				break;
		}
	};

	const inputValue = useMemo(() => {
		if (!lineWidth) return;
		if (typeof lineWidth === 'string') return lineWidth;
		return lineWidth.toString();
	}, [lineWidth, inputType]);

	return (
		<MultiInput
			inputTypes={['lineWidthPicker', 'lineWidthNumber']}
			inputValue={inputValue}
			label="Line width"
			onInputChange={onInputChange}
			selectedInputType={inputType}
		/>
	);
};

const lineWidths = ['XS', 'S', 'M', 'L', 'XL'] as const;

const isNamedLineWidth = (lineWidth: unknown): lineWidth is (typeof lineWidths)[number] => {
	return typeof lineWidth === 'string' && lineWidths.includes(lineWidth as (typeof lineWidths)[number]);
};
