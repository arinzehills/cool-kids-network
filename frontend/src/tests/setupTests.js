// Add custom Jest matchers for DOM manipulation
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Mock IntersectionObserver for components relying on it
class IntersectionObserver {
  constructor(callback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserver;

// Mock ResizeObserver if required
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Set custom global variables
global.APP_CONFIG = {
  apiUrl: "http://localhost:8000",
  environment: "test",
};
