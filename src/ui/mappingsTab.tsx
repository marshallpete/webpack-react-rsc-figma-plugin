import { Flex, Picker, Item, Key, Text, Divider } from "@adobe/react-spectrum";
import React, { MutableRefObject } from "react";
import { useEffect, Dispatch, SetStateAction, FC } from "react";

import { Bar, Chart } from "@adobe/react-spectrum-charts";
import { buildChart } from "./chartBuilder";

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
  setChartRef?: (chartRef: MutableRefObject<any>) => void;
}

export const MappingsTab: FC<MappingsTabProps> = ({
  chartData,
  chartType,
  setChartType,
  yAxis,
  setYAxis,
  xAxis,
  setXAxis,
  series,
  setSeries,
  setChartRef,
}) => {
  const chartTypeOptions = [
    { id: "bar", name: "Bar" },
    { id: "line", name: "Line" },
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
    <Flex gap="size-150" wrap height={"100%"} direction="row">
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
        <Text>{"This will work best with a metric (numerical data)"}</Text>
        <Picker
          isRequired
          label="X axis (the horizontal one)"
          items={axisOptions}
          selectedKey={xAxis}
          onSelectionChange={(key: Key) => setXAxis(key)}
        >
          {(item) => <Item>{item.name}</Item>}
        </Picker>
        <Text>
          {"This will work best with temporal data (dates or timestamps)"}
        </Text>

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
      </Flex>

      <Flex flexGrow={2}>
        {buildChart(chartType, chartData.data, xAxis, yAxis, series)}
      </Flex>
    </Flex>
  );
};
