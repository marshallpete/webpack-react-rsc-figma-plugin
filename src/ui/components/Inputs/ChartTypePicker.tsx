import React, { ReactElement } from 'react';
import { ChartType } from '../../types';
import { Item, Picker, Text } from '@adobe/react-spectrum';
import { useDispatch, useSelector } from 'react-redux';
import { selectMarkType, setMarkType } from '../../store/slices/chartSlice';
import GraphArea from '@spectrum-icons/workflow/GraphArea';
import GraphBarVertical from '@spectrum-icons/workflow/GraphBarVertical';
import GraphTrend from '@spectrum-icons/workflow/GraphTrend';
import GraphScatter from '@spectrum-icons/workflow/GraphScatter';

export const ChartTypePicker = () => {
	const chartType = useSelector(selectMarkType);

	const dispatch = useDispatch();
	const chartTypes: { label: string; id: ChartType; icon: ReactElement }[] = [
		{
			icon: <GraphArea />,
			id: 'area',
			label: 'Area',
		},
		{
			icon: <GraphBarVertical />,
			id: 'bar',
			label: 'Bar',
		},
		{
			icon: <GraphTrend />,
			id: 'line',
			label: 'Line',
		},
		{
			icon: <GraphScatter />,
			id: 'scatter',
			label: 'Scatter',
		},
	];

	return (
		<Picker
			label="Chart type"
			items={chartTypes}
			width="100%"
			selectedKey={chartType}
			onSelectionChange={(value: ChartType) => dispatch(setMarkType(value))}
		>
			{({ id, icon, label }) => (
				<Item key={id}>
					{icon}
					<Text>{label}</Text>
				</Item>
			)}
		</Picker>
	);
};
