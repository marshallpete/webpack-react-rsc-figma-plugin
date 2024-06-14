import React, { FC, useCallback } from 'react';
import { useAxis } from '../../hooks/useAxis';
import { Item, Picker } from '@adobe/react-spectrum';
import { useDispatch } from 'react-redux';
import { setAxisPosition, setLegendPosition } from '../../store/slices/chartSlice';
import { Position } from '@adobe/react-spectrum-charts/';

type PositionPickerProps = {
	id: string;
	position: Position;
	type: 'axis' | 'legend';
};

export const PositionPicker: FC<PositionPickerProps> = ({ id, position, type }) => {
	const dispatch = useDispatch();

	const options = [
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'left', label: 'Left' },
		{ id: 'top', label: 'Top' },
		{ id: 'right', label: 'Right' },
	];

	const onSelectionChange = useCallback((newPosition: Position) => {
		if (type === 'axis') {
			dispatch(setAxisPosition({ id, position: newPosition }));
		} else {
			dispatch(setLegendPosition({ id, position: newPosition }));
		}
	}, []);

	return (
		<Picker
			defaultSelectedKey={position}
			items={options}
			label="Position"
			width="100%"
			onSelectionChange={onSelectionChange}
		>
			{({ label }) => <Item>{label}</Item>}
		</Picker>
	);
};
