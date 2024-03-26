import React, { useEffect, useRef } from 'react';

import { Axis, Bar, Chart, Legend, Line } from '@adobe/react-spectrum-charts';

export const buildChart = (
	chartType,
	data,
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
	isPreview,
	setChartRef?
) => {
	const chartPropsCopy = { ...chartProps };
	if (isPreview) {
		chartPropsCopy.width = 800;
		chartPropsCopy.height = 600;
	}

	switch (chartType) {
		case 'bar':
			return buildBarChart(
				data,
				xAxis,
				yAxis,
				series,
				includeLegend,
				legendProps,
				includeXAxis,
				xAxisProps,
				includeYAxis,
				yAxisProps,
				chartPropsCopy,
				setChartRef
			);
		case 'line':
			return buildLineChart(
				data,
				xAxis,
				yAxis,
				series,
				includeLegend,
				legendProps,
				includeXAxis,
				xAxisProps,
				includeYAxis,
				yAxisProps,
				chartPropsCopy,
				setChartRef
			);
		default:
			return null;
	}
};

const buildBarChart = (
	data,
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
	setChartRef?
) => {
	const chartRef = useRef();

	useEffect(() => {
		setChartRef?.(chartRef);
	}, [chartRef]);

	const { position: legendPosition } = legendProps;
	const { position: xAxisPosition, title: xAxisTitle } = xAxisProps;
	const { position: yAxisPosition, title: yAxisTitle } = yAxisProps;
	return (
		<Chart {...chartProps} data={data} ref={chartRef}>
			{includeXAxis && <Axis position={xAxisPosition} title={xAxisTitle} />}
			{includeYAxis && <Axis position={yAxisPosition} title={yAxisTitle} />}
			<Bar dimension={yAxis} metric={xAxis} color={series} />
			{includeLegend && <Legend position={legendPosition} />}
		</Chart>
	);
};
const buildLineChart = (
	data,
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
	setChartRef?
) => {
	const chartRef = useRef();

	useEffect(() => {
		setChartRef?.(chartRef);
	}, [chartRef]);

	const { position: legendPosition } = legendProps;
	const { position: xAxisPosition, title: xAxisTitle, labelFormat: xAxisLabelFormat } = xAxisProps;
	const { position: yAxisPosition, title: yAxisTitle, labelFormat: yAxisLabelFormat } = yAxisProps;
	return (
		<Chart {...chartProps} data={data} width={600} height={400} ref={chartRef}>
			{includeXAxis && <Axis position={xAxisPosition} title={xAxisTitle} labelFormat={xAxisLabelFormat} />}
			{includeYAxis && <Axis position={yAxisPosition} title={yAxisTitle} labelFormat={yAxisLabelFormat} />}
			<Line dimension={xAxis} metric={yAxis} color={series} scaleType="time" name="line0" />
			{includeLegend && <Legend position={legendPosition} />}
		</Chart>
	);
};
