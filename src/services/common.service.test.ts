import { 
  getPokemonData, 
  getSpeciesDataById, 
  getPokemonDataById,
  getPokemonTypesById,
  getPokemonTypes,
  getPokemonGenders,
  getPokemonDataByURL,
  getAllParallelCall,
  numberFormation, 
  removeDuplicateBy 
} from './common.service';

// Mock fetch
global.fetch = jest.fn();

describe('Common Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemonData', () => {
    it('fetches pokemon data successfully', async () => {
      const mockResponse = { results: [], count: 0 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getPokemonData();

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=12');
      expect(result).toEqual(mockResponse);
    });

    it('handles fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonData()).rejects.toThrow('Network error');
    });

    it('handles non-ok response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(getPokemonData()).rejects.toThrow('response.json is not a function');
    });
  });

  describe('getSpeciesDataById', () => {
    it('fetches pokemon species data successfully', async () => {
      const mockResponse = { id: 1, name: 'bulbasaur' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getSpeciesDataById(1);

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1/');
      expect(result).toEqual(mockResponse);
    });

    it('handles fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(getSpeciesDataById(1)).rejects.toThrow('Network error');
    });

    it('handles non-ok response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(getSpeciesDataById(999)).rejects.toThrow('response.json is not a function');
    });
  });

  describe('getPokemonDataById', () => {
    it('fetches pokemon data by id successfully', async () => {
      const mockResponse = { id: 1, name: 'bulbasaur' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getPokemonDataById(1);

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
      expect(result).toEqual(mockResponse);
    });

    it('handles fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonDataById(1)).rejects.toThrow('Network error');
    });
  });

  describe('getPokemonTypesById', () => {
    it('fetches pokemon types by id successfully', async () => {
      const mockResponse = { id: 1, name: 'normal' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getPokemonTypesById(1);

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/1/');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPokemonTypes', () => {
    it('fetches all pokemon types successfully', async () => {
      const mockResponse = { results: [], count: 0 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getPokemonTypes();

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPokemonGenders', () => {
    it('fetches pokemon genders successfully', async () => {
      const mockResponse = { results: [], count: 0 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getPokemonGenders();

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/gender');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPokemonDataByURL', () => {
    it('fetches pokemon data by URL successfully', async () => {
      const mockResponse = { id: 1, name: 'bulbasaur' };
      const testURL = 'https://pokeapi.co/api/v2/pokemon/1/';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getPokemonDataByURL(testURL);

      expect(fetch).toHaveBeenCalledWith(testURL);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAllParallelCall', () => {
    it('fetches multiple URLs in parallel successfully', async () => {
      const urls = [
        'https://pokeapi.co/api/v2/pokemon/1/',
        'https://pokeapi.co/api/v2/pokemon/2/'
      ];
      const mockResponses = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' }
      ];

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponses[0]
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponses[1]
        });

      const result = await getAllParallelCall(urls);

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, urls[0]);
      expect(fetch).toHaveBeenNthCalledWith(2, urls[1]);
      expect(result).toEqual(mockResponses);
    });

    it('handles empty URL array', async () => {
      const result = await getAllParallelCall([]);
      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('handles fetch errors in parallel calls', async () => {
      const urls = [
        'https://pokeapi.co/api/v2/pokemon/1/',
        'https://pokeapi.co/api/v2/pokemon/2/'
      ];

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 1, name: 'bulbasaur' })
        })
        .mockRejectedValueOnce(new Error('Network error'));

      await expect(getAllParallelCall(urls)).rejects.toThrow('Network error');
    });
  });

  describe('numberFormation', () => {
    it('formats single digit numbers', () => {
      expect(numberFormation(1)).toBe('001');
      expect(numberFormation(9)).toBe('009');
    });

    it('formats double digit numbers', () => {
      expect(numberFormation(10)).toBe('010');
      expect(numberFormation(99)).toBe('099');
    });

    it('formats triple digit numbers', () => {
      expect(numberFormation(100)).toBe('100');
      expect(numberFormation(999)).toBe('999');
    });

    it('formats large numbers', () => {
      expect(numberFormation(1000)).toBe('1000');
      expect(numberFormation(9999)).toBe('9999');
    });

    it('handles zero', () => {
      expect(numberFormation(0)).toBe('000');
    });

    it('handles negative numbers', () => {
      expect(numberFormation(-1)).toBe('00-1');
      expect(numberFormation(-10)).toBe('00-10');
    });

    it('handles string inputs', () => {
      expect(numberFormation('1')).toBe('001');
      expect(numberFormation('10')).toBe('010');
      expect(numberFormation('100')).toBe('100');
    });

    it('handles decimal numbers', () => {
      expect(numberFormation(1.5)).toBe('001.5');
      expect(numberFormation(10.7)).toBe('010.7');
    });

    it('handles edge cases', () => {
      expect(numberFormation(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
      expect(numberFormation(Number.MIN_SAFE_INTEGER)).toBe('00-9007199254740991');
    });
  });

  describe('removeDuplicateBy', () => {
    it('removes duplicates by specified property', () => {
      const array = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Alice' }
      ];
      const result = removeDuplicateBy(array, 'name');
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 3, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]);
    });

    it('handles empty array', () => {
      const result = removeDuplicateBy([], 'id');
      expect(result).toEqual([]);
    });

    it('handles array with no duplicates', () => {
      const array = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
      const result = removeDuplicateBy(array, 'id');
      expect(result).toHaveLength(2);
      expect(result).toEqual(array);
    });

    it('handles array with all duplicates', () => {
      const array = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Alice' },
        { id: 3, name: 'Alice' }
      ];
      const result = removeDuplicateBy(array, 'name');
      expect(result).toHaveLength(1);
      expect(result).toEqual([{ id: 3, name: 'Alice' }]);
    });

    it('removes duplicates by name property', () => {
      const array = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Alice', age: 28 }
      ];
      const result = removeDuplicateBy(array, 'name');
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 3, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 30 }
      ]);
    });

    it('handles objects with missing properties', () => {
      const array = [
        { id: 1, name: 'Alice' },
        { id: 2 },
        { id: 3, name: 'Charlie' },
        { id: 4 }
      ];
      const result = removeDuplicateBy(array, 'name');
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { id: 1, name: 'Alice' },
        { id: 4 },
        { id: 3, name: 'Charlie' }
      ]);
    });

    it('handles nested object properties', () => {
      const array = [
        { id: 1, info: { type: 'fire' } },
        { id: 2, info: { type: 'water' } },
        { id: 3, info: { type: 'fire' } }
      ];
      const result = removeDuplicateBy(array, 'info');
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { id: 1, info: { type: 'fire' } },
        { id: 2, info: { type: 'water' } },
        { id: 3, info: { type: 'fire' } }
      ]);
    });

    it('handles array properties', () => {
      const array = [
        { id: 1, types: ['fire', 'flying'] },
        { id: 2, types: ['water'] },
        { id: 3, types: ['fire', 'flying'] }
      ];
      const result = removeDuplicateBy(array, 'types');
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { id: 1, types: ['fire', 'flying'] },
        { id: 2, types: ['water'] },
        { id: 3, types: ['fire', 'flying'] }
      ]);
    });
  });
});
