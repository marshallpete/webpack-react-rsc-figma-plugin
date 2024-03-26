import { Radio, RadioGroup } from '@adobe/react-spectrum';
import { Orientation } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';

interface OrientationInputProps {
	defaultValue: Orientation;
	inputValue?: Orientation;
	label?: string;
	onInputChange?: (value: Orientation) => void;
}

export const OrientationInput: FC<OrientationInputProps> = ({ defaultValue, inputValue, label, onInputChange }) => {
	return (
		<RadioGroup
			defaultValue={inputValue ?? defaultValue}
			label={label}
			onChange={onInputChange}
			orientation="horizontal"
		>
			<Radio value="horizontal">Horizontal</Radio>
			<Radio value="vertical">Vertical</Radio>
		</RadioGroup>
	);
};
