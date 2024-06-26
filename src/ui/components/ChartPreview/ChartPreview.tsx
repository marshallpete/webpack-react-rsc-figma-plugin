import React from 'react';
import { useSelector } from 'react-redux';
import { ChartState, selectChartState } from '../../store/slices/chartSlice';
import {
	Area,
	AreaProps,
	Axis,
	Bar,
	BarProps,
	Chart,
	Legend,
	Line,
	LineProps,
	Scatter,
	ScatterProps,
} from '@adobe/react-spectrum-charts';
import { useProvider } from '@adobe/react-spectrum';

export const ChartPreview = () => {
	const chartState = useSelector(selectChartState);
	const { colorScheme } = useProvider();

	const children = buildChartChildren(chartState);
	return (
		<Chart data={chartState.data} width="auto" height="95%" colorScheme={colorScheme}>
			{children}
		</Chart>
	);
};

const buildChartChildren = (chartState: ChartState) => {
	const mark = buildMark(chartState.mark);
	const axes = buildAxes(chartState.axes);
	const legends = buildLegends(chartState.legends);
	return [mark, ...axes, ...legends];
};

const buildMark = ({ type, props }: ChartState['mark']) => {
	switch (type) {
		case 'area':
			return <Area {...(props as AreaProps)} />;
		case 'line':
			return <Line {...(props as LineProps)} />;
		case 'scatter':
			return <Scatter {...(props as ScatterProps)} />;
		case 'bar':
		default:
			return <Bar {...(props as BarProps)} />;
	}
};

const buildAxes = (axes: ChartState['axes']) => {
	return axes.map((axis) => <Axis key={axis.id} {...axis.props} />);
};

const buildLegends = (legends: ChartState['legends']) => {
	return legends.map((legend) => <Legend key={legend.id} {...legend.props} />);
};
