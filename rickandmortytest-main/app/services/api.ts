import axios from 'axios';
import {CharactersFetchResult} from './models';

/**
 * Fetch Rick & Morty TV show characters using Axios
 * https://rickandmortyapi.com/documentation/#rest
 * @param {number} page
 * @returns Promise<CharactersFetchResult>
 */
export const fetchCharacters = async (
  page: number = 1,
): Promise<CharactersFetchResult> => {
  try {
    const response = await axios.get<CharactersFetchResult>(
      `https://rickandmortyapi.com/api/character`,
      {
        params: {page},
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(`Failed to fetch characters: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching characters');
    }
  }
};
