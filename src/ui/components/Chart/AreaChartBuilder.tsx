import { Flex } from '@adobe/react-spectrum';
import { AreaProps } from '@adobe/react-spectrum-charts';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectMarkProps } from '../../store/slices/chartSlice';
import { Color } from '../Inputs/Color';
import { Dimension } from '../Inputs/Dimension';
import { Metric } from '../Inputs/Metric';
import { SectionDivider } from '../SectionDivider';

export const AreaChartBuilder: FC = () => {
	const props = useSelector(selectMarkProps) as AreaProps;

	return (
		<Flex direction={'column'} gap="size-100">
			<Dimension />
			<Metric />
			<SectionDivider label="Style" />
			<Color />
		</Flex>
	);
};
