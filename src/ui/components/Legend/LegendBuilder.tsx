import React from 'react';
import { useDispatch } from 'react-redux';
import { useLegend } from '../../hooks/useLegend';
import {
	ActionButton,
	Flex,
	Heading,
	Switch,
	Text,
	TextField,
	Tooltip,
	TooltipTrigger,
	Well,
} from '@adobe/react-spectrum';
import { deleteLegend, setLegendHighlight, setLegendIsToggleable, setLegendTitle } from '../../store/slices/chartSlice';
import Delete from '@spectrum-icons/workflow/Delete';
import { PositionPicker } from '../Inputs/PositionPicker';

type LegendBuilderProps = { id: string };

export const LegendBuilder = ({ id }: LegendBuilderProps) => {
	const dispatch = useDispatch();
	const { highlight, isToggleable, position, title } = useLegend(id);
	return (
		<Well>
			<Flex direction="column" gap="size-100">
				<Flex direction="row" justifyContent="space-between">
					<Heading marginY={0} level={4}>{`${
						position.charAt(0).toUpperCase() + position.slice(1)
					} Legend`}</Heading>
					<TooltipTrigger>
						<ActionButton isQuiet onPress={() => dispatch(deleteLegend(id))}>
							<Delete />
						</ActionButton>
						<Tooltip>Delete legend</Tooltip>
					</TooltipTrigger>
				</Flex>
				<PositionPicker type="legend" position={position} id={id} />
				<TextField
					width="100%"
					defaultValue={title}
					label="Title"
					onChange={(title) => dispatch(setLegendTitle({ id, title: title || undefined }))}
				/>
				<Switch
					defaultSelected={highlight}
					onChange={(value) => dispatch(setLegendHighlight({ id, highlight: value }))}
				>
					Highlight series
				</Switch>
				<Switch
					defaultSelected={isToggleable}
					onChange={(value) => dispatch(setLegendIsToggleable({ id, isToggleable: value }))}
				>
					Toggle hide/show from legend
				</Switch>
			</Flex>
		</Well>
	);
};
