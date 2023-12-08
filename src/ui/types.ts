import { ChartProps } from '@adobe/react-spectrum-charts';

export type SupportedChartProps = Required<Pick<ChartProps, 'backgroundColor' | 'colors' | 'colorScheme'>> & {
	width: number;
	height: number;
	padding: number;
};
