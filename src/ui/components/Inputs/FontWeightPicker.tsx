import { Item, Picker } from '@adobe/react-spectrum';
import { LabelAlign } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';

type FontWeightPickerProps = {
	defaultValue: string;
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string) => void;
};

export const FontWeightPicker: FC<FontWeightPickerProps> = ({ defaultValue, label, inputValue, onInputChange }) => {
	const options = [
		{ id: 'lighter', label: 'Light' },
		{ id: 'normal', label: 'Normal' },
		{ id: 'bold', label: 'Bold' },
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
