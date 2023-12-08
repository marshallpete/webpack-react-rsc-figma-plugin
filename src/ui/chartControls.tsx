import React, { MutableRefObject } from "react";
import { useState, FC } from "react";
import {
  ActionButton,
  Flex,
  Tabs,
  TabList,
  Item,
  TabPanels,
  Key,
} from "@adobe/react-spectrum";
import { DataTab } from "./dataTab";
import { MappingsTab } from "./mappingsTab";
import BuildState from "./BuildState";
import { ChartProps } from "@adobe/react-spectrum-charts";
import { SupportedChartProps } from "./types";
import ChartProperties from "./ChartProperties";

export const ChartControls: FC = () => {
  // build state
  const [isBuilding, setIsBuilding] = useState(false);

  // Data tab state
  const [dataText, setDataText] = useState("");
  const [selectedDataMode, setSelectedDataMode] = useState("sample");
  const [chartData, setChartData] = useState<{
    data: unknown;
    description: string;
  }>({ data: [], description: "" });
  const [selectedSample, setSelectedSample] = useState<Key>("feature-usage");

  // Mappings tab state
  const [chartType, setChartType] = useState("bar");
  const [yAxis, setYAxis] = useState("");
  const [xAxis, setXAxis] = useState("");
  const [series, setSeries] = useState("");

  // Properties tab state
  const [chartProps, setChartProps] = useState<SupportedChartProps>({
    backgroundColor: "transparent",
    colors: "categorical16",
    colorScheme: "light",
    height: 600,
    padding: 0,
    width: 900,
  });

  return (
    <>
      {isBuilding && (
        <BuildState
          chartData={chartData}
          chartType={chartType}
          xAxis={xAxis}
          yAxis={yAxis}
          series={series}
        />
      )}
      {!isBuilding && (
        <Tabs aria-label="react spectrum charts plugin panel" height="100%">
          <Flex>
            <TabList flex="1 1 auto" minWidth="0px">
              <Item key="data">Data</Item>
              <Item key="mappings">Mappings</Item>
              <Item key="properties">Properties</Item>
            </TabList>
            <div
              style={{
                display: "flex",
                flex: "0 0 auto",
                borderBottom:
                  "var(--spectrum-alias-border-size-thick) solid var(--spectrum-global-color-gray-300)",
              }}
            >
              <ActionButton onPress={() => setIsBuilding(true)}>
                Build chart
              </ActionButton>
            </div>
          </Flex>
          <TabPanels>
            <Item key="data">
              <DataTab
                dataText={dataText}
                setDataText={setDataText}
                selectedDataMode={selectedDataMode}
                setSelectedDataMode={setSelectedDataMode}
                chartData={chartData}
                setChartData={setChartData}
                selectedSample={selectedSample}
                setSelectedSample={setSelectedSample}
              />
            </Item>
            <Item key="mappings">
              <MappingsTab
                chartData={chartData}
                chartType={chartType}
                setChartType={setChartType}
                yAxis={yAxis}
                setYAxis={setYAxis}
                xAxis={xAxis}
                setXAxis={setXAxis}
                series={series}
                setSeries={setSeries}
              ></MappingsTab>
            </Item>
            <Item key="properties">
              <ChartProperties
                chartProps={chartProps}
                setChartProps={setChartProps}
              />
            </Item>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};
