import { describe, test, expect } from 'bun:test';
import { FlashDatabase } from '../src/htmx-flash';

describe('HxFlash In-Memory Search Engine', () => {
  const sampleData = [
    { id: 1, name: 'MacBook Pro 16', category: 'Laptops', price: 2499 },
    { id: 2, name: 'Dell XPS 15', category: 'Laptops', price: 1899 },
    { id: 3, name: 'Sony WH-1000XM5', category: 'Audio', price: 399 },
    { id: 4, name: 'Keychron Q1 Pro', category: 'Keyboards', price: 199 }
  ];

  test('exact search', () => {
    const db = new FlashDatabase('products', sampleData);
    const res = db.query({ search: 'Sony' });
    expect(res.total).toBe(1);
    expect(res.results[0].raw.name).toBe('Sony WH-1000XM5');
  });

  test('fuzzy search with typo tolerance', () => {
    const db = new FlashDatabase('products', sampleData);
    const res = db.query({ search: 'Macbok' }); // typo
    expect(res.total).toBeGreaterThan(0);
    expect(res.results[0].raw.name).toBe('MacBook Pro 16');
  });

  test('multi-column filter', () => {
    const db = new FlashDatabase('products', sampleData);
    const res = db.query({ filters: { category: 'Laptops' } });
    expect(res.total).toBe(2);
  });

  test('sorting', () => {
    const db = new FlashDatabase('products', sampleData);
    const res = db.query({ sortField: 'price', sortDir: 'asc' });
    expect(res.results[0].raw.price).toBe(199);
    expect(res.results[res.results.length - 1].raw.price).toBe(2499);
  });
});
