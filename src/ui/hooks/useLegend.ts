import { LegendProps } from '@adobe/react-spectrum-charts/';
import { useSelector } from 'react-redux';
import { selectLegends } from '../store/slices/chartSlice';

export const useLegend = (id: string): LegendProps => {
	const legends = useSelector(selectLegends);
	return legends.find((legend) => legend.id === id).props;
};
