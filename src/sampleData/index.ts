import { SampleDataId } from '../ui/types';
import { browserUsageData } from './browserData';
import { foodSalesDataByRegionAndCategory } from './foodSalesDataByRegion';
import { characterData } from './marioKartCharacterData';
import { osMarketShareTrendedData } from './osMarketShareTrendedData';

const sampleData: Record<SampleDataId, Record<string, unknown>[]> = {
	foodSalesDataByRegionAndCategory,
	browserUsageData,
	marioKartCharacterData: characterData,
	osMarketShareTrendedData,
};

export default sampleData;
