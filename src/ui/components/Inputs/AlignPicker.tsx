import { Item, Picker } from '@adobe/react-spectrum';
import { LabelAlign } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';

type AlignPickerProps = {
	defaultValue: string;
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string) => void;
};

export const AlignPicker: FC<AlignPickerProps> = ({ defaultValue, label, inputValue, onInputChange }) => {
	const options: { id: LabelAlign; label: string }[] = [
		{ id: 'start', label: 'Start' },
		{ id: 'center', label: 'Center' },
		{ id: 'end', label: 'End' },
	];
	return (
		<Picker
			items={options}
			defaultSelectedKey={inputValue ?? defaultValue}
			label={label}
			onSelectionChange={onInputChange}
			width="100%"
		>
			{(item) => <Item>{item.label}</Item>}
		</Picker>
	);
};
