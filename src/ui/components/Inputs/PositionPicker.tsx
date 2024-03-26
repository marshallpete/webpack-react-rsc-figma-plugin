import React, { FC } from 'react';
import { useAxis } from '../../hooks/useAxis';
import { Item, Picker } from '@adobe/react-spectrum';
import { useDispatch } from 'react-redux';
import { setAxisPosition } from '../../store/slices/chartSlice';
import { Position } from '@adobe/react-spectrum-charts/';

type AxisProps = {
	id: string;
};

export const PositionPicker: FC<AxisProps> = ({ id }) => {
	const axis = useAxis(id);
	const dispatch = useDispatch();

	const options = [
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'left', label: 'Left' },
		{ id: 'top', label: 'Top' },
		{ id: 'right', label: 'Right' },
	];
	return (
		<Picker
			defaultSelectedKey={axis.position}
			items={options}
			label="Position"
			width="100%"
			onSelectionChange={(position: Position) => dispatch(setAxisPosition({ id, position }))}
		>
			{({ label }) => <Item>{label}</Item>}
		</Picker>
	);
};
