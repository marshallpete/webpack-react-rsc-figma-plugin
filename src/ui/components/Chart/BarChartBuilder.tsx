import { ActionButton, Divider, Flex, Heading, Text, View, Well } from '@adobe/react-spectrum';
import { BarProps } from '@adobe/react-spectrum-charts';
import React, { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkProps, setMarkBarOrientation } from '../../store/slices/chartSlice';
import { BarType } from '../Inputs/BarType';
import { Color } from '../Inputs/Color';
import { Dimension } from '../Inputs/Dimension';
import { LineTypeInput } from '../Inputs/LineTypeInput';
import { LineWidthInput } from '../Inputs/LineWidthInput';
import { Metric } from '../Inputs/Metric';
import { Opacity } from '../Inputs/Opacity';
import { OrientationInput } from '../Inputs/Orientation';
import { SectionDivider } from '../SectionDivider';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import Button from '@spectrum-icons/workflow/Button';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import { AdvancedSettings } from '../AdvancedSettings';

export const BarChartBuilder: FC = () => {
	const props = useSelector(selectMarkProps) as BarProps;
	const dispatch = useDispatch();

	return (
		<Flex direction={'column'} gap="size-100">
			<BarType />
			<OrientationInput
				defaultValue="vertical"
				inputValue={props.orientation}
				label="Bar orientation"
				onInputChange={(value: BarProps['orientation']) => dispatch(setMarkBarOrientation(value))}
			/>
			<Dimension />
			<Metric />
			<Color />
			<AdvancedSettings>
				<SectionDivider label="Fill Style" />
				<Opacity />
				<SectionDivider label="Border Style" />
				<LineWidthInput />
				<LineTypeInput />
			</AdvancedSettings>
		</Flex>
	);
};
