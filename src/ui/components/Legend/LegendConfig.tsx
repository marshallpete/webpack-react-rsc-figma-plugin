import { ActionButton, Flex } from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addLegend, selectLegends } from '../../store/slices/chartSlice';
import { LegendBuilder } from './LegendBuilder';

export const LegendConfig: FC = () => {
	const legends = useSelector(selectLegends);
	const dispatch = useDispatch();
	return (
		<Flex direction="column" gap="size-100">
			{legends.map(({ id }) => (
				<LegendBuilder id={id} key={id} />
			))}
			<ActionButton onPress={() => dispatch(addLegend({ id: uuid(), props: {} }))} width="100%">
				<Add /> Add legend
			</ActionButton>
		</Flex>
	);
};
