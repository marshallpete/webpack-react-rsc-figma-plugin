import React, { FC } from 'react';
import { Slider } from '@adobe/react-spectrum';
import { InputType } from '../../../types';

interface NumberSliderProps {
	inputType: InputType;
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
	minValue?: number;
	maxValue?: number;
	step?: number;
	trackGradient?: [string, string];
}

export const NumberSlider: FC<NumberSliderProps> = ({ inputType, inputValue, onInputChange, ...sliderProps }) => (
	<Slider
		{...sliderProps}
		defaultValue={isNaN(parseFloat(inputValue)) ? sliderProps.maxValue ?? 1 : parseFloat(inputValue)}
		gridArea="input"
		onChangeEnd={(value) => onInputChange(value.toString(), inputType)}
		width="100%"
		marginTop={4}
		marginBottom={5}
	/>
);
