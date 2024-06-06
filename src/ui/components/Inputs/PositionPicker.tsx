import { Item, Picker } from '@adobe/react-spectrum';
import { Position } from '@adobe/react-spectrum-charts/';
import React, { FC } from 'react';

type PositionPickerProps = {
	defaultValue: Position;
	onChange: (value: Position) => void;
};

export const PositionPicker: FC<PositionPickerProps> = ({ defaultValue, onChange }) => {
	const options = [
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'left', label: 'Left' },
		{ id: 'top', label: 'Top' },
		{ id: 'right', label: 'Right' },
	];
	return (
		<Picker
			defaultSelectedKey={defaultValue}
			items={options}
			label="Position"
			width="100%"
			onSelectionChange={onChange}
		>
			{({ label }) => <Item>{label}</Item>}
		</Picker>
	);
};
