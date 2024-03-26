import React, { FC } from 'react';

import { Item, Picker, Text } from '@adobe/react-spectrum';
import { useDataKeys } from '../../../hooks/useDataKeys';
import { InputType } from '../../../types';
import ABC from '@spectrum-icons/workflow/ABC';
import _123 from '@spectrum-icons/workflow/123';
import Date from '@spectrum-icons/workflow/Date';

interface DataKeyPickerProps {
	onInputChange?: (key: string, type: InputType) => void;
	inputValue?: string;
	label?: string;
}

export const DataKeyPicker: FC<DataKeyPickerProps> = ({ onInputChange, inputValue, label }) => {
	const dataKeys = useDataKeys();
	const dataKeyOptions = dataKeys.map(({ key, dataType }) => ({ label: key, id: key, icon: dataTypeIcon[dataType] }));

	return (
		<Picker
			items={dataKeyOptions}
			width="100%"
			label={label}
			gridArea="input"
			defaultSelectedKey={inputValue}
			onSelectionChange={(key: string) => onInputChange(key, 'key')}
		>
			{({ id, label, icon }) => (
				<Item key={id}>
					{icon}
					<Text>{label}</Text>
				</Item>
			)}
		</Picker>
	);
};

const dataTypeIcon = {
	datetime: <Date />,
	number: <_123 />,
	string: <ABC />,
};
