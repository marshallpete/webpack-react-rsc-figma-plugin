import { Icon, IconProps } from '@adobe/react-spectrum';
import React, { FC } from 'react';

export const Axes: FC<Omit<IconProps, 'children'>> = (props) => {
	return (
		<Icon {...props}>
			<svg viewBox="0 0 25 25">
				<path d="M 25 21 A 0.5 0.5 0 0 0 24.887 20.684 L 23 19.029 V 19 H 22.967 L 20.854 17.147 A 0.49 0.49 0 0 0 20.5 17 A 0.5 0.5 0 0 0 20 17.5 V 20 H 5 V 5 H 7.5 A 0.5 0.5 0 0 0 8 4.5 A 0.489 0.489 0 0 0 7.853 4.15 L 6 2.033 V 2 H 5.971 L 4.316 0.113 A 0.5 0.5 0 0 0 3.684 0.113 L 2.029 2 H 2 V 2.033 L 0.147 4.146 A 0.489 0.489 0 0 0 0 4.5 A 0.5 0.5 0 0 0 0.5 5 H 3 V 22 H 20 V 24.5 A 0.5 0.5 0 0 0 20.5 25 A 0.491 0.491 0 0 0 20.85 24.852 L 22.967 23 H 23 V 22.971 L 24.887 21.316 A 0.5 0.5 0 0 0 25 21 Z" />
			</svg>
		</Icon>
	);
};
