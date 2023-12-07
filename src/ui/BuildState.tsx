import React, { FC, MutableRefObject, useEffect, useState } from "react";
import { buildChart } from "./chartBuilder";
import { Flex, ProgressCircle, Text } from "@adobe/react-spectrum";

interface BuildStateProps {
  chartType: string;
  chartData: { data: unknown; description: string };
  xAxis: string;
  yAxis: string;
  series: string;
}

const BuildState: FC<BuildStateProps> = ({
  chartData,
  chartType,
  xAxis,
  yAxis,
  series,
}) => {
  const [chartRef, setChartRef] = useState<MutableRefObject<any> | null>();

  useEffect(() => {
    if (chartRef?.current) {
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
          setChartRef
        )}
      </div>
    </Flex>
  );
};

export default BuildState;
