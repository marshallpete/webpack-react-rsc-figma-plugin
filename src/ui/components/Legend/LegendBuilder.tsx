import { ActionButton, Flex, Heading, Switch, TextField, Tooltip, TooltipTrigger, Well } from '@adobe/react-spectrum';
import Delete from '@spectrum-icons/workflow/Delete';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLegend, setLegendHighlight, setLegendIsToggleable, setLegendTitle } from '../../store/slices/chartSlice';
import { LegendPositionPicker } from './LegendPositionPicker';
import { useLegend } from '../../hooks/useLegend';
import { AdvancedSettings } from '../AdvancedSettings';
import { Color } from '../Inputs/Color';
import { LegendColor } from './LegendColor';
import { SectionDivider } from '../SectionDivider';

type LegendBuilderProps = {
	id: string;
};

export const LegendBuilder: FC<LegendBuilderProps> = ({ id }) => {
	const { highlight, isToggleable, title } = useLegend(id);
	const dispatch = useDispatch();
	return (
		<Well>
			<Flex direction="column" gap="size-100">
				<Flex direction="row" justifyContent="space-between">
					<Heading marginY={0} level={4}>{`Legend`}</Heading>
					<TooltipTrigger>
						<ActionButton isQuiet onPress={() => dispatch(deleteLegend(id))}>
							<Delete />
						</ActionButton>
						<Tooltip>Delete legend</Tooltip>
					</TooltipTrigger>
				</Flex>
				<LegendPositionPicker id={id} />
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
					Highlight series on legend hover
				</Switch>
				<Switch
					defaultSelected={isToggleable}
					onChange={(value) => dispatch(setLegendIsToggleable({ id, isToggleable: value }))}
				>
					Toggle visibility of series
				</Switch>
				<AdvancedSettings>
					<SectionDivider label="Symbol styling" />
					<LegendColor id={id} />
				</AdvancedSettings>
			</Flex>
		</Well>
	);
};
