import React from 'react';
import { DataKeyPicker } from './MultiInput/DataKeyPicker';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartState, selectMarkProps, setMarkDimension } from '../../store/slices/chartSlice';

export const Dimension = () => {
	const { dimension } = useSelector(selectMarkProps);
	const dispatch = useDispatch();

	const onInputChange = (value: string) => {
		dispatch(setMarkDimension(value));
	};

	return <DataKeyPicker inputValue={dimension} label="Dimension" onInputChange={onInputChange} />;
};
