import { Position } from '@adobe/react-spectrum-charts/';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLegend } from '../../hooks/useLegend';
import { setLegendPosition } from '../../store/slices/chartSlice';
import { PositionPicker } from '../Inputs/PositionPicker';

type LegendPositionPickerProps = {
	id: string;
};

export const LegendPositionPicker: FC<LegendPositionPickerProps> = ({ id }) => {
	const { position } = useLegend(id);
	const dispatch = useDispatch();

	return (
		<PositionPicker
			defaultValue={position ?? 'bottom'}
			onChange={(position: Position) => dispatch(setLegendPosition({ id, position }))}
		/>
	);
};
