import * as React from "react";
import { useState, FC } from "react";
import { Tabs, TabList, Item, TabPanels, Key } from "@adobe/react-spectrum";
import { DataTab } from "./dataTab";
import { MappingsTab } from "./mappingsTab";

export const ChartControls: FC = () => {
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

  return (
    <Tabs aria-label="react spectrum charts plugin panel" height="100%">
      <TabList>
        <Item key="data">Data</Item>
        <Item key="mappings">Mappings</Item>
        <Item key="properties">Properties</Item>
      </TabList>
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
        <Item key="properties">Alea jacta est.</Item>
      </TabPanels>
    </Tabs>
  );
};
