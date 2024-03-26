import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectView } from '../store/slices/appSlice';
import { Data } from './Data';
import { ChartPreview } from './ChartPreview/ChartPreview';

export const Main: FC = () => {
	const view = useSelector(selectView);

	switch (view) {
		case 'data':
			return <Data />;

		default:
			return <ChartPreview />;
	}
};
