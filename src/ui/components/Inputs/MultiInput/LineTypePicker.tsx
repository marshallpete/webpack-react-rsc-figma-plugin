import React, { FC } from 'react';
import { ComboBox, Item, Picker } from '@adobe/react-spectrum';
import { InputType } from '../../../types';

interface LineTypePickerProps {
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
}

export const LineTypePicker: FC<LineTypePickerProps> = ({ inputValue, label, onInputChange }) => {
	const options = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'dashed', label: 'Dashed' },
		{ id: 'dotted', label: 'Dotted' },
		{ id: 'dotDash', label: 'Dot-dash' },
		{ id: 'shortDash', label: 'Short dash' },
		{ id: 'longDash', label: 'Long dash' },
		{ id: 'twoDash', label: 'Two dash' },
	];

	return (
		<Picker
			items={options}
			defaultSelectedKey={inputValue}
			label={label}
			onSelectionChange={(key: string) => onInputChange(key, 'lineTypePicker')}
			width="100%"
		>
			{({ label }) => <Item>{label}</Item>}
		</Picker>
	);
};
