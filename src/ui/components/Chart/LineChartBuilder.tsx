import { Flex } from '@adobe/react-spectrum';
import { LineProps } from '@adobe/react-spectrum-charts/*';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkLineScaleType } from '../../store/slices/chartSlice';
import { Color } from '../Inputs/Color';
import { Dimension } from '../Inputs/Dimension';
import { DimensionScaleType } from '../Inputs/DimensionScaleType';
import { LineTypeInput } from '../Inputs/LineTypeInput';
import { Metric } from '../Inputs/Metric';
import { Opacity } from '../Inputs/Opacity';
import { SectionDivider } from '../SectionDivider';
import { useDataKeys } from '../../hooks/useDataKeys';

export const LineChartBuilder: FC = () => {
	const { scaleType, dimension } = useSelector(selectMarkProps) as LineProps;
	const dispatch = useDispatch();
	const dataKeys = useDataKeys();

	useEffect(() => {
		if (!dimension) return;
		const dimensionDataType = dataKeys.find(({ key }) => key === dimension)?.dataType;
		if (dimensionDataType === 'datetime') {
			dispatch(setMarkLineScaleType('time'));
		}
		if (dimensionDataType === 'number') {
			dispatch(setMarkLineScaleType('linear'));
		}
		if (dimensionDataType === 'string') {
			dispatch(setMarkLineScaleType('point'));
		}
	}, [dimension]);

	return (
		<Flex direction={'column'} gap="size-100">
			<Dimension />
			<DimensionScaleType
				defaultValue="time"
				inputValue={scaleType}
				onInputChange={(value) => dispatch(setMarkLineScaleType(value))}
			/>
			<Metric />
			<SectionDivider label="Line Style" />
			<Color />
			<LineTypeInput />
			<Opacity />
		</Flex>
	);
};
