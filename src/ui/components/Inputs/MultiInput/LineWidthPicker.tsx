import { Item, Picker } from '@adobe/react-spectrum';
import React, { FC } from 'react';
import { InputType } from '../../../types';

interface LineWidthPickerProps {
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
}

export const LineWidthPicker: FC<LineWidthPickerProps> = ({ inputValue, label, onInputChange }) => {
	const options = [{ id: 'XS' }, { id: 'S' }, { id: 'M' }, { id: 'L' }, { id: 'XL' }];

	return (
		<Picker
			items={options}
			defaultSelectedKey={inputValue}
			label={label}
			onSelectionChange={(key: string) => onInputChange(key, 'lineWidthPicker')}
			width="100%"
		>
			{({ id }) => <Item>{id}</Item>}
		</Picker>
	);
};
