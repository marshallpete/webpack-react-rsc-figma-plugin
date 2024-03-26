import { Flex, Item, Picker, Radio, RadioGroup, Text } from '@adobe/react-spectrum';
import React, { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppDataState, setDataSample, setDataType } from '../../store/slices/appSlice';
import { DataType, SampleDataId } from '../../types';
import { setData } from '../../store/slices/chartSlice';
import sampleData from '../../../sampleData';
import GraphArea from '@spectrum-icons/workflow/GraphArea';
import GraphBarVertical from '@spectrum-icons/workflow/GraphBarVertical';
import GraphTrend from '@spectrum-icons/workflow/GraphTrend';
import GraphScatter from '@spectrum-icons/workflow/GraphScatter';
import GraphBarVerticalStacked from '@spectrum-icons/workflow/GraphBarVerticalStacked';
import GraphAreaStacked from '@spectrum-icons/workflow/GraphAreaStacked';

type ChartType = 'area' | 'bar' | 'line' | 'scatter' | 'stackedArea' | 'stackedBar';

export const DataSideBar: FC = () => {
	const { type, sample } = useSelector(selectAppDataState);
	const dispatch = useDispatch();

	const sampleItems: { id: SampleDataId; label: string; idealChartType: ChartType }[] = [
		{
			label: 'Browser Usage Data',
			id: 'browserUsageData',
			idealChartType: 'bar',
		},
		{
			label: 'Food Sales Data by Region and Category',
			id: 'foodSalesDataByRegionAndCategory',
			idealChartType: 'stackedBar',
		},
		{
			label: 'Mario Kart Character Data',
			id: 'marioKartCharacterData',
			idealChartType: 'scatter',
		},
		{
			label: 'Operating System Market Share',
			id: 'osMarketShareTrendedData',
			idealChartType: 'line',
		},
	];

	const onSetDataSample = (value: SampleDataId) => {
		dispatch(setDataSample(value));
		dispatch(setData(sampleData[value]));
	};

	return (
		<Flex direction="column" gap="size-100">
			<RadioGroup
				aria-label="Data type"
				value={type}
				onChange={(value: DataType) => dispatch(setDataType(value))}
			>
				<Radio value="sample">Sample data</Radio>
				<Radio value="custom">Custom data</Radio>
			</RadioGroup>
			{type === 'sample' && (
				<Picker
					label="Sample data"
					items={sampleItems}
					selectedKey={sample}
					onSelectionChange={onSetDataSample}
					width="100%"
				>
					{(item) => (
						<Item>
							{chartTypeIcons[item.idealChartType]}
							<Text>{item.label}</Text>
						</Item>
					)}
				</Picker>
			)}
		</Flex>
	);
};

const chartTypeIcons: Record<ChartType, ReactElement> = {
	area: <GraphArea />,
	bar: <GraphBarVertical />,
	line: <GraphTrend />,
	scatter: <GraphScatter />,
	stackedArea: <GraphAreaStacked />,
	stackedBar: <GraphBarVerticalStacked />,
};
