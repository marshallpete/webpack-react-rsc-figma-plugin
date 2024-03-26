import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import chartSlice from './chartSlice';

export default combineReducers({
	chart: chartSlice,
	app: appSlice,
});
