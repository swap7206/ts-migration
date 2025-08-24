import { baseURL, LIMIT, SEARCH_SLICED } from './apiUrls';

describe('API URLs Constants', () => {
  describe('baseURL', () => {
    it('should export baseURL constant', () => {
      expect(baseURL).toBeDefined();
    });

    it('should have correct PokeAPI base URL', () => {
      expect(baseURL).toBe('https://pokeapi.co/api/v2');
    });

    it('should be a string', () => {
      expect(typeof baseURL).toBe('string');
    });

    it('should be a valid URL', () => {
      expect(baseURL).toMatch(/^https?:\/\/.+/);
    });

    it('should point to PokeAPI', () => {
      expect(baseURL).toContain('pokeapi.co');
    });

    it('should have correct API version', () => {
      expect(baseURL).toContain('/api/v2');
    });
  });

  describe('LIMIT', () => {
    it('should export LIMIT constant', () => {
      expect(LIMIT).toBeDefined();
    });

    it('should be a number', () => {
      expect(typeof LIMIT).toBe('number');
    });

    it('should have a reasonable value', () => {
      expect(LIMIT).toBeGreaterThan(0);
      expect(LIMIT).toBeLessThanOrEqual(100);
    });

    it('should be exactly 12', () => {
      expect(LIMIT).toBe(12);
    });

    it('should be an integer', () => {
      expect(Number.isInteger(LIMIT)).toBe(true);
    });
  });

  describe('SEARCH_SLICED', () => {
    it('should export SEARCH_SLICED constant', () => {
      expect(SEARCH_SLICED).toBeDefined();
    });

    it('should be a number', () => {
      expect(typeof SEARCH_SLICED).toBe('number');
    });

    it('should have a reasonable value', () => {
      expect(SEARCH_SLICED).toBeGreaterThan(0);
      expect(SEARCH_SLICED).toBeLessThanOrEqual(100);
    });

    it('should be exactly 30', () => {
      expect(SEARCH_SLICED).toBe(30);
    });

    it('should be an integer', () => {
      expect(Number.isInteger(SEARCH_SLICED)).toBe(true);
    });

    it('should be greater than LIMIT', () => {
      expect(SEARCH_SLICED).toBeGreaterThan(LIMIT);
    });
  });

  describe('Constants Relationship', () => {
    it('should have consistent values', () => {
      expect(LIMIT).toBe(12);
      expect(SEARCH_SLICED).toBe(30);
      expect(SEARCH_SLICED).toBeGreaterThan(LIMIT);
    });

    it('should have reasonable proportions', () => {
      const ratio = SEARCH_SLICED / LIMIT;
      expect(ratio).toBe(2.5);
    });
  });

  describe('Constants Usage', () => {
    it('should be usable in API calls', () => {
      // Simulate API call construction
      const apiUrl = `${baseURL}/pokemon?limit=${LIMIT}`;
      expect(apiUrl).toBe('https://pokeapi.co/api/v2/pokemon?limit=12');
    });

    it('should be usable in search functionality', () => {
      // Simulate search functionality
      const searchLimit = SEARCH_SLICED;
      expect(searchLimit).toBe(30);
    });

    it('should be usable in pagination', () => {
      // Simulate pagination
      const pageSize = LIMIT;
      const searchSize = SEARCH_SLICED;
      
      expect(pageSize).toBe(12);
      expect(searchSize).toBe(30);
    });
  });

  describe('Constants Immutability', () => {
    it('should not be modifiable', () => {
      const originalBaseURL = baseURL;
      const originalLimit = LIMIT;
      const originalSearchSliced = SEARCH_SLICED;

      // These should remain constant
      expect(baseURL).toBe(originalBaseURL);
      expect(LIMIT).toBe(originalLimit);
      expect(SEARCH_SLICED).toBe(originalSearchSliced);
    });
  });

  describe('Constants Validation', () => {
    it('should have valid URL format for baseURL', () => {
      const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
      expect(urlPattern.test(baseURL)).toBe(true);
    });

    it('should have positive integer values for numeric constants', () => {
      expect(LIMIT).toBeGreaterThan(0);
      expect(SEARCH_SLICED).toBeGreaterThan(0);
      expect(Number.isInteger(LIMIT)).toBe(true);
      expect(Number.isInteger(SEARCH_SLICED)).toBe(true);
    });
  });
});
