import * as commonService from './common.service';

// Mock fetch globally
global.fetch = jest.fn();

describe('Common Service - Simple Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
    
    // Mock successful fetch responses by default
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 1, name: 'bulbasaur' })
    });
  });

  describe('URL Constants', () => {
    it('exports initialURL', () => {
      expect(commonService.initialURL).toBeDefined();
      expect(typeof commonService.initialURL).toBe('string');
    });

    it('exports allPokemonURL', () => {
      expect(commonService.allPokemonURL).toBeDefined();
      expect(typeof commonService.allPokemonURL).toBe('string');
    });

    it('has valid URL format', () => {
      expect(commonService.initialURL).toMatch(/^https?:\/\/.+/);
      expect(commonService.allPokemonURL).toMatch(/^https?:\/\/.+/);
    });
  });

  describe('getPokemonDataById', () => {
    it('is a function', () => {
      expect(typeof commonService.getPokemonDataById).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getPokemonDataById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1, name: 'bulbasaur' })
      });

      await commonService.getPokemonDataById(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon/1')
      );
    });
  });

  describe('getSpeciesDataById', () => {
    it('is a function', () => {
      expect(typeof commonService.getSpeciesDataById).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getSpeciesDataById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1, name: 'bulbasaur' })
      });

      await commonService.getSpeciesDataById(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon-species/1')
      );
    });
  });

  describe('getPokemonTypesById', () => {
    it('is a function', () => {
      expect(typeof commonService.getPokemonTypesById).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getPokemonTypesById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1, name: 'grass' })
      });

      await commonService.getPokemonTypesById(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/type/1')
      );
    });
  });

  describe('getPokemonDataByURL', () => {
    it('is a function', () => {
      expect(typeof commonService.getPokemonDataByURL).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getPokemonDataByURL('https://example.com');
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with provided URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1, name: 'bulbasaur' })
      });

      await commonService.getPokemonDataByURL('https://example.com/pokemon/1');
      expect(global.fetch).toHaveBeenCalledWith('https://example.com/pokemon/1');
    });
  });

  describe('getAllParallelCall', () => {
    it('is a function', () => {
      expect(typeof commonService.getAllParallelCall).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getAllParallelCall(['https://example.com']);
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch for each URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1, name: 'bulbasaur' })
      });

      await commonService.getAllParallelCall([
        'https://example.com/1',
        'https://example.com/2'
      ]);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('getPokemonGenders', () => {
    it('is a function', () => {
      expect(typeof commonService.getPokemonGenders).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getPokemonGenders();
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ results: [] })
      });

      await commonService.getPokemonGenders();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/gender')
      );
    });
  });

  describe('getPokemonTypes', () => {
    it('is a function', () => {
      expect(typeof commonService.getPokemonTypes).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getPokemonTypes();
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ results: [] })
      });

      await commonService.getPokemonTypes();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/type')
      );
    });
  });

  describe('getPokemonData', () => {
    it('is a function', () => {
      expect(typeof commonService.getPokemonData).toBe('function');
    });

    it('returns a promise', () => {
      const result = commonService.getPokemonData();
      expect(result).toBeInstanceOf(Promise);
    });

    it('calls fetch with correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ results: [] })
      });

      await commonService.getPokemonData();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon')
      );
    });
  });

  describe('removeDuplicateBy', () => {
    it('is a function', () => {
      expect(typeof commonService.removeDuplicateBy).toBe('function');
    });

    it('removes duplicates by property', () => {
      const array = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 1, name: 'c' }
      ];
      const result = commonService.removeDuplicateBy(array, 'id');
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('handles empty array', () => {
      const result = commonService.removeDuplicateBy([], 'id');
      expect(result).toEqual([]);
    });

    it('handles array with no duplicates', () => {
      const array = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' }
      ];
      const result = commonService.removeDuplicateBy(array, 'id');
      expect(result).toEqual(array);
    });
  });

  describe('Error Handling', () => {
    it('handles fetch errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(commonService.getPokemonDataById(1)).rejects.toThrow('Network error');
    });

    it('handles non-ok responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(commonService.getPokemonDataById(1)).rejects.toThrow();
    });
  });
});
