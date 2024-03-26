import React from 'react';
import { DataKeyPicker } from './MultiInput/DataKeyPicker';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartState, selectMarkProps, setMarkMetric } from '../../store/slices/chartSlice';

export const Metric = () => {
	const { metric } = useSelector(selectMarkProps);
	const dispatch = useDispatch();

	const onInputChange = (value: string) => {
		dispatch(setMarkMetric(value));
	};

	return <DataKeyPicker inputValue={metric} label="Metric" onInputChange={onInputChange} />;
};
