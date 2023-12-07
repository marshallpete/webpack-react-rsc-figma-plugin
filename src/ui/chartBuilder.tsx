import * as React from "react";

import { Bar, Chart } from "@adobe/react-spectrum-charts";

export const buildChart = (chartType, data, xAxis, yAxis, series) => {
  switch (chartType) {
    case "bar":
      return buildBarChart(data, xAxis, yAxis, series);
    case "line":
      return buildLineChart(data, xAxis, yAxis, series);
    default:
      return null;
  }
};

const buildBarChart = (data, xAxis, yAxis, series) => {
  return (
    <Chart
      data={data}
      width={300}
      height={200}
    >
      <Bar dimension={yAxis} metric={xAxis} color={series}/>
    </Chart>
  );
};
const buildLineChart = (data, xAxis, yAxis, series) => {};