import { POKEMON_TYPE, getPokcolor, getBackground, getPokemonDescription, getCamleCaseString } from './pokemon.types';

describe('Pokemon Types Constants', () => {
  describe('POKEMON_TYPE', () => {
    it('contains all expected pokemon types', () => {
      expect(POKEMON_TYPE).toHaveProperty('normal');
      expect(POKEMON_TYPE).toHaveProperty('fire');
      expect(POKEMON_TYPE).toHaveProperty('water');
      expect(POKEMON_TYPE).toHaveProperty('electric');
      expect(POKEMON_TYPE).toHaveProperty('grass');
      expect(POKEMON_TYPE).toHaveProperty('ice');
      expect(POKEMON_TYPE).toHaveProperty('fighting');
      expect(POKEMON_TYPE).toHaveProperty('poison');
      expect(POKEMON_TYPE).toHaveProperty('ground');
      expect(POKEMON_TYPE).toHaveProperty('flying');
      expect(POKEMON_TYPE).toHaveProperty('psychic');
      expect(POKEMON_TYPE).toHaveProperty('bug');
      expect(POKEMON_TYPE).toHaveProperty('rock');
      expect(POKEMON_TYPE).toHaveProperty('ghost');
      expect(POKEMON_TYPE).toHaveProperty('dragon');
      expect(POKEMON_TYPE).toHaveProperty('dark');
      expect(POKEMON_TYPE).toHaveProperty('steel');
      expect(POKEMON_TYPE).toHaveProperty('fairy');
      expect(POKEMON_TYPE).toHaveProperty('unknown');
      expect(POKEMON_TYPE).toHaveProperty('shadow');
    });

    it('each type has correct structure', () => {
      Object.values(POKEMON_TYPE).forEach(type => {
        expect(type).toHaveProperty('color');
        expect(type).toHaveProperty('hex');
        expect(typeof type.color).toBe('string');
        expect(typeof type.hex).toBe('string');
      });
    });

    it('has correct color values for specific types', () => {
      expect(POKEMON_TYPE.fire.color).toBe('#EDC2C4');
      expect(POKEMON_TYPE.water.color).toBe('#CBD5ED');
      expect(POKEMON_TYPE.grass.color).toBe('#C0D4C8');
      expect(POKEMON_TYPE.electric.color).toBe('#E2E2A0');
      expect(POKEMON_TYPE.normal.color).toBe('#DDCBD0');
      expect(POKEMON_TYPE.unknown.color).toBe('#C0DFDD');
    });
  });

  describe('getPokcolor', () => {
    it('returns correct color for known types', () => {
      expect(getPokcolor('fire')).toBe('#EDC2C4');
      expect(getPokcolor('water')).toBe('#CBD5ED');
      expect(getPokcolor('grass')).toBe('#C0D4C8');
      expect(getPokcolor('electric')).toBe('#E2E2A0');
      expect(getPokcolor('normal')).toBe('#DDCBD0');
    });

    it('returns unknown color for unknown types', () => {
      expect(getPokcolor('unknown')).toBe('#C0DFDD');
      expect(getPokcolor('nonexistent')).toBe('#C0DFDD');
      expect(getPokcolor('')).toBe('#C0DFDD');
    });

    it('is case sensitive', () => {
      expect(getPokcolor('FIRE')).toBe('#C0DFDD'); // falls back to unknown
      expect(getPokcolor('Fire')).toBe('#C0DFDD'); // falls back to unknown
      expect(getPokcolor('fIrE')).toBe('#C0DFDD'); // falls back to unknown
    });

    it('handles edge cases', () => {
      expect(getPokcolor('fire')).toBe('#EDC2C4');
      expect(getPokcolor('shadow')).toBe('#CACACA');
      expect(getPokcolor('fairy')).toBe('#E4C0CF');
    });
  });

  describe('getBackground', () => {
    it('returns correct background for single type', () => {
      const types = [{ type: { name: 'fire' } }];
      expect(getBackground(types)).toBe('#EDC2C4');
    });

    it('returns correct background for dual types', () => {
      const types = [
        { type: { name: 'fire' } },
        { type: { name: 'water' } }
      ];
      expect(getBackground(types)).toBe('linear-gradient(180deg, #EDC2C4 0%, #CBD5ED 100%)');
    });

    it('returns unknown color for empty array', () => {
      expect(getBackground([])).toBe('#C0DFDD');
    });

    it('returns correct background for unknown types', () => {
      const types = [{ type: { name: 'unknown' } }];
      expect(getBackground(types)).toBe('#C0DFDD');
    });

    it('handles multiple unknown types', () => {
      const types = [
        { type: { name: 'unknown' } },
        { type: { name: 'nonexistent' } }
      ];
      expect(getBackground(types)).toBe('linear-gradient(180deg, #C0DFDD 0%, #C0DFDD 100%)');
    });

    it('handles mixed known and unknown types', () => {
      const types = [
        { type: { name: 'fire' } },
        { type: { name: 'unknown' } }
      ];
      expect(getBackground(types)).toBe('linear-gradient(180deg, #EDC2C4 0%, #C0DFDD 100%)');
    });

    it('handles three or more types (uses first two)', () => {
      const types = [
        { type: { name: 'fire' } },
        { type: { name: 'water' } },
        { type: { name: 'grass' } }
      ];
      expect(getBackground(types)).toBe('linear-gradient(180deg, #EDC2C4 0%, #CBD5ED 100%)');
    });
  });

  describe('getPokemonDescription', () => {
    it('returns description for English flavor text', () => {
      const flavorTextEntries = [
        { language: { name: 'en' }, flavor_text: 'A strange seed was planted on its back at birth.' }
      ];
      const result = getPokemonDescription(flavorTextEntries);
      expect(result).toBe('A strange seed was planted on its back at birth.');
    });

    it('returns empty string when no English flavor text', () => {
      const flavorTextEntries = [
        { language: { name: 'es' }, flavor_text: 'Una semilla extraña fue plantada en su espalda al nacer.' }
      ];
      const result = getPokemonDescription(flavorTextEntries);
      expect(result).toBe('');
    });

    it('returns empty string for empty array', () => {
      const result = getPokemonDescription([]);
      expect(result).toBe('');
    });

    it('handles null and undefined', () => {
      expect(getPokemonDescription(null as any)).toBe('');
      expect(getPokemonDescription(undefined as any)).toBe('');
    });

    it('removes duplicate English descriptions', () => {
      const flavorTextEntries = [
        { language: { name: 'en' }, flavor_text: 'A strange seed was planted on its back at birth.' },
        { language: { name: 'en' }, flavor_text: 'A strange seed was planted on its back at birth.' },
        { language: { name: 'es' }, flavor_text: 'Una semilla extraña fue plantada en su espalda al nacer.' }
      ];
      const result = getPokemonDescription(flavorTextEntries);
      expect(result).toBe('A strange seed was planted on its back at birth.');
    });

    it('returns first English description when multiple exist', () => {
      const flavorTextEntries = [
        { language: { name: 'en' }, flavor_text: 'First English description.' },
        { language: { name: 'en' }, flavor_text: 'Second English description.' }
      ];

      const result = getPokemonDescription(flavorTextEntries);
      expect(result).toBe('First English description.Second English description.');
    });

    it('removes newlines and form feeds from text', () => {
      const flavorTextEntries = [
        { language: { name: 'en' }, flavor_text: 'A strange\nseed was planted\non its back.' }
      ];
      const result = getPokemonDescription(flavorTextEntries);
      expect(result).toBe('A strange seed was planted on its back.');
    });

    it('handles mixed language entries', () => {
      const flavorTextEntries = [
        { language: { name: 'es' }, flavor_text: 'Descripción en español.' },
        { language: { name: 'en' }, flavor_text: 'English description.' },
        { language: { name: 'fr' }, flavor_text: 'Description en français.' }
      ];
      const result = getPokemonDescription(flavorTextEntries);
      expect(result).toBe('English description.');
    });
  });

  describe('getCamleCaseString', () => {
    it('converts single word to camel case', () => {
      expect(getCamleCaseString('hello')).toBe('Hello');
      expect(getCamleCaseString('pokemon')).toBe('Pokemon');
    });

    it('converts multiple words to camel case', () => {
      expect(getCamleCaseString('hello world')).toBe('Hello world');
      expect(getCamleCaseString('pokemon type')).toBe('Pokemon type');
    });

    it('handles already capitalized strings', () => {
      expect(getCamleCaseString('Hello World')).toBe('Hello World');
      expect(getCamleCaseString('POKEMON')).toBe('POKEMON');
    });

    it('handles empty string', () => {
      expect(getCamleCaseString('')).toBe('');
    });

    it('handles single character', () => {
      expect(getCamleCaseString('a')).toBe('A');
      expect(getCamleCaseString('Z')).toBe('Z');
    });

    it('handles special characters', () => {
      expect(getCamleCaseString('hello-world')).toBe('Hello-world');
      expect(getCamleCaseString('hello_world')).toBe('Hello_world');
    });

    it('handles numbers', () => {
      expect(getCamleCaseString('pokemon123')).toBe('Pokemon123');
      expect(getCamleCaseString('123pokemon')).toBe('123pokemon');
    });

    it('handles null and undefined', () => {
      expect(getCamleCaseString(null as any)).toBe('');
      expect(getCamleCaseString(undefined as any)).toBe('');
    });

    it('handles whitespace', () => {
      expect(getCamleCaseString('  hello  ')).toBe('  hello  ');
      expect(getCamleCaseString('\thello\t')).toBe('\thello\t');
    });
  });
});
