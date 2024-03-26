import { TextArea } from '@adobe/react-spectrum';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, setData } from '../../store/slices/chartSlice';
import { csvToJson, jsonToCsv } from '../../utils';
import { TextFieldRef } from '@react-types/textfield';

export const Data: FC = () => {
	const [csvData, setCsvData] = useState<string>();
	const data = useSelector(selectData);

	const dispatch = useDispatch();

	useEffect(() => {
		setCsvData(jsonToCsv(data));
	}, [data]);

	return (
		<TextArea
			height="calc(100vh - 16px)"
			width="100%"
			aria-label="Data"
			value={csvData}
			onChange={setCsvData}
			onBlur={() => dispatch(setData(csvToJson(csvData)))}
		/>
	);
};
