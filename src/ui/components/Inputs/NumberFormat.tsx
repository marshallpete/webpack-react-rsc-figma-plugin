import { NumberFormat as RscNumberFormat } from '@adobe/react-spectrum-charts';
import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAxis } from '../../hooks/useAxis';
import { setAxisNumberFormat } from '../../store/slices/chartSlice';
import { MultiInput } from './MultiInput/MultiInput';

type NumberFormatProps = {
	id: string;
};

export const NumberFormat: FC<NumberFormatProps> = ({ id }) => {
	const { numberFormat } = useAxis(id);
	const dispatch = useDispatch();

	const inputType = useMemo(() => {
		if (!numberFormat || isNamedNumberFormat(numberFormat)) return 'numberFormatPicker';
		return 'd3FormatString';
	}, [numberFormat]);

	const onInputChange = (numberFormat: string) => {
		dispatch(setAxisNumberFormat({ id, numberFormat }));
	};

	return (
		<MultiInput
			inputTypes={['numberFormatPicker', 'd3FormatString']}
			inputValue={numberFormat}
			label="Number format"
			onInputChange={(numberFormat: string) => dispatch(setAxisNumberFormat({ id, numberFormat }))}
			selectedInputType={inputType}
		/>
	);
};

const isNamedNumberFormat = (numberFormat?: string): numberFormat is RscNumberFormat => {
	return ['currency', 'shortCurrency', 'shortNumber', 'standardNumber'].includes(numberFormat);
};
