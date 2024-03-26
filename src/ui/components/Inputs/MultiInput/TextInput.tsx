import { TextField } from '@adobe/react-spectrum';
import React, { FC } from 'react';
import { InputType } from '../../../types';

interface TextInputProps {
	inputType: InputType;
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
}

export const TextInput: FC<TextInputProps> = ({ inputType, inputValue, label, onInputChange }) => (
	<TextField
		gridArea="input"
		defaultValue={inputValue}
		onChange={(value) => onInputChange(value, inputType)}
		label={label}
		width="100%"
	/>
);
