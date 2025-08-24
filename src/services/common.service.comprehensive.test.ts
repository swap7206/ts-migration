import {
  initialURL,
  allPokemonURL,
  getPokemonData,
  getSpeciesDataById,
  getPokemonTypesById,
  getPokemonTypes,
  getPokemonGenders,
  getPokemonDataById,
  getPokemonDataByURL,
  numberFormation,
  getAllParallelCall,
  removeDuplicateBy
} from './common.service';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Common Service - Comprehensive Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('URL constants', () => {
    it('should define correct initialURL', () => {
      expect(initialURL).toBe('https://pokeapi.co/api/v2/pokemon?limit=12');
    });

    it('should define correct allPokemonURL', () => {
      expect(allPokemonURL).toBe('https://pokeapi.co/api/v2/pokemon?limit=1100');
    });
  });

  describe('getPokemonData', () => {
    it('should fetch pokemon data from initial URL', async () => {
      const mockData = { results: [{ name: 'bulbasaur', url: 'https://example.com/1' }] };
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      });

      const result = await getPokemonData();

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=12');
      expect(result).toEqual(mockData);
    });

    it('should handle fetch errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonData()).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
        ok: true,
        status: 200
      });

      await expect(getPokemonData()).rejects.toThrow('Invalid JSON');
    });
  });

  describe('getSpeciesDataById', () => {
    it('should fetch species data by ID', async () => {
      const mockSpeciesData = {
        id: 1,
        name: 'bulbasaur',
        color: { name: 'green' },
        evolution_chain: { url: 'https://example.com/evolution/1' }
      };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockSpeciesData),
        ok: true,
        status: 200
      });

      const result = await getSpeciesDataById(1);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1/');
      expect(result).toEqual(mockSpeciesData);
    });

    it('should handle different pokemon IDs', async () => {
      const mockSpeciesData = { id: 25, name: 'pikachu' };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockSpeciesData),
        ok: true,
        status: 200
      });

      await getSpeciesDataById(25);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/25/');
    });

    it('should handle fetch errors for species data', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Species not found'));

      await expect(getSpeciesDataById(999)).rejects.toThrow('Species not found');
    });
  });

  describe('getPokemonTypesById', () => {
    it('should fetch pokemon type by ID', async () => {
      const mockTypeData = {
        id: 1,
        name: 'normal',
        pokemon: [{ pokemon: { name: 'ratatta' } }]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockTypeData),
        ok: true,
        status: 200
      });

      const result = await getPokemonTypesById(1);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/1/');
      expect(result).toEqual(mockTypeData);
    });

    it('should handle different type IDs', async () => {
      const mockTypeData = { id: 3, name: 'flying' };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockTypeData),
        ok: true,
        status: 200
      });

      await getPokemonTypesById(3);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/3/');
    });
  });

  describe('getPokemonTypes', () => {
    it('should fetch all pokemon types', async () => {
      const mockTypesData = {
        results: [
          { name: 'normal', url: 'https://example.com/type/1' },
          { name: 'fighting', url: 'https://example.com/type/2' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockTypesData),
        ok: true,
        status: 200
      });

      const result = await getPokemonTypes();

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
      expect(result).toEqual(mockTypesData);
    });

    it('should handle empty types response', async () => {
      const mockTypesData = { results: [] };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockTypesData),
        ok: true,
        status: 200
      });

      const result = await getPokemonTypes();

      expect(result).toEqual(mockTypesData);
    });
  });

  describe('getPokemonGenders', () => {
    it('should fetch all pokemon genders', async () => {
      const mockGendersData = {
        results: [
          { name: 'male', url: 'https://example.com/gender/1' },
          { name: 'female', url: 'https://example.com/gender/2' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockGendersData),
        ok: true,
        status: 200
      });

      const result = await getPokemonGenders();

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/gender');
      expect(result).toEqual(mockGendersData);
    });
  });

  describe('getPokemonDataById', () => {
    it('should fetch pokemon data by ID', async () => {
      const mockPokemonData = {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'https://example.com/bulbasaur.png' }
      };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPokemonData),
        ok: true,
        status: 200
      });

      const result = await getPokemonDataById(1);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
      expect(result).toEqual(mockPokemonData);
    });

    it('should handle large pokemon IDs', async () => {
      const mockPokemonData = { id: 151, name: 'mew' };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPokemonData),
        ok: true,
        status: 200
      });

      await getPokemonDataById(151);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/151/');
    });
  });

  describe('getPokemonDataByURL', () => {
    it('should fetch pokemon data by custom URL', async () => {
      const customURL = 'https://custom-api.com/pokemon/special';
      const mockPokemonData = { id: 999, name: 'custom-pokemon' };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPokemonData),
        ok: true,
        status: 200
      });

      const result = await getPokemonDataByURL(customURL);

      expect(mockFetch).toHaveBeenCalledWith(customURL);
      expect(result).toEqual(mockPokemonData);
    });

    it('should handle relative URLs', async () => {
      const relativeURL = '/api/pokemon/relative';
      const mockPokemonData = { id: 777, name: 'relative-pokemon' };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPokemonData),
        ok: true,
        status: 200
      });

      const result = await getPokemonDataByURL(relativeURL);

      expect(mockFetch).toHaveBeenCalledWith(relativeURL);
      expect(result).toEqual(mockPokemonData);
    });

    it('should handle query parameters in URLs', async () => {
      const urlWithParams = 'https://api.com/pokemon?id=1&type=grass';
      const mockPokemonData = { id: 1, name: 'bulbasaur', type: 'grass' };
      
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPokemonData),
        ok: true,
        status: 200
      });

      const result = await getPokemonDataByURL(urlWithParams);

      expect(mockFetch).toHaveBeenCalledWith(urlWithParams);
      expect(result).toEqual(mockPokemonData);
    });
  });

  describe('numberFormation', () => {
    it('should format single digit numbers with leading zeros', () => {
      expect(numberFormation(1)).toBe('001');
      expect(numberFormation(5)).toBe('005');
      expect(numberFormation(9)).toBe('009');
    });

    it('should format double digit numbers with one leading zero', () => {
      expect(numberFormation(10)).toBe('010');
      expect(numberFormation(25)).toBe('025');
      expect(numberFormation(99)).toBe('099');
    });

    it('should format triple digit numbers without leading zeros', () => {
      expect(numberFormation(100)).toBe('100');
      expect(numberFormation(151)).toBe('151');
      expect(numberFormation(999)).toBe('999');
    });

    it('should handle quadruple digit numbers', () => {
      expect(numberFormation(1000)).toBe('1000');
      expect(numberFormation(1234)).toBe('1234');
    });

    it('should handle string inputs', () => {
      expect(numberFormation('1')).toBe('001');
      expect(numberFormation('25')).toBe('025');
      expect(numberFormation('100')).toBe('100');
    });

    it('should handle edge case of zero', () => {
      expect(numberFormation(0)).toBe('000');
      expect(numberFormation('0')).toBe('000');
    });

    it('should handle negative numbers', () => {
      expect(numberFormation(-1)).toBe('00-1');
      expect(numberFormation(-25)).toBe('00-25');
    });

    it('should handle decimal numbers', () => {
      expect(numberFormation(1.5)).toBe('001.5');
      expect(numberFormation(25.7)).toBe('025.7');
      expect(numberFormation(100.9)).toBe('100.9');
    });

    it('should handle string numbers with decimals', () => {
      expect(numberFormation('1.5')).toBe('001.5');
      expect(numberFormation('25.7')).toBe('025.7');
    });
  });

  describe('getAllParallelCall', () => {
    it('should make parallel API calls and return all results', async () => {
      const urls = [
        'https://api.com/pokemon/1',
        'https://api.com/pokemon/2',
        'https://api.com/pokemon/3'
      ];
      
      const mockResponses = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 3, name: 'venusaur' }
      ];

      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponses[0])
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponses[1])
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponses[2])
        });

      const result = await getAllParallelCall(urls);

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(mockFetch).toHaveBeenCalledWith(urls[0]);
      expect(mockFetch).toHaveBeenCalledWith(urls[1]);
      expect(mockFetch).toHaveBeenCalledWith(urls[2]);
      expect(result).toEqual(mockResponses);
    });

    it('should handle empty URL array', async () => {
      const result = await getAllParallelCall([]);

      expect(mockFetch).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle single URL', async () => {
      const urls = ['https://api.com/pokemon/1'];
      const mockResponse = { id: 1, name: 'bulbasaur' };

      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await getAllParallelCall(urls);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockResponse]);
    });

    it('should handle API call failures', async () => {
      const urls = [
        'https://api.com/pokemon/1',
        'https://api.com/pokemon/invalid'
      ];

      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce({ id: 1, name: 'bulbasaur' })
        })
        .mockRejectedValueOnce(new Error('API Error'));

      await expect(getAllParallelCall(urls)).rejects.toThrow('API Error');
    });

    it('should handle mixed success and failure scenarios', async () => {
      const urls = ['https://api.com/pokemon/1', 'https://api.com/pokemon/2'];

      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce({ id: 1, name: 'bulbasaur' })
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
        });

      await expect(getAllParallelCall(urls)).rejects.toThrow('Invalid JSON');
    });

    it('should preserve order of results matching input URLs', async () => {
      const urls = [
        'https://api.com/pokemon/3',
        'https://api.com/pokemon/1',
        'https://api.com/pokemon/2'
      ];
      
      const mockResponses = [
        { id: 3, name: 'venusaur' },
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' }
      ];

      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponses[0])
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponses[1])
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponses[2])
        });

      const result = await getAllParallelCall(urls);

      expect(result).toEqual(mockResponses);
      expect(result[0].id).toBe(3); // Should preserve order
      expect(result[1].id).toBe(1);
      expect(result[2].id).toBe(2);
    });
  });

  describe('removeDuplicateBy', () => {
    it('should remove duplicates by specified property', () => {
      const arr = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 1, name: 'duplicate-bulbasaur' },
        { id: 3, name: 'venusaur' }
      ];

      const result = removeDuplicateBy(arr, 'id');

      expect(result).toHaveLength(3);
      expect(result.map(item => item.id)).toEqual([1, 2, 3]);
      // Should keep the last occurrence of duplicate
      expect(result.find(item => item.id === 1)?.name).toBe('duplicate-bulbasaur');
    });

    it('should handle empty array', () => {
      const result = removeDuplicateBy([], 'id');

      expect(result).toEqual([]);
    });

    it('should handle array with no duplicates', () => {
      const arr = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 3, name: 'venusaur' }
      ];

      const result = removeDuplicateBy(arr, 'id');

      expect(result).toEqual(arr);
    });

    it('should handle different property types', () => {
      const arr = [
        { name: 'bulbasaur', type: 'grass' },
        { name: 'charmander', type: 'fire' },
        { name: 'ivysaur', type: 'grass' },
        { name: 'squirtle', type: 'water' }
      ];

      const result = removeDuplicateBy(arr, 'type');

      expect(result).toHaveLength(3);
      expect(result.map(item => item.type)).toEqual(['grass', 'fire', 'water']);
      // Should keep the last occurrence of 'grass' type
      expect(result.find(item => item.type === 'grass')?.name).toBe('ivysaur');
    });

    it('should handle string properties', () => {
      const arr = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 3, name: 'bulbasaur' },
        { id: 4, name: 'venusaur' }
      ];

      const result = removeDuplicateBy(arr, 'name');

      expect(result).toHaveLength(3);
      expect(result.map(item => item.name)).toEqual(['bulbasaur', 'ivysaur', 'venusaur']);
      // Should keep the last occurrence of 'bulbasaur'
      expect(result.find(item => item.name === 'bulbasaur')?.id).toBe(3);
    });

    it('should handle numeric properties', () => {
      const arr = [
        { level: 1, pokemon: 'bulbasaur' },
        { level: 2, pokemon: 'ivysaur' },
        { level: 1, pokemon: 'charmander' },
        { level: 3, pokemon: 'venusaur' }
      ];

      const result = removeDuplicateBy(arr, 'level');

      expect(result).toHaveLength(3);
      expect(result.map(item => item.level)).toEqual([1, 2, 3]);
      // Should keep the last occurrence of level 1
      expect(result.find(item => item.level === 1)?.pokemon).toBe('charmander');
    });

    it('should handle boolean properties', () => {
      const arr = [
        { id: 1, isLegendary: false },
        { id: 2, isLegendary: true },
        { id: 3, isLegendary: false },
        { id: 4, isLegendary: true }
      ];

      const result = removeDuplicateBy(arr, 'isLegendary');

      expect(result).toHaveLength(2);
      expect(result.map(item => item.isLegendary)).toEqual([false, true]);
      // Should keep the last occurrence of each boolean value
      expect(result.find(item => item.isLegendary === false)?.id).toBe(3);
      expect(result.find(item => item.isLegendary === true)?.id).toBe(4);
    });

    it('should handle undefined/null values', () => {
      const arr = [
        { id: 1, category: 'starter' },
        { id: 2, category: null },
        { id: 3, category: 'starter' },
        { id: 4, category: undefined },
        { id: 5, category: null }
      ];

      const result = removeDuplicateBy(arr, 'category');

      expect(result).toHaveLength(3);
      expect(result.map(item => item.category)).toEqual(['starter', null, undefined]);
      // Should keep the last occurrence of each value
      expect(result.find(item => item.category === 'starter')?.id).toBe(3);
      expect(result.find(item => item.category === null)?.id).toBe(5);
      expect(result.find(item => item.category === undefined)?.id).toBe(4);
    });

    it('should handle complex object properties', () => {
      const arr = [
        { id: 1, metadata: { type: 'grass', generation: 1 } },
        { id: 2, metadata: { type: 'fire', generation: 1 } },
        { id: 3, metadata: { type: 'grass', generation: 1 } }
      ];

      // Note: This will compare object references, not deep equality
      const result = removeDuplicateBy(arr, 'metadata');

      expect(result).toHaveLength(3); // All objects are unique by reference
    });

    it('should handle single item array', () => {
      const arr = [{ id: 1, name: 'bulbasaur' }];
      
      const result = removeDuplicateBy(arr, 'id');

      expect(result).toEqual(arr);
    });

    it('should handle all items being duplicates', () => {
      const arr = [
        { id: 1, name: 'bulbasaur' },
        { id: 1, name: 'bulbasaur-variant' },
        { id: 1, name: 'bulbasaur-shiny' }
      ];

      const result = removeDuplicateBy(arr, 'id');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('bulbasaur-shiny'); // Last occurrence
    });
  });
});
