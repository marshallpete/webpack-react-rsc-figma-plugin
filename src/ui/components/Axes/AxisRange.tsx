import React, { FC, useEffect, useState } from 'react';
import { useAxis } from '../../hooks/useAxis';
import { Flex, LabeledValue, NumberField } from '@adobe/react-spectrum';
import { useDispatch } from 'react-redux';
import { setAxisRange } from '../../store/slices/chartSlice';

type AxisRangeProps = {
	id: string;
};

export const AxisRange: FC<AxisRangeProps> = ({ id }) => {
	const { range } = useAxis(id);
	const dispatch = useDispatch();
	console.log(range);

	const [min, setMin] = useState(range?.[0] ?? undefined);
	const [max, setMax] = useState(range?.[1] ?? undefined);

	useEffect(() => {
		if (isFinite(min) && isFinite(max)) {
			console.log('setting range', min, max);
			dispatch(setAxisRange({ id, range: [min, max] }));
		} else {
			dispatch(setAxisRange({ id, range: undefined }));
		}
	}, [min, max]);

	return (
		<Flex direction="column">
			<LabeledValue label="Range" value="" labelPosition="side" />
			<Flex direction="row" gap="size-100">
				<NumberField
					labelPosition="side"
					hideStepper
					label="Min"
					value={min}
					onChange={(value) => setMin(value)}
				/>
				<NumberField
					labelPosition="side"
					hideStepper
					label="Max"
					value={max}
					onChange={(value) => setMax(value)}
				/>
			</Flex>
		</Flex>
	);
};
