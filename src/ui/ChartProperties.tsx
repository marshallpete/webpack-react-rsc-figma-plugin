import React, { FC, useState } from 'react';
import { SupportedChartProps } from './types';
import {
	Divider,
	Flex,
	Grid,
	Item,
	Key,
	NumberField,
	Picker,
	Switch,
	Text,
	TextArea,
	TextField,
	View,
} from '@adobe/react-spectrum';
import { ValidationError } from '@react-types/shared';
import { AxisProps, ChartColors, LegendProps } from '@adobe/react-spectrum-charts';
import { buildChart } from './chartBuilder';

interface ChartPropertiesProps {
	chartProps: SupportedChartProps;
	setChartProps: (chartProps: SupportedChartProps) => void;
	chartData: { data: unknown; description: string };
	chartType: Key;
	yAxis: Key;
	xAxis: Key;
	series: Key;
	legendProps: LegendProps;
	includeLegend: boolean;
	xAxisProps: AxisProps;
	yAxisProps: AxisProps;
	includeXAxis: boolean;
	includeYAxis: boolean;
}

const ChartProperties: FC<ChartPropertiesProps> = ({
	chartProps,
	chartType,
	setChartProps,
	chartData,
	includeLegend,
	includeXAxis,
	includeYAxis,
	legendProps,
	series,
	xAxis,
	xAxisProps,
	yAxis,
	yAxisProps,
}) => {
	const { backgroundColor, colors, colorScheme, height, padding, width } = chartProps;
	const [useCustomColors, setUseCustomColors] = useState(Array.isArray(colors));
	const [customColors, setCustomColors] = useState<string>(Array.isArray(colors) ? colors.join('\n') : '');

	const colorOptions = [
		// { id: 'categorical6', name: 'Categorical 6' },
		// { id: 'categorical12', name: 'Categorical 12' },
		{ id: 'categorical16', name: 'Categorical' },
		// { id: 'divergentOrangeYellowSeafoam5', name: 'Diverging orange yellow seafoam 5' },
		// { id: 'divergentOrangeYellowSeafoam9', name: 'Diverging orange yellow seafoam 9' },
		{ id: 'divergentOrangeYellowSeafoam15', name: 'Diverging orange yellow seafoam' },
		// { id: 'divergentRedBlue5', name: 'Diverging Red Blue 5' },
		// { id: 'divergentRedBlue9', name: 'Diverging Red Blue 9' },
		{ id: 'divergentRedBlue15', name: 'Diverging red blue' },
		// { id: 'divergentRedYellowBlue5', name: 'Diverging red yellow blue 5' },
		// { id: 'divergentRedYellowBlue9', name: 'Diverging red yellow blue 9' },
		{ id: 'divergentRedYellowBlue15', name: 'Diverging red yellow blue' },
		// { id: 'sequentialCerulean5', name: 'Sequential cerulean 5' },
		// { id: 'sequentialCerulean9', name: 'Sequential cerulean 9' },
		{ id: 'sequentialCerulean16', name: 'Sequential cerulean' },
		// { id: 'sequentialForest5', name: 'Sequential forest 5' },
		// { id: 'sequentialForest9', name: 'Sequential forest 9' },
		{ id: 'sequentialForest16', name: 'Sequential forest' },
		// { id: 'sequentialMagma5', name: 'Sequential magma 5' },
		// { id: 'sequentialMagma9', name: 'Sequential magma 9' },
		{ id: 'sequentialMagma16', name: 'Sequential magma' },
		// { id: 'sequentialRose5', name: 'Sequential rose 5' },
		// { id: 'sequentialRose9', name: 'Sequential rose 9' },
		{ id: 'sequentialRose16', name: 'Sequential rose' },
		// { id: 'sequentialViridis5', name: 'Sequential viridis 5' },
		// { id: 'sequentialViridis9', name: 'Sequential viridis 9' },
		{ id: 'sequentialViridis16', name: 'Sequential viridis' },
	];

	const onCustomColorUpdate = (value: string) => {
		setCustomColors(value);
		const customColors = value.split('\n').map((color) => color.trim());
		const isValid = customColors.every(validateColor);
		if (isValid) {
			setChartProps({ ...chartProps, colors: customColors });
		}
	};

	const onToggleCustomColors = (value: boolean) => {
		setUseCustomColors(value);
		if (Array.isArray(colors)) {
			setChartProps({ ...chartProps, colors: 'categorical16' });
		} else {
			onCustomColorUpdate(customColors);
		}
	};

	return (
		<Grid areas={['form preview']} columns={[250, '1fr']} columnGap="size-100" height="auto" marginY="size-100">
			<Flex gridArea="form" direction="column" gap="size-150">
				<Text>Size</Text>
				<NumberField
					label="Width"
					value={width}
					minValue={100}
					maxValue={2000}
					onChange={(value) => setChartProps({ ...chartProps, width: value })}
				/>
				<NumberField
					label="Height"
					value={height}
					minValue={100}
					maxValue={2000}
					onChange={(value) => setChartProps({ ...chartProps, height: value })}
				/>
				<NumberField
					label="Padding"
					value={padding}
					minValue={0}
					maxValue={100}
					onChange={(value) => setChartProps({ ...chartProps, padding: value })}
				/>
				<Divider size="M" />
				<Text>Color</Text>
				<Text>
					All color values support spectrum color names (red-500), hexidecimal (#EE4431), and RGB (rgb(205,
					12, 55))
				</Text>
				<Switch
					defaultSelected={colorScheme === 'dark'}
					onChange={(value) => setChartProps({ ...chartProps, colorScheme: value ? 'dark' : 'light' })}
				>
					Dark mode
				</Switch>
				<Switch defaultSelected={useCustomColors} onChange={onToggleCustomColors}>
					Custom series colors
				</Switch>
				{useCustomColors && (
					<View>
						<TextArea
							label="Custom series colors"
							value={customColors}
							onChange={onCustomColorUpdate}
						></TextArea>
						<View>
							<Text>Type each color on a new line</Text>
						</View>
					</View>
				)}
				{!useCustomColors && (
					<Picker
						label="Series colors"
						items={colorOptions}
						defaultSelectedKey={colors as string}
						onSelectionChange={(value) => setChartProps({ ...chartProps, colors: value as ChartColors })}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
				)}
				<TextField
					validate={validateColorField}
					label="Background color"
					value={backgroundColor}
					onChange={(value) => setChartProps({ ...chartProps, backgroundColor: value })}
				/>
			</Flex>
			<View gridArea="preview">
				{buildChart(
					chartType,
					chartData.data,
					xAxis,
					yAxis,
					series,
					includeLegend,
					legendProps,
					includeXAxis,
					xAxisProps,
					includeYAxis,
					yAxisProps,
					chartProps,
					true
				)}
			</View>
		</Grid>
	);
};

const validateColorField = (color: string): true | ValidationError => {
	if (!validateColor(color)) {
		return 'Please enter a valid color';
	}
	return true;
};

const validateColor = (color: string) =>
	color.match(
		/^(#([0-9a-f]{3}){1,2}|rgb\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)|[a-z]+-\d{2,4}|transparent)$/i
	) !== null;

export default ChartProperties;
