import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectView } from '../store/slices/appSlice';
import { DataSideBar } from './Data';
import { ChartConfig } from './Chart/ChartConfig';
import { AxesConfig } from './Axes/AxesConfig';
import { LegendConfig } from './Legend/LegendConfig';

export const SideBar: FC = () => {
	const view = useSelector(selectView);

	switch (view) {
		case 'data':
			return <DataSideBar />;
		case 'chart':
			return <ChartConfig />;
		case 'axes':
			return <AxesConfig />;
		case 'legend':
			return <LegendConfig />;

		default:
			return <></>;
	}
};
