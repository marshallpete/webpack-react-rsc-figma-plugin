export const jsonToCsv = (data: object[]): string => {
	if (!data || !data.length) return '';
	// extracting the headers from the keys of the first object
	const headers = Object.keys(data[0]);
	let csvString = headers.join(',') + '\n';

	// adding each object's values to the CSV string
	data.forEach((obj) => {
		const row = headers.map((header) => obj[header]).join(',');
		csvString += row + '\n';
	});

	return csvString;
};

export const csvToJson = (csvString: string): Record<string, unknown>[] => {
	// split the string into lines
	const lines = csvString.trim().split('\n');
	const headers = lines[0].split(',');

	return lines.slice(1).map((line) => {
		const values = line.split(',');
		return headers.reduce((item, header, index) => {
			item[header] = values[index].trim();
			return item;
		}, {});
	});
};
