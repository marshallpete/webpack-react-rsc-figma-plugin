import { AxisProps } from '@adobe/react-spectrum-charts/';
import { useSelector } from 'react-redux';
import { selectAxes } from '../store/slices/chartSlice';

export const useAxis = (id: string): AxisProps => {
	const axes = useSelector(selectAxes);
	return axes.find((axis) => axis.id === id).props;
};
