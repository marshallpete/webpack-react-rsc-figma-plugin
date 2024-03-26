import { Divider, Flex, Text } from '@adobe/react-spectrum';
import React, { FC } from 'react';

interface SectionDividerProps {
	label: string;
}

export const SectionDivider: FC<SectionDividerProps> = ({ label }) => {
	return (
		<Flex direction="column" marginTop="size-125">
			<Text>{label}</Text>
			<Divider size="M" />
		</Flex>
	);
};
