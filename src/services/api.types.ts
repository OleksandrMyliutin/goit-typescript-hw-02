import { Result } from '../../src/components/App/App.types'; // твій шлях

export interface FetchResultsResponse {
    results: Result[];
    total_pages: number;
    }