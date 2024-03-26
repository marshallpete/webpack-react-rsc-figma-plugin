import React, { FC } from 'react';
import { ComboBox, Item } from '@adobe/react-spectrum';
import { InputType } from '../../../types';

interface SpectrumColorInputProps {
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
}

export const SpectrumColorInput: FC<SpectrumColorInputProps> = ({ inputValue, label, onInputChange }) => {
	const options = [
		{ id: 'red-400' },
		{ id: 'red-500' },
		{ id: 'red-600' },
		{ id: 'red-700' },
		{ id: 'red-800' },
		{ id: 'red-900' },
		{ id: 'blue-400' },
		{ id: 'blue-500' },
		{ id: 'blue-600' },
		{ id: 'blue-700' },
		{ id: 'blue-800' },
		{ id: 'blue-900' },
		{ id: 'green-400' },
		{ id: 'green-500' },
		{ id: 'green-600' },
		{ id: 'green-700' },
		{ id: 'green-800' },
		{ id: 'green-900' },
	];
	return (
		<ComboBox
			defaultItems={options}
			defaultSelectedKey={inputValue}
			label={label}
			onSelectionChange={(key: string) => onInputChange(key, 'spectrumValue')}
			width="100%"
		>
			{({ id }) => <Item>{id}</Item>}
		</ComboBox>
	);
};
