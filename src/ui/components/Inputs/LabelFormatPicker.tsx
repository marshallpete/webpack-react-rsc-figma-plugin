import { Item, Picker } from '@adobe/react-spectrum';
import { LabelAlign, LabelFormat } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';
import { useAxis } from '../../hooks/useAxis';
import { useDispatch } from 'react-redux';
import { setAxisLabelFormat } from '../../store/slices/chartSlice';

type LabelFormatPickerProps = {
	id: string;
};

export const LabelFromatPicker: FC<LabelFormatPickerProps> = ({ id }) => {
	const { labelFormat } = useAxis(id);
	const dispatch = useDispatch();
	const options: { id: LabelFormat; label: string }[] = [
		{ id: 'duration', label: 'Duration' },
		{ id: 'linear', label: 'Linear' },
		{ id: 'percentage', label: 'Percentage' },
		{ id: 'time', label: 'Time' },
	];
	return (
		<Picker
			items={options}
			defaultSelectedKey={labelFormat}
			label="Label format"
			onSelectionChange={(labelFormat: LabelFormat) => dispatch(setAxisLabelFormat({ id, labelFormat }))}
			width="100%"
		>
			{(item) => <Item>{item.label}</Item>}
		</Picker>
	);
};
