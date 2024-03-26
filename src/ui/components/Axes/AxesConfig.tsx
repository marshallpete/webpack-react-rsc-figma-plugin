import { ActionButton, Flex, Text } from '@adobe/react-spectrum';
import React, { FC } from 'react';
import { AxisBuilder } from './AxisBuilder';
import Add from '@spectrum-icons/workflow/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addAxis, selectAxes } from '../../store/slices/chartSlice';
import { v4 as uuid } from 'uuid';
import { Position } from '@adobe/react-spectrum-charts/';

export const AxesConfig: FC = () => {
	const dispatch = useDispatch();
	const axes = useSelector(selectAxes);
	const nextAxisPosition = useNextAxisPosition();

	return (
		<Flex direction="column" gap="size-100">
			{axes.map((axis) => (
				<AxisBuilder key={axis.id} id={axis.id} />
			))}
			<ActionButton
				onPress={() => dispatch(addAxis({ id: uuid(), props: { position: nextAxisPosition } }))}
				width="100%"
			>
				<Add /> Add axis
			</ActionButton>
		</Flex>
	);
};

const useNextAxisPosition = (): Position => {
	const axes = useSelector(selectAxes);
	const existingAxesPositions = axes.map((axis) => axis.props.position);
	const positionPriority: Position[] = ['bottom', 'left', 'top', 'right'];
	for (const position of positionPriority) {
		if (!existingAxesPositions.includes(position)) {
			return position;
		}
	}
	return 'bottom';
};
