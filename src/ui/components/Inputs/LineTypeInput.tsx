import { BarProps, LineType } from '@adobe/react-spectrum-charts';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkBarLineType } from '../../store/slices/chartSlice';
import { InputType } from '../../types';
import { MultiInput } from './MultiInput/MultiInput';

export const LineTypeInput = () => {
	const lineType = (useSelector(selectMarkProps) as BarProps).lineType;
	const dispatch = useDispatch();

	const inputType = useMemo(() => {
		if (!lineType) return 'lineTypePicker';
		if (typeof lineType === 'string' || Array.isArray(lineType)) return 'key';

		if (isNamedLineType(lineType.value)) return 'lineTypePicker';
		return 'dashArray';
	}, [lineType]);

	const onInputChange = (value: string, type: InputType) => {
		switch (type) {
			case 'key':
				dispatch(setMarkBarLineType(value));
				break;
			case 'lineTypePicker':
				dispatch(setMarkBarLineType({ value: value as LineType }));
				break;
			case 'dashArray':
				dispatch(setMarkBarLineType({ value: value.split(' ').map(parseFloat) }));
				break;
		}
	};

	const inputValue = useMemo(() => {
		if (!lineType) return;
		if (typeof lineType === 'string') return lineType;
		if (Array.isArray(lineType)) return lineType[0];
		if (Array.isArray(lineType.value)) return lineType.value.join(' ');
		return lineType.value;
	}, [lineType, inputType]);

	return (
		<MultiInput
			inputTypes={['key', 'lineTypePicker', 'dashArray']}
			inputValue={inputValue}
			label="Line type"
			onInputChange={onInputChange}
			selectedInputType={inputType}
		/>
	);
};

const lineTypes = ['solid', 'dashed', 'dotted', 'dotDash', 'shortDash', 'longDash', 'twoDash'] as const;

const isNamedLineType = (lineType: unknown): lineType is (typeof lineTypes)[number] => {
	return typeof lineType === 'string' && lineTypes.includes(lineType as (typeof lineTypes)[number]);
};
