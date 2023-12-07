import React, { useEffect, useRef } from "react";

import { Bar, Chart, Line } from "@adobe/react-spectrum-charts";

export const buildChart = (
  chartType,
  data,
  xAxis,
  yAxis,
  series,
  setChartRef?
) => {
  switch (chartType) {
    case "bar":
      return buildBarChart(data, xAxis, yAxis, series, setChartRef);
    case "line":
      return buildLineChart(data, xAxis, yAxis, series, setChartRef);
    default:
      return null;
  }
};

const buildBarChart = (data, xAxis, yAxis, series, setChartRef?) => {
  const chartRef = useRef();

  useEffect(() => {
    setChartRef?.(chartRef);
  }, [chartRef]);

  return (
    <Chart data={data} width={900} height={600} ref={chartRef}>
      <Bar dimension={yAxis} metric={xAxis} color={series} />
    </Chart>
  );
};
const buildLineChart = (data, xAxis, yAxis, series, setChartRef?) => {
  const chartRef = useRef();

  useEffect(() => {
    setChartRef?.(chartRef);
  }, [chartRef]);

  return (
    <Chart data={data} width={900} height={600} ref={chartRef}>
      <Line
        dimension={xAxis}
        metric={yAxis}
        color={series}
        scaleType="time"
        name="line0"
      />
    </Chart>
  );
};
