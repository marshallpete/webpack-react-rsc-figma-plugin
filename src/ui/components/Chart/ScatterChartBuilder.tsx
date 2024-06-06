import { Flex } from '@adobe/react-spectrum';
import { LineProps, ScatterProps } from '@adobe/react-spectrum-charts/*';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkLineScaleType, setMarkScatterDimensionScaleType } from '../../store/slices/chartSlice';
import { Color } from '../Inputs/Color';
import { Dimension } from '../Inputs/Dimension';
import { DimensionScaleType } from '../Inputs/DimensionScaleType';
import { LineTypeInput } from '../Inputs/LineTypeInput';
import { Metric } from '../Inputs/Metric';
import { Opacity } from '../Inputs/Opacity';
import { SectionDivider } from '../SectionDivider';
import { useDataKeys } from '../../hooks/useDataKeys';
import { LineWidthInput } from '../Inputs/LineWidthInput';
import { AdvancedSettings } from '../AdvancedSettings';

export const ScatterChartBuilder: FC = () => {
	const { dimensionScaleType, dimension } = useSelector(selectMarkProps) as ScatterProps;
	const dispatch = useDispatch();
	const dataKeys = useDataKeys();

	useEffect(() => {
		if (!dimension) return;
		const dimensionDataType = dataKeys.find(({ key }) => key === dimension)?.dataType;
		if (dimensionDataType === 'datetime') {
			dispatch(setMarkScatterDimensionScaleType('time'));
		}
		if (dimensionDataType === 'number') {
			dispatch(setMarkScatterDimensionScaleType('linear'));
		}
		if (dimensionDataType === 'string') {
			dispatch(setMarkScatterDimensionScaleType('point'));
		}
	}, [dimension]);

	return (
		<Flex direction={'column'} gap="size-100">
			<Dimension />
			<DimensionScaleType
				defaultValue="linear"
				inputValue={dimensionScaleType}
				onInputChange={(value) => dispatch(setMarkScatterDimensionScaleType(value))}
			/>
			<Metric />
			<Color />
			<AdvancedSettings>
				<SectionDivider label="Point Style" />
				<Opacity />
				<SectionDivider label="Border Style" />
				<LineWidthInput />
				<LineTypeInput />
			</AdvancedSettings>
		</Flex>
	);
};
