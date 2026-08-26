import { describe, test, expect } from 'bun:test';
import { defaultValidators } from '../src/htmx-form';

describe('HxForm Validation Engine', () => {
  test('required validator', () => {
    expect(defaultValidators.required('hello')).toBe(true);
    expect(defaultValidators.required('')).toBe(false);
    expect(defaultValidators.required('   ')).toBe(false);
    expect(defaultValidators.required(null)).toBe(false);
    expect(defaultValidators.required(['item'])).toBe(true);
    expect(defaultValidators.required([])).toBe(false);
  });

  test('email validator', () => {
    expect(defaultValidators.email('admin@company.com')).toBe(true);
    expect(defaultValidators.email('invalid-email')).toBe(false);
    expect(defaultValidators.email('')).toBe(true); // empty values defer to required
  });

  test('min & max validator', () => {
    expect(defaultValidators.min('hello', '3')).toBe(true);
    expect(defaultValidators.min('hi', '3')).toBe(false);
    expect(defaultValidators.max('hello', '10')).toBe(true);
    expect(defaultValidators.max('superlongstring', '5')).toBe(false);
  });

  test('numeric validator', () => {
    expect(defaultValidators.numeric('123')).toBe(true);
    expect(defaultValidators.numeric('-45.67')).toBe(true);
    expect(defaultValidators.numeric('abc')).toBe(false);
  });
});
