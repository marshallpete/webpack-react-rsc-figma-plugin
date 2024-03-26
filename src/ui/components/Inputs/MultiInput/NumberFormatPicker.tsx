import React, { FC } from 'react';
import { ComboBox, Item, Picker } from '@adobe/react-spectrum';
import { InputType } from '../../../types';

interface NumberFormatPickerProps {
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
}

export const NumberFormatPicker: FC<NumberFormatPickerProps> = ({ inputValue, label, onInputChange }) => {
	const options = [
		{ id: 'currency', label: 'Currency ($2,000.50)' },
		{ id: 'shortCurrency', label: 'Short currency ($2K)' },
		{ id: 'shortNumber', label: 'Short number (2K)' },
		{ id: 'standardNumber', label: 'Standard number (2,000)' },
	];

	return (
		<Picker
			items={options}
			defaultSelectedKey={inputValue}
			label={label}
			onSelectionChange={(key: string) => onInputChange(key, 'numberFormatPicker')}
			width="100%"
		>
			{({ label }) => <Item>{label}</Item>}
		</Picker>
	);
};
