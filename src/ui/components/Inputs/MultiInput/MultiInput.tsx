import { ActionGroup, Grid, Item, Text, TextField, useProvider } from '@adobe/react-spectrum';
import ColorPalette from '@spectrum-icons/workflow/ColorPalette';
import DataMapping from '@spectrum-icons/workflow/DataMapping';
import Type from '@spectrum-icons/workflow/Type';
import React, { FC, ReactElement, useMemo, useState } from 'react';
import { InputType } from '../../../types';
import { DataKeyPicker } from './DataKeyPicker';
import { NumberSlider } from './NumberSlider';
import { SpectrumColorInput } from './SpectrumColorInput';
import { TextInput } from './TextInput';
import MoveLeftRight from '@spectrum-icons/workflow/MoveLeftRight';
import { LineTypePicker } from './LineTypePicker';
import Dropdown from '@spectrum-icons/workflow/Dropdown';
import { LineWidthPicker } from './LineWidthPicker';
import { LineWidth } from '@adobe/react-spectrum-charts/*';
import { NumberFormatPicker } from './NumberFormatPicker';

interface MultiInputProps {
	inputTypes: InputType[];
	inputValue?: string;
	label?: string;
	onInputChange?: (key: string, type: InputType) => void;
	selectedInputType: InputType;
}

export const MultiInput: FC<MultiInputProps> = ({ inputTypes, selectedInputType, ...inputProps }) => {
	const [inputType, setInputType] = useState<InputType>(selectedInputType);

	const inputTypeOption: Record<InputType, { text: string; icon: ReactElement }> = {
		cssValue: { text: 'Css color value', icon: <Type /> },
		dashArray: { text: 'Dash array', icon: <Type /> },
		key: { text: 'Data key', icon: <DataMapping /> },
		lineTypePicker: { text: 'Line type name', icon: <Dropdown /> },
		lineWidthNumber: { text: 'Line width number', icon: <MoveLeftRight /> },
		lineWidthPicker: { text: 'Line width name', icon: <Dropdown /> },
		numberFormatPicker: { text: 'Number format name', icon: <Dropdown /> },
		d3FormatString: { text: 'D3 format string', icon: <Type /> },
		opacityNumber: { text: 'Opacity number', icon: <MoveLeftRight /> },
		spectrumValue: { text: 'Spectrum color name', icon: <ColorPalette /> },
	};

	const options = inputTypes.map((type) => ({ id: type, ...inputTypeOption[type] }));

	return (
		<Grid areas={['input toggle']} columns={['1fr', 'auto']} alignItems="end" columnGap="size-100">
			<Input {...inputProps} selectedInputType={inputType} />
			<ActionGroup
				items={options}
				aria-label="Text alignment"
				overflowMode="collapse"
				selectionMode="single"
				defaultSelectedKeys={[selectedInputType]}
				disallowEmptySelection
				buttonLabelBehavior="hide"
				maxWidth={44}
				isQuiet
				onSelectionChange={(key) => setInputType(Array.from(key)[0] as InputType)}
			>
				{(item: { id: InputType; text: string; icon: ReactElement }) => (
					<Item key={item.id}>
						{item.icon}
						<Text>{item.text}</Text>
					</Item>
				)}
			</ActionGroup>
		</Grid>
	);
};

interface InputProps {
	onInputChange?: (key: string, type: InputType) => void;
	inputValue?: string;
	label?: string;
	selectedInputType: InputType;
}

const Input: FC<InputProps> = ({ selectedInputType, ...inputProps }) => {
	const { colorScheme } = useProvider();

	const trackGradient: [string, string] = useMemo(() => {
		if (colorScheme === 'dark') return ['#1d1d1d', '#fff'];
		return ['#f8f8f8', '#000'];
	}, [colorScheme]);

	switch (selectedInputType) {
		case 'cssValue':
			return <TextInput {...inputProps} inputType="cssValue" />;

		case 'd3FormatString':
			return <TextInput {...inputProps} inputType="d3FormatString" />;

		case 'dashArray':
			return <TextInput {...inputProps} inputType="dashArray" />;

		case 'key':
			return <DataKeyPicker {...inputProps} />;

		case 'lineTypePicker':
			return <LineTypePicker {...inputProps} />;

		case 'lineWidthNumber':
			return <NumberSlider inputType="lineWidthNumber" maxValue={5} minValue={0} step={0.5} {...inputProps} />;

		case 'lineWidthPicker':
			return <LineWidthPicker {...inputProps} />;

		case 'numberFormatPicker':
			return <NumberFormatPicker {...inputProps} />;

		case 'opacityNumber':
			return (
				<NumberSlider
					inputType="opacityNumber"
					maxValue={1}
					minValue={0}
					step={0.01}
					trackGradient={trackGradient}
					{...inputProps}
				/>
			);

		case 'spectrumValue':
			return <SpectrumColorInput {...inputProps} />;
	}
};

const getLineWidthPixelsFromLineWidth = (lineWidth: LineWidth): number => {
	if (typeof lineWidth === 'number') {
		return lineWidth;
	}

	switch (lineWidth) {
		case 'XS':
			return 1;
		case 'S':
			return 1.5;
		case 'L':
			return 3;
		case 'XL':
			return 4;
		case 'M':
		default:
			return 2;
	}
};
