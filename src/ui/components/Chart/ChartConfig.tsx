import { Flex } from '@adobe/react-spectrum';
import { AreaProps } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectMarkProps, selectMarkType } from '../../store/slices/chartSlice';
import { ChartTypePicker } from '../Inputs/ChartTypePicker';
import { Color } from '../Inputs/Color';
import { Dimension } from '../Inputs/Dimension';
import { Metric } from '../Inputs/Metric';
import { BarChartBuilder } from './BarChartBuilder';
import { AreaChartBuilder } from './AreaChartBuilder';
import { LineChartBuilder } from './LineChartBuilder';
import { ScatterChartBuilder } from './ScatterChartBuilder';

export const ChartConfig: FC = () => {
	const markType = useSelector(selectMarkType);
	return (
		<Flex direction={'column'} gap="size-100">
			<ChartTypePicker />
			{markType === 'area' && <AreaChartBuilder />}
			{markType === 'bar' && <BarChartBuilder />}
			{markType === 'line' && <LineChartBuilder />}
			{markType === 'scatter' && <ScatterChartBuilder />}
		</Flex>
	);
};
