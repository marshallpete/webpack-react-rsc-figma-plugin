import { ActionButton, Flex } from '@adobe/react-spectrum';
import { Position } from '@adobe/react-spectrum-charts/';
import Add from '@spectrum-icons/workflow/Add';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLegend, selectAxes, selectLegends } from '../../store/slices/chartSlice';
import { LegendBuilder } from './LegendBuilder';

export const LegendConfig: FC = () => {
	const dispatch = useDispatch();
	const legends = useSelector(selectLegends);

	return (
		<Flex direction="column" gap="size-100">
			{legends.map((axis) => (
				<LegendBuilder key={axis.id} id={axis.id} />
			))}
			<ActionButton
				onPress={() => dispatch(addLegend({ id: uuid(), props: { position: 'bottom' } }))}
				width="100%"
			>
				<Add /> Add legend
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
