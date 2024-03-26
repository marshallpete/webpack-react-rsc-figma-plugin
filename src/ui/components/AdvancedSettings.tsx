import { ActionButton, Divider, Flex, Text } from '@adobe/react-spectrum';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import React, { FC, ReactElement, useState } from 'react';

interface AdvancedSettingsProps {
	children: ReactElement | ReactElement[];
}

export const AdvancedSettings: FC<AdvancedSettingsProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Flex direction={'column'} marginTop="size-250">
			<Divider size="S" />
			<ActionButton
				isQuiet
				onPress={() => setIsOpen(!isOpen)}
				width="100%"
				UNSAFE_style={{ borderRadius: 0, height: '40px' }}
			>
				{!isOpen && <ChevronRight />}
				{isOpen && <ChevronDown />}
				<Text UNSAFE_style={{ textAlign: 'start', fontWeight: 'bold', fontSize: '14px' }}>
					Advanced settings
				</Text>
			</ActionButton>
			{isOpen && (
				<Flex direction={'column'} gap="size-100" marginY="size-100">
					{children}
				</Flex>
			)}
		</Flex>
	);
};
