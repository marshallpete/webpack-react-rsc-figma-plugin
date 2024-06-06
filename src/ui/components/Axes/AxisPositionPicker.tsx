import React, { FC } from 'react';
import { useAxis } from '../../hooks/useAxis';
import { Item, Picker } from '@adobe/react-spectrum';
import { useDispatch } from 'react-redux';
import { setAxisPosition } from '../../store/slices/chartSlice';
import { Position } from '@adobe/react-spectrum-charts/';
import { PositionPicker } from '../Inputs/PositionPicker';

type AxisPositionPickerProps = {
	id: string;
};

export const AxisPositionPicker: FC<AxisPositionPickerProps> = ({ id }) => {
	const { position } = useAxis(id);
	const dispatch = useDispatch();

	return (
		<PositionPicker
			defaultValue={position}
			onChange={(position: Position) => dispatch(setAxisPosition({ id, position }))}
		/>
	);
};
