import React, { MutableRefObject, useEffect } from "react";
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
import { featureUsage, browserUsage, browserData } from "./sampleData";
import { AxisProps, LegendProps } from "@adobe/react-spectrum-charts";

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
  const [includeLegend, setIncludeLegend] = useState(false);
  const [legendProps, setLegendProps] = useState<LegendProps>({
    position: "bottom",
  });
  const [xAxisProps, setXAxisProps] = useState<AxisProps>({
    position: "bottom",
    title: xAxis,
  });
  const [yAxisProps, setYAxisProps] = useState<AxisProps>({ position: "left" });
  const [includeXAxis, setIncludeXAxis] = useState(false);
  const [includeYAxis, setIncludeYAxis] = useState(false);

  // Properties tab state

  useEffect(() => {
    setYAxis("");
    setXAxis("");
    setSeries("");
    setLegendProps({});
    setIncludeLegend(false);
  }, [chartData]);

  useEffect(() => {
    if (selectedDataMode === "sample") {
      switch (selectedSample) {
        case "feature-usage":
          setChartData(featureUsage);
          break;
        case "browser-usage":
          setChartData(browserUsage);
          break;
        case "browser-data":
          setChartData(browserData);
          break;
        default:
          setChartData({ data: [], description: "" });
      }
    } else {
      setChartData({
        data: [],
        description: "upload your own dataset as a csv file",
      });
    }
  }, [selectedDataMode, selectedSample]);

  useEffect(() => {
    if (!yAxisProps.title) setYAxisProps({ ...yAxisProps, title: yAxis });
  }, [yAxis]);

  useEffect(() => {
    if (!xAxisProps.title) setYAxisProps({ ...xAxisProps, title: xAxis });
  }, [xAxis]);

  return (
    <>
      {isBuilding && (
        <BuildState
          chartData={chartData}
          chartType={chartType}
          xAxis={xAxis}
          yAxis={yAxis}
          series={series}
          includeLegend={includeLegend}
          legendProps={legendProps}
          includeXAxis={includeXAxis}
          xAxisProps={xAxisProps}
          includeYAxis={includeYAxis}
          yAxisProps={yAxisProps}
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
                legendProps={legendProps}
                setLegendProps={setLegendProps}
                includeLegend={includeLegend}
                setIncludeLegend={setIncludeLegend}
                includeXAxis={includeXAxis}
                setIncludeXAxis={setIncludeXAxis}
                setIncludeYAxis={setIncludeYAxis}
                includeYAxis={includeYAxis}
                xAxisProps={xAxisProps}
                setXAxisProps={setXAxisProps}
                yAxisProps={yAxisProps}
                setYAxisProps={setYAxisProps}
              ></MappingsTab>
            </Item>
            <Item key="properties">Alea jacta est.</Item>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};
