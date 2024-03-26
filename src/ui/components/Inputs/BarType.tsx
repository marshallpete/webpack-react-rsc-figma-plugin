import { Radio, RadioGroup } from '@adobe/react-spectrum';
import { BarProps } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkBarType } from '../../store/slices/chartSlice';

export const BarType: FC = () => {
	const { type } = useSelector(selectMarkProps) as BarProps;
	const dispatch = useDispatch();

	return (
		<RadioGroup
			defaultValue={type ?? 'stacked'}
			label="Bar type"
			onChange={(value: BarProps['type']) => dispatch(setMarkBarType(value))}
			orientation="horizontal"
		>
			<Radio value="dodged">Dodged</Radio>
			<Radio value="stacked">Stacked</Radio>
		</RadioGroup>
	);
};
