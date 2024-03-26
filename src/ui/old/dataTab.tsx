import { TextArea, Flex, RadioGroup, Radio, Picker, Item, Key, Text, ActionButton } from '@adobe/react-spectrum';
import DataUpload from '@spectrum-icons/workflow/DataUpload';
import DataDownload from '@spectrum-icons/workflow/DataDownload';
import * as React from 'react';
import { useEffect, Dispatch, SetStateAction, FC, ChangeEvent, useRef } from 'react';
interface DataTabProps {
	dataText: string;
	setDataText: Dispatch<SetStateAction<string>>;
	selectedDataMode: string;
	setSelectedDataMode: Dispatch<SetStateAction<string>>;
	chartData: { data: unknown; description: string };
	setChartData: Dispatch<SetStateAction<{ data: unknown; description: string }>>;
	selectedSample: Key;
	setSelectedSample: Dispatch<SetStateAction<Key>>;
}

export const DataTab: FC<DataTabProps> = ({
	dataText,
	setDataText,
	selectedDataMode,
	setSelectedDataMode,
	chartData,
	setChartData,
	selectedSample,
	setSelectedSample,
}) => {
	const SAMPLE_DATA_LABEL = 'Sample data';
	const CUSTOM_DATA_LABEL = 'Custom data';

	const options = [
		{ id: 'feature-usage', name: 'Feature usage' },
		{ id: 'browser-usage', name: 'Browser usage' },
		{ id: 'browser-data', name: 'Browser data' },
	];

	const { data, description } = chartData;
	useEffect(() => {
		if (chartData) setDataText(arrayToCSV(data));
	}, [chartData]);

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			// The file's text will be printed here
			if (event?.target?.result) {
				// Convert the csv string to the format react-spectrum charts expects
				setChartData({
					data: csvToArray(String(event.target.result)),
					description: '',
				});
			}
		};
		// Clear the file input value
		event.target.value = '';

		if (file) reader.readAsText(file);
	};

	// Add a reference to the file input
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileUploadClick = () => {
		if (fileInputRef.current) fileInputRef.current.click();
	};

	return (
		<Flex gap="size-150" wrap height={'100%'} direction="row">
			<Flex direction="column" gap="size-150">
				<RadioGroup value={selectedDataMode} onChange={setSelectedDataMode}>
					<Radio value="sample">{SAMPLE_DATA_LABEL}</Radio>
					<Radio value="custom">{CUSTOM_DATA_LABEL}</Radio>
				</RadioGroup>
				{selectedDataMode === 'sample' && (
					<Picker
						label="Sample data"
						items={options}
						selectedKey={selectedSample}
						onSelectionChange={(key: Key) => setSelectedSample(key)}
					>
						{(item) => <Item>{item.name}</Item>}
					</Picker>
				)}
				<Text>{description}</Text>

				{selectedDataMode === 'custom' ? (
					<Flex>
						<ActionButton onPress={handleFileUploadClick}>
							<Flex>
								<DataUpload />
								{dataText ? 'Replace CSV' : 'Upload CSV'}
							</Flex>
						</ActionButton>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleFileUpload}
							accept=".csv"
							style={{ display: 'none' }}
						/>
					</Flex>
				) : (
					<ActionButton
						onPress={() => {
							handleDataDownload(dataText);
						}}
					>
						<Flex>
							<DataDownload />
							Download CSV
						</Flex>
					</ActionButton>
				)}
			</Flex>

			<TextArea
				validationState={isValidCSV(dataText) ? 'valid' : 'invalid'}
				alignSelf="stretch"
				flexGrow={2}
				flex={2}
				value={dataText}
				onChange={setDataText}
			/>
		</Flex>
	);
};

/**
 * This is a really light validation, we're just checking that the number of columns is consistent.
 * @param csvString
 * @returns Wether or not the csv string is valid
 */
const isValidCSV = (csvString: string) => {
	if (!csvString) return false;
	// Split the string into lines
	const lines = csvString.trim().split('\n');

	// Get the number of columns from the first line
	const numberOfColumns = lines[0].split(',').length;

	// Check each line for the correct number of columns
	for (let line of lines) {
		if (line.split(',').length !== numberOfColumns) {
			return false;
		}
	}

	return true;
};

// take chartData data and download it as a csv file
const handleDataDownload = (dataText: string) => {
	const csvData = new Blob([dataText], { type: 'text/csv;charset=utf-8;' });
	// Create a URL for the blob
	const csvURL = window.URL.createObjectURL(csvData);
	const tempLink = document.createElement('a');
	tempLink.href = csvURL;
	tempLink.setAttribute('download', 'download.csv');
	tempLink.click();
};

const arrayToCSV = (data) => {
	if (!data || !data.length) return '';
	// Extracting the headers from the keys of the first object
	const headers = Object.keys(data[0]);
	let csvString = headers.join(',') + '\n';

	// Adding each object's values to the CSV string
	data.forEach((obj) => {
		const row = headers.map((header) => obj[header]).join(',');
		csvString += row + '\n';
	});

	return csvString;
};

const csvToArray = (csvString) => {
	const lines = csvString.trim().split('\n');
	const headers = lines[0].split(',');

	return lines.slice(1).map((line) => {
		const values = line.split(',');
		return headers.reduce((obj, header, index) => {
			obj[header] = values[index];
			return obj;
		}, {});
	});
};
