import { ActionGroup, Item, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import FileData from '@spectrum-icons/workflow/FileData';
import GraphBarVerticalStacked from '@spectrum-icons/workflow/GraphBarVerticalStacked';
import ImageMapRectangle from '@spectrum-icons/workflow/ImageMapRectangle';
import Properties from '@spectrum-icons/workflow/Properties';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axes } from '../icons/Axes';
import { selectView, setView } from '../store/slices/appSlice';
import { AppView } from '../types';
import TextBulleted from '@spectrum-icons/workflow/TextBulleted';

export const ViewBar: FC = () => {
	const items = [
		{ key: 'data', name: 'Data', icon: <FileData /> },
		{ key: 'chart', name: 'Chart', icon: <GraphBarVerticalStacked /> },
		{ key: 'axes', name: 'Axes', icon: <Axes /> },
		{ key: 'legend', name: 'Legend', icon: <TextBulleted /> },
		{ key: 'properties', name: 'Properties', icon: <Properties /> },
		{ key: 'size', name: 'Size', icon: <ImageMapRectangle /> },
	];
	const view = useSelector(selectView);
	const dispatch = useDispatch();

	return (
		<ActionGroup
			items={items}
			orientation="vertical"
			isQuiet
			selectionMode="single"
			selectedKeys={new Set([view])}
			onSelectionChange={(keys) => dispatch(setView(Array.from(keys)[0] as AppView))}
			marginTop={'size-100'}
			disallowEmptySelection
		>
			{({ key, icon, name }) => (
				<TooltipTrigger delay={500} placement={'right'}>
					<Item key={key}>{icon}</Item>
					<Tooltip>{name}</Tooltip>
				</TooltipTrigger>
			)}
		</ActionGroup>
	);
};
