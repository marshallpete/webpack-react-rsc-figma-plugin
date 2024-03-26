import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppView, DataType } from '../../types';
import { RootState } from '../store';

export interface AppState {
	data: {
		sample: string;
		type: DataType;
	};
	view: AppView;
}

const initialState: AppState = {
	data: {
		sample: 'sample1',
		type: 'sample',
	},
	view: 'data',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setDataSample: (state, { payload }: PayloadAction<AppState['data']['sample']>) => {
			state.data.sample = payload;
		},
		setDataType: (state, { payload }: PayloadAction<AppState['data']['type']>) => {
			state.data.type = payload;
		},
		setView: (state, { payload }: PayloadAction<AppState['view']>) => {
			state.view = payload;
		},
	},
});

export const selectAppDataState = (state: RootState) => state.app.data;
export const selectView = (state: RootState) => state.app.view;

// Action creators are generated for each case reducer function
export const { setDataSample, setDataType, setView } = appSlice.actions;

export default appSlice.reducer;
