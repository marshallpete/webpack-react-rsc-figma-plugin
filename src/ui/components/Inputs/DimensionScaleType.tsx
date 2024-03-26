import { Radio, RadioGroup } from '@adobe/react-spectrum';
import { ScaleType } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';

interface DimensionScaleTypeProps {
	defaultValue: ScaleType;
	inputValue?: ScaleType;
	onInputChange: (value: ScaleType) => void;
}

export const DimensionScaleType: FC<DimensionScaleTypeProps> = ({ defaultValue, inputValue, onInputChange }) => {
	return (
		<RadioGroup
			value={inputValue ?? defaultValue}
			label="Dimension data type"
			onChange={onInputChange}
			orientation="horizontal"
		>
			<Radio value="linear">Linear data</Radio>
			<Radio value="point">Point data</Radio>
			<Radio value="time">Time data</Radio>
		</RadioGroup>
	);
};
