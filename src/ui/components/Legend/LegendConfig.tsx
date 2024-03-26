import { ActionButton, Flex } from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLegend, selectLegends } from '../../store/slices/chartSlice';

export const LegendConfig: FC = () => {
	const legends = useSelector(selectLegends);
	const dispatch = useDispatch();
	return (
		<Flex direction="column" gap="size-100">
			{legends.map((legend) => (
				<div key={legend.id}>legend builder</div>
			))}
			<ActionButton onPress={() => dispatch(addLegend({ id: uuid(), props: {} }))} width="100%">
				<Add /> Add legend
			</ActionButton>
		</Flex>
	);
};
