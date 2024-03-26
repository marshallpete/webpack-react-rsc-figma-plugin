export type AppView = 'data' | 'chart' | 'axes' | 'legend' | 'properties' | 'size';

export type DataType = 'sample' | 'custom';

export type SampleDataId =
	| 'browserUsageData'
	| 'foodSalesDataByRegionAndCategory'
	| 'marioKartCharacterData'
	| 'osMarketShareTrendedData';

export type ChartType = 'area' | 'bar' | 'line' | 'scatter';

export type InputType =
	| 'cssValue'
	| 'd3FormatString'
	| 'dashArray'
	| 'key'
	| 'lineTypePicker'
	| 'lineWidthNumber'
	| 'lineWidthPicker'
	| 'numberFormatPicker'
	| 'opacityNumber'
	| 'spectrumValue';

export type AxisType = 'x' | 'y';
