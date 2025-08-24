import reportWebVitals from './reportWebVitals';

// Mock web-vitals
const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

jest.mock('web-vitals', () => ({
  getCLS: mockGetCLS,
  getFID: mockGetFID,
  getFCP: mockGetFCP,
  getLCP: mockGetLCP,
  getTTFB: mockGetTTFB,
}));

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
});
