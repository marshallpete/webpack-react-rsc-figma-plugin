import { useSelector } from 'react-redux';
import { selectData } from '../store/slices/chartSlice';

export const useDataKeys = (): { key: string; dataType: 'datetime' | 'string' | 'number' }[] => {
	const data = useSelector(selectData);

	return Object.keys(data[0] || {}).map((key) => ({
		key,
		dataType: getDataType(data[0][key]),
	}));
};

const getDataType = (value: number | string): 'datetime' | 'string' | 'number' => {
	if (typeof value === 'string') return 'string';
	if (Number.isInteger(value) && new Date(value).getFullYear() > 1990 && new Date(value).getFullYear() < 2050) {
		return 'datetime';
	}
	return 'number';
};
