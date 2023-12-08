import React, { FC, MutableRefObject, useEffect, useState } from "react";
import { buildChart } from "./chartBuilder";
import { Flex, ProgressCircle, Text } from "@adobe/react-spectrum";

interface BuildStateProps {
  chartType: string;
  chartData: { data: unknown; description: string };
  xAxis: string;
  yAxis: string;
  series: string;
  includeLegend: boolean;
  legendProps: any;
  includeXAxis: boolean;
  xAxisProps: any;
  includeYAxis: boolean;
  yAxisProps: any;
}

const BuildState: FC<BuildStateProps> = ({
  chartData,
  chartType,
  xAxis,
  yAxis,
  series,
  includeLegend,
  legendProps,
  includeXAxis,
  xAxisProps,
  includeYAxis,
  yAxisProps,
}) => {
  const [chartRef, setChartRef] = useState<MutableRefObject<any> | null>();

  useEffect(() => {
    console.log("chartRef", chartRef);
    if (chartRef?.current) {
      console.log("chartRef.current", chartRef.current);
      chartRef.current
        .getSvg()
        .then((svg) =>
          parent.postMessage(
            { pluginMessage: { type: "insert-chart", svg } },
            "*"
          )
        );
    }
  }, [chartRef]);
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 64px)"
    >
      <Flex direction="column" gap="size-150" alignItems="center">
        <ProgressCircle size="L" aria-label="Building chart" isIndeterminate />
        <Text>Building chart...</Text>
      </Flex>
      <div style={{ display: "none" }}>
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
          setChartRef
        )}
      </div>
    </Flex>
  );
};

export default BuildState;
