import React, { useEffect, useRef } from "react";

import { Axis, Bar, Chart, Legend, Line } from "@adobe/react-spectrum-charts";

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
  setChartRef?
) => {
  switch (chartType) {
    case "bar":
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
        setChartRef
      );
    case "line":
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
    <Chart data={data} width={600} height={400} ref={chartRef}>
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
  setChartRef?
) => {
  const chartRef = useRef();

  useEffect(() => {
    setChartRef?.(chartRef);
  }, [chartRef]);

  const { position } = legendProps;
  const { position: xAxisPosition, title: xAxisTitle } = xAxisProps;
  const { position: yAxisPosition, title: yAxisTitle } = yAxisProps;
  return (
    <Chart data={data} width={600} height={400} ref={chartRef}>
      {includeXAxis && <Axis position={xAxisPosition} title={xAxisTitle} />}
      {includeYAxis && <Axis position={yAxisPosition} title={yAxisTitle} />}
      <Line
        dimension={xAxis}
        metric={yAxis}
        color={series}
        scaleType="time"
        name="line0"
      />
      {includeLegend && <Legend position={position} />}
    </Chart>
  );
};
