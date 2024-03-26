import {
	ActionButton,
	Flex,
	Heading,
	NumberField,
	Switch,
	TextField,
	Tooltip,
	TooltipTrigger,
	Well,
} from '@adobe/react-spectrum';
import { LabelAlign } from '@adobe/react-spectrum-charts/';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAxis } from '../../hooks/useAxis';
import {
	deleteAxis,
	setAxisBaseline,
	setAxisBaselineOffset,
	setAxisGrid,
	setAxisHideDefaultLabels,
	setAxisLabelAlign,
	setAxisLabelFontWeight,
	setAxisLabelOrientation,
	setAxisTickMinStep,
	setAxisTicks,
	setAxisTitle,
	setAxisTruncateLabels,
} from '../../store/slices/chartSlice';
import { AlignPicker } from '../Inputs/AlignPicker';
import { PositionPicker } from '../Inputs/PositionPicker';
import { SectionDivider } from '../SectionDivider';
import Delete from '@spectrum-icons/workflow/Delete';
import { FontWeightPicker } from '../Inputs/FontWeightPicker';
import { FontWeight } from 'vega';
import { LabelFromatPicker } from '../Inputs/LabelFormatPicker';
import { AdvancedSettings } from '../AdvancedSettings';
import { NumberFormat } from '../Inputs/NumberFormat';
import { GranularityPicker } from './GranularityPicker';
import { OrientationInput } from '../Inputs/Orientation';
import { AxisRange } from './AxisRange';

interface AxisBuilderProps {
	id: string;
}

export const AxisBuilder: FC<AxisBuilderProps> = ({ id }) => {
	const dispatch = useDispatch();
	const {
		baseline,
		baselineOffset,
		grid,
		hideDefaultLabels,
		labelAlign,
		labelFontWeight,
		labelFormat,
		labelOrientation,
		position,
		ticks,
		tickMinStep,
		title,
		truncateLabels,
	} = useAxis(id);

	return (
		<Well>
			<Flex direction="column" gap="size-100">
				<Flex direction="row" justifyContent="space-between">
					<Heading marginY={0} level={4}>{`${
						position.charAt(0).toUpperCase() + position.slice(1)
					} Axis`}</Heading>
					<TooltipTrigger>
						<ActionButton isQuiet onPress={() => dispatch(deleteAxis(id))}>
							<Delete />
						</ActionButton>
						<Tooltip>Delete axis</Tooltip>
					</TooltipTrigger>
				</Flex>
				<PositionPicker id={id} />
				<TextField
					width="100%"
					defaultValue={title}
					label="Title"
					onChange={(title) => dispatch(setAxisTitle({ id, title: title || undefined }))}
				/>
				<Flex direction="row" gap="size-100">
					<Switch
						defaultSelected={baseline}
						onChange={(baseline) => dispatch(setAxisBaseline({ id, baseline }))}
					>
						Baseline
					</Switch>
					<Switch defaultSelected={grid} onChange={(value) => dispatch(setAxisGrid({ id, grid: value }))}>
						Grid
					</Switch>
					<Switch defaultSelected={ticks} onChange={(value) => dispatch(setAxisTicks({ id, ticks: value }))}>
						Ticks
					</Switch>
				</Flex>
				<LabelFromatPicker id={id} />
				{labelFormat === 'time' && <GranularityPicker id={id} />}
				{labelFormat === 'linear' && <NumberFormat id={id} />}
				<AdvancedSettings>
					<AxisRange id={id} />
					{baseline && (
						<NumberField
							defaultValue={baselineOffset ?? 0}
							hideStepper
							label="Baseline offset"
							onChange={(value) => dispatch(setAxisBaselineOffset({ id, baselineOffset: value }))}
							width="100%"
						/>
					)}
					<NumberField
						defaultValue={tickMinStep}
						hideStepper
						label="Minimum tick step"
						minValue={0}
						onChange={(value) => dispatch(setAxisTickMinStep({ id, tickMinStep: value }))}
						width="100%"
					/>
					<SectionDivider label="Axis labels" />
					<Flex direction="row" gap="size-100">
						<Switch
							defaultSelected={hideDefaultLabels}
							onChange={(value) => dispatch(setAxisHideDefaultLabels({ id, hideDefaultLabels: value }))}
						>
							Hide labels
						</Switch>
						<Switch
							defaultSelected={truncateLabels}
							onChange={(value) => dispatch(setAxisTruncateLabels({ id, truncateLabels: value }))}
						>
							Truncate labels
						</Switch>
					</Flex>
					<AlignPicker
						defaultValue="center"
						inputValue={labelAlign}
						label="Alignment"
						onInputChange={(labelAlign: LabelAlign) => dispatch(setAxisLabelAlign({ id, labelAlign }))}
					/>
					<FontWeightPicker
						defaultValue="normal"
						inputValue={typeof labelFontWeight === 'string' ? labelFontWeight : 'normal'}
						label="Font weight"
						onInputChange={(labelFontWeight) =>
							dispatch(setAxisLabelFontWeight({ id, labelFontWeight: labelFontWeight as FontWeight }))
						}
					/>
					<OrientationInput
						defaultValue="horizontal"
						inputValue={labelOrientation}
						label="Orientation"
						onInputChange={(value) => dispatch(setAxisLabelOrientation({ id, labelOrientation: value }))}
					/>
				</AdvancedSettings>
			</Flex>
		</Well>
	);
};
