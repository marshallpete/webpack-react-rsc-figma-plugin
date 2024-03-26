import { Item, Picker } from '@adobe/react-spectrum';
import React, { FC } from 'react';
import { useAxis } from '../../hooks/useAxis';
import { useDispatch } from 'react-redux';
import { setAxisGranularity } from '../../store/slices/chartSlice';
import { Granularity } from '@adobe/react-spectrum-charts';

type GranularityPickerProps = {
	id: string;
};

export const GranularityPicker: FC<GranularityPickerProps> = ({ id }) => {
	const { granularity } = useAxis(id);
	const dispatch = useDispatch();

	const options = [
		{ id: 'minute', label: 'Minute' },
		{ id: 'hour', label: 'Hour' },
		{ id: 'day', label: 'Day' },
		{ id: 'week', label: 'Week' },
		{ id: 'month', label: 'Month' },
		{ id: 'quarter', label: 'Quarter' },
	];
	return (
		<Picker
			defaultSelectedKey={granularity ?? 'day'}
			items={options}
			label="Time granularity"
			onSelectionChange={(value: Granularity) => dispatch(setAxisGranularity({ id, granularity: value }))}
			width="100%"
		>
			{({ label }) => <Item>{label}</Item>}
		</Picker>
	);
};
