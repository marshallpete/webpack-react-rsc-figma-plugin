import { Flex, Grid, View, ViewProps } from '@adobe/react-spectrum';
import React, { FC } from 'react';
import { Main } from './components/Main';
import { SideBar } from './components/SideBar';
import { ViewBar } from './components/ViewBar';

const viewProps: ViewProps<5> = {
	borderStartColor: 'gray-200',
	borderStartWidth: 'thick',
	overflow: 'auto',
	padding: 'size-100',
};

export const ChartBuilder: FC = () => {
	return (
		<Grid areas={['viewBar sideBar editor']} columns={['42px', '1fr', '2fr']} height="100vh">
			<View gridArea="viewBar">
				<Flex justifyContent={'center'}>
					<ViewBar />
				</Flex>
			</View>
			<View {...viewProps} gridArea="sideBar">
				<SideBar />
			</View>
			<View {...viewProps} gridArea="editor">
				<Main />
			</View>
		</Grid>
	);
};
