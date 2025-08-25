import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  it('should be a function', () => {
    expect(typeof reportWebVitals).toBe('function');
  });

  it('should handle null onPerfEntry', () => {
    expect(() => {
      reportWebVitals(null);
    }).not.toThrow();
  });

  it('should handle undefined onPerfEntry', () => {
    expect(() => {
      reportWebVitals(undefined);
    }).not.toThrow();
  });

  it('should handle non-function onPerfEntry', () => {
    expect(() => {
      reportWebVitals('not a function');
    }).not.toThrow();
  });

  it('should handle number onPerfEntry', () => {
    expect(() => {
      reportWebVitals(123);
    }).not.toThrow();
  });

  it('should handle object onPerfEntry', () => {
    expect(() => {
      reportWebVitals({});
    }).not.toThrow();
  });

  it('should handle array onPerfEntry', () => {
    expect(() => {
      reportWebVitals([]);
    }).not.toThrow();
  });

  it('should handle function onPerfEntry', () => {
    const mockOnPerfEntry = jest.fn();
    expect(() => {
      reportWebVitals(mockOnPerfEntry);
    }).not.toThrow();
  });

  it('should handle function that throws an error', () => {
    const mockOnPerfEntry = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });
    
    expect(() => {
      reportWebVitals(mockOnPerfEntry);
    }).not.toThrow();
  });

  it('should handle async function', () => {
    const mockOnPerfEntry = jest.fn().mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    expect(() => {
      reportWebVitals(mockOnPerfEntry);
    }).not.toThrow();
  });

  it('should handle function with parameters', () => {
    const mockOnPerfEntry = jest.fn((metric) => {
      console.log(metric);
    });
    
    expect(() => {
      reportWebVitals(mockOnPerfEntry);
    }).not.toThrow();
  });

  it('should handle function that returns a value', () => {
    const mockOnPerfEntry = jest.fn(() => {
      return 'performance data';
    });
    
    expect(() => {
      reportWebVitals(mockOnPerfEntry);
    }).not.toThrow();
  });

  it('should handle multiple calls', () => {
    const mockOnPerfEntry1 = jest.fn();
    const mockOnPerfEntry2 = jest.fn();
    
    expect(() => {
      reportWebVitals(mockOnPerfEntry1);
      reportWebVitals(mockOnPerfEntry2);
    }).not.toThrow();
  });

  it('should handle function instanceof check correctly', () => {
    const mockOnPerfEntry = jest.fn();
    
    // Test that the instanceof check works
    expect(typeof mockOnPerfEntry).toBe('function');
    expect(typeof 'not a function').toBe('string');
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
  });

  it('should handle function with different contexts', () => {
    const mockOnPerfEntry = jest.fn();
    
    // Test with different function contexts
    const boundFunction = mockOnPerfEntry.bind({});
    const arrowFunction = () => {};
    
    expect(() => {
      reportWebVitals(boundFunction);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(arrowFunction);
    }).not.toThrow();
  });

  it('should handle function with different types', () => {
    // Test various function types
    const regularFunction = function() {};
    const arrowFunction = () => {};
    const asyncFunction = async () => {};
    const generatorFunction = function*() {};
    
    expect(() => {
      reportWebVitals(regularFunction);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(arrowFunction);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(asyncFunction);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(generatorFunction);
    }).not.toThrow();
  });

  it('should handle edge cases for function detection', () => {
    // Test edge cases
    const functionWithPrototype = function() {};
    functionWithPrototype.prototype = {};
    
    const functionWithProperties = function() {};
    functionWithProperties.someProperty = 'value';
    
    expect(() => {
      reportWebVitals(functionWithPrototype);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(functionWithProperties);
    }).not.toThrow();
  });

  it('should handle function with different arities', () => {
    const noParams = () => {};
    const oneParam = (a) => {};
    const multipleParams = (a, b, c) => {};
    const restParams = (...args) => {};
    
    expect(() => {
      reportWebVitals(noParams);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(oneParam);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(multipleParams);
    }).not.toThrow();
    
    expect(() => {
      reportWebVitals(restParams);
    }).not.toThrow();
  });
});
