import React, { FC, FocusEvent, useRef } from 'react';
import { Flex, Grid, Radio, RadioGroup, TextArea, View } from '@adobe/react-spectrum';
import { DataType } from './types';
import { csvToJson, jsonToCsv } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, setData } from './store/slices/chartSlice';
import { selectAppDataState, setDataType } from './store/slices/appSlice';

export const DataBuilder: FC = () => {
	const { type } = useSelector(selectAppDataState);

	const dispatch = useDispatch();

	const data = useSelector(selectData);
	const csvDataRef = useRef<string>(jsonToCsv(data));

	return (
		<Grid areas={['leftRail content']} columns={['1fr', '3fr']} gap="size-100" height="calc(100vh - 100px)">
			<View gridArea="leftRail" overflow="auto" padding={12}>
				<RadioGroup label="data" value={type} onChange={(value: DataType) => dispatch(setDataType(value))}>
					<Radio value="sample">Sample data</Radio>
					<Radio value="custom">Custom data</Radio>
				</RadioGroup>
			</View>
			<View gridArea="content" overflow="auto" padding={12}>
				<TextArea
					height={400}
					width="100%"
					aria-label="Data"
					defaultValue={csvDataRef.current}
					onChange={(value) => (csvDataRef.current = value)}
					onBlur={() => dispatch(setData(csvToJson(csvDataRef.current)))}
				/>
			</View>
		</Grid>
	);
};
