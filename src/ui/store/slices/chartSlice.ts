import { AreaProps, AxisProps, BarProps, ChartProps, LineProps, ScatterProps } from '@adobe/react-spectrum-charts';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxisType, ChartType } from '../../types';

export interface ChartState extends ChartProps {
	mark: {
		type: ChartType;
		props: AreaProps | BarProps | LineProps | ScatterProps;
	};
	axes: { id: string; props: AxisProps }[];
}

const initialState: ChartState = {
	data: [],
	mark: { type: 'bar', props: {} },
	axes: [],
};

export const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		addAxis: (state, { payload }: PayloadAction<{ id: string; props: AxisProps }>) => {
			state.axes.push(payload);
		},
		deleteAxis: (state, { payload }: PayloadAction<string>) => {
			state.axes = state.axes.filter((axis) => axis.id !== payload);
		},
		setAxisBaseline: (state, { payload }: PayloadAction<{ id: string; baseline: AxisProps['baseline'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.baseline = payload.baseline;
		},
		setAxisBaselineOffset: (
			state,
			{ payload }: PayloadAction<{ id: string; baselineOffset: AxisProps['baselineOffset'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.baselineOffset = payload.baselineOffset;
		},
		setAxisGranularity: (
			state,
			{ payload }: PayloadAction<{ id: string; granularity: AxisProps['granularity'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.granularity = payload.granularity;
		},
		setAxisGrid: (state, { payload }: PayloadAction<{ id: string; grid: AxisProps['grid'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.grid = payload.grid;
		},
		setAxisHideDefaultLabels: (
			state,
			{ payload }: PayloadAction<{ id: string; hideDefaultLabels: AxisProps['hideDefaultLabels'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.hideDefaultLabels = payload.hideDefaultLabels;
		},
		setAxisLabelAlign: (state, { payload }: PayloadAction<{ id: string; labelAlign: AxisProps['labelAlign'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.labelAlign = payload.labelAlign;
		},
		setAxisLabelFontWeight: (
			state,
			{ payload }: PayloadAction<{ id: string; labelFontWeight: AxisProps['labelFontWeight'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.labelFontWeight = payload.labelFontWeight;
		},
		setAxisLabelFormat: (
			state,
			{ payload }: PayloadAction<{ id: string; labelFormat: AxisProps['labelFormat'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.labelFormat = payload.labelFormat;
		},
		setAxisLabelOrientation: (
			state,
			{ payload }: PayloadAction<{ id: string; labelOrientation: AxisProps['labelOrientation'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.labelOrientation = payload.labelOrientation;
		},
		setAxisNumberFormat: (
			state,
			{ payload }: PayloadAction<{ id: string; numberFormat: AxisProps['numberFormat'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.numberFormat = payload.numberFormat;
		},
		setAxisPosition: (state, { payload }: PayloadAction<{ id: string; position: AxisProps['position'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.position = payload.position;
		},
		setAxisRange: (state, { payload }: PayloadAction<{ id: string; range: AxisProps['range'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.range = payload.range;
		},
		setAxisTicks: (state, { payload }: PayloadAction<{ id: string; ticks: AxisProps['ticks'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.ticks = payload.ticks;
		},
		setAxisTitle: (state, { payload }: PayloadAction<{ id: string; title: AxisProps['title'] }>) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.title = payload.title;
		},
		setAxisTruncateLabels: (
			state,
			{ payload }: PayloadAction<{ id: string; truncateLabels: AxisProps['truncateLabels'] }>
		) => {
			const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
			state.axes[axisIndex].props.truncateLabels = payload.truncateLabels;
		},
		setData: (state, { payload }: PayloadAction<ChartState['data']>) => {
			state.data = payload;
		},
		setMarkType: (state, { payload }: PayloadAction<ChartState['mark']['type']>) => {
			state.mark.type = payload;
		},
		setMarkColor: (state, { payload }: PayloadAction<ChartState['mark']['props']['color']>) => {
			state.mark.props.color = payload;
		},
		setMarkDimension: (state, { payload }: PayloadAction<ChartState['mark']['props']['dimension']>) => {
			state.mark.props.dimension = payload;
		},
		setMarkMetric: (state, { payload }: PayloadAction<ChartState['mark']['props']['metric']>) => {
			state.mark.props.metric = payload;
		},
		setMarkOpacity: (state, { payload }: PayloadAction<ChartState['mark']['props']['opacity']>) => {
			state.mark.props.opacity = payload;
		},
		setMarkBarLineType: (state, { payload }: PayloadAction<BarProps['lineType']>) => {
			(state.mark.props as BarProps).lineType = payload;
		},
		setMarkBarLineWidth: (state, { payload }: PayloadAction<BarProps['lineWidth']>) => {
			(state.mark.props as BarProps).lineWidth = payload;
		},
		setMarkBarOrientation: (state, { payload }: PayloadAction<BarProps['orientation']>) => {
			(state.mark.props as BarProps).orientation = payload;
		},
		setMarkBarType: (state, { payload }: PayloadAction<BarProps['type']>) => {
			(state.mark.props as BarProps).type = payload;
		},
		setMarkLineScaleType: (state, { payload }: PayloadAction<LineProps['scaleType']>) => {
			(state.mark.props as LineProps).scaleType = payload;
		},
		setMarkScatterDimensionScaleType: (state, { payload }: PayloadAction<ScatterProps['dimensionScaleType']>) => {
			(state.mark.props as ScatterProps).dimensionScaleType = payload;
		},
	},
});

export const selectChartState = (state: RootState) => state.chart;
export const selectData = (state: RootState) => state.chart.data;
export const selectMarkType = (state: RootState) => state.chart.mark.type;
export const selectMarkProps = (state: RootState) => state.chart.mark.props;
export const selectAxes = (state: RootState) => state.chart.axes;

// Action creators are generated for each case reducer function
export const {
	addAxis,
	deleteAxis,
	setAxisBaseline,
	setAxisBaselineOffset,
	setAxisGranularity,
	setAxisGrid,
	setAxisHideDefaultLabels,
	setAxisLabelAlign,
	setAxisLabelFontWeight,
	setAxisLabelFormat,
	setAxisLabelOrientation,
	setAxisNumberFormat,
	setAxisPosition,
	setAxisRange,
	setAxisTicks,
	setAxisTitle,
	setAxisTruncateLabels,
	setData,
	setMarkBarLineType,
	setMarkBarLineWidth,
	setMarkBarOrientation,
	setMarkBarType,
	setMarkColor,
	setMarkDimension,
	setMarkLineScaleType,
	setMarkMetric,
	setMarkOpacity,
	setMarkScatterDimensionScaleType,
	setMarkType,
} = chartSlice.actions;

export default chartSlice.reducer;

// setAxisBaseline: (state, { payload }: PayloadAction<{ id: string; baseline: AxisProps['baseline'] }>) => {
// 	const axisIndex = state.axes.findIndex((axis) => axis.id === payload.id);
// 	state.axes[axisIndex].props.baseline = payload.baseline;
// },
