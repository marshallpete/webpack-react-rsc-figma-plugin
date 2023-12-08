import { Flex, Picker, Item, Key, Text, Divider, Checkbox, TextField } from '@adobe/react-spectrum';
import React, { MutableRefObject } from 'react';
import { useEffect, Dispatch, SetStateAction, FC } from 'react';

import { buildChart } from './chartBuilder';
import { AxisProps, LegendProps, Position } from '@adobe/react-spectrum-charts';
import { SupportedChartProps } from './types';

interface MappingsTabProps {
	chartData: { data: unknown; description: string };
	chartType: Key;
	setChartType: Dispatch<SetStateAction<Key>>;
	yAxis: Key;
	setYAxis: Dispatch<SetStateAction<Key>>;
	xAxis: Key;
	setXAxis: Dispatch<SetStateAction<Key>>;
	series: Key;
	setSeries: Dispatch<SetStateAction<Key>>;
	legendProps: LegendProps;
	setLegendProps: Dispatch<SetStateAction<LegendProps>>;
	includeLegend: boolean;
	setIncludeLegend: Dispatch<SetStateAction<boolean>>;
	xAxisProps: AxisProps;
	setXAxisProps: Dispatch<SetStateAction<AxisProps>>;
	yAxisProps: AxisProps;
	setYAxisProps: Dispatch<SetStateAction<AxisProps>>;
	includeXAxis: boolean;
	setIncludeXAxis: Dispatch<SetStateAction<boolean>>;
	includeYAxis: boolean;
	setIncludeYAxis: Dispatch<SetStateAction<boolean>>;
	chartProps: SupportedChartProps;
}

export const MappingsTab: FC<MappingsTabProps> = ({
	chartData,
	chartProps,
	chartType,
	setChartType,
	yAxis,
	setYAxis,
	xAxis,
	setXAxis,
	series,
	setSeries,
	legendProps,
	setLegendProps,
	includeLegend,
	setIncludeLegend,
	xAxisProps,
	setXAxisProps,
	yAxisProps,
	setYAxisProps,
	includeXAxis,
	setIncludeXAxis,
	includeYAxis,
	setIncludeYAxis,
}) => {
	const chartTypeOptions = [
		{ id: 'bar', name: 'Bar' },
		{ id: 'line', name: 'Line' },
	];

	const getOptionsFromData = () => {
		if (!chartData) {
			return [];
		}
		const { data } = chartData;
		return Object.keys(data[0]).map((key) => ({ id: key, name: key }));
	};

	let axisOptions = getOptionsFromData();

	useEffect(() => {
		axisOptions = getOptionsFromData();
	}, [chartData]);

	return (
		<Flex gap="size-150" wrap height={'100%'} direction="row">
			<div>
				<Flex direction="column" width={250} gap="size-150">
					<Picker
						isRequired
						label="Chart type"
						items={chartTypeOptions}
						selectedKey={chartType}
						onSelectionChange={(key: Key) => setChartType(key)}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
					<Picker
						isRequired
						label="Y axis (the vertical one)"
						items={axisOptions}
						selectedKey={yAxis}
						onSelectionChange={(key: Key) => setYAxis(key)}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
					<Text>{'This will work best with a metric (numerical data)'}</Text>
					<Picker
						isRequired
						label="X axis (the horizontal one)"
						items={axisOptions}
						selectedKey={xAxis}
						onSelectionChange={(key: Key) => setXAxis(key)}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
					<Text>{'This will work best with temporal data (dates or timestamps)'}</Text>
					<Divider size="M" />
					<Picker
						label="Series (color)"
						items={axisOptions}
						selectedKey={series}
						onSelectionChange={(key: Key) => setSeries(key)}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
					<Text>
						{
							"This is only required for line charts with multiple lines and will determine what each represents. It will work best if it's a dimension (string)"
						}
					</Text>
					<Divider size="M" />
					<Text>{'xAxis'}</Text>
					<Checkbox isSelected={includeXAxis} onChange={() => setIncludeXAxis(!includeXAxis)}>
						Include xAxis
					</Checkbox>
					{includeXAxis && (
						<Picker
							label="Position"
							items={[
								{ id: 'top', name: 'Top' },
								{ id: 'bottom', name: 'Bottom' },
							]}
							selectedKey={xAxisProps.position}
							onSelectionChange={(key: Key) =>
								setXAxisProps({ ...xAxisProps, position: key as Position })
							}
						>
							{(item) => <Item>{item.name}</Item>}
						</Picker>
					)}
					<Divider size="M" />
					<Text>{'yAxis'}</Text>
					<Checkbox isSelected={includeYAxis} onChange={() => setIncludeYAxis(!includeYAxis)}>
						Include yAxis
					</Checkbox>
					<TextField
						label="title"
						value={yAxisProps.title}
						onChange={(input) => setYAxisProps({ ...yAxisProps, title: input })}
					/>
					<Picker
						label="Position"
						items={[
							{ id: 'left', name: 'Left' },
							{ id: 'right', name: 'Right' },
						]}
						selectedKey={yAxisProps.position}
						onSelectionChange={(key: Key) => setYAxisProps({ ...yAxisProps, position: key as Position })}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
					<Divider size="M" />
					<Text>{'Legend'}</Text>
					<Checkbox isSelected={includeLegend} onChange={() => setIncludeLegend(!includeLegend)}>
						Include legend
					</Checkbox>
					<Picker
						label="Position"
						items={[
							{ id: 'top', name: 'Top' },
							{ id: 'bottom', name: 'Bottom' },
							{ id: 'left', name: 'Left' },
							{ id: 'right', name: 'Right' },
						]}
						selectedKey={legendProps.position}
						onSelectionChange={(key: Key) => setLegendProps({ ...legendProps, position: key as Position })}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
				</Flex>
			</div>
			<Divider size="M" orientation="vertical" />

			<Flex flexGrow={2}>
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
			</Flex>
		</Flex>
	);
};
