/**
 * HTMX-FLASH — In-Memory Fuzzy Search, Multi-Column Filter & Sort Engine
 * Written in TypeScript for type safety and framework extensibility.
 */

import type { FlashItem, FlashQueryParams, FlashQueryResult, IFlashDatabase, HxFlashAPI } from './types';

const databases: Record<string, FlashDatabase<any>> = {};

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function scoreMatch(text: string, query: string): number {
  if (!query) return 100;
  if (!text) return 0;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (lowerText === lowerQuery) return 1000;
  if (lowerText.startsWith(lowerQuery)) return 500;

  const words = lowerText.split(/\s+/);
  for (const w of words) {
    if (w.startsWith(lowerQuery)) return 300;
  }

  const subIdx = lowerText.indexOf(lowerQuery);
  if (subIdx !== -1) {
    return 150 - subIdx;
  }

  if (lowerQuery.length >= 3) {
    for (const w of words) {
      if (Math.abs(w.length - lowerQuery.length) <= 2) {
        const dist = levenshtein(w, lowerQuery);
        if (dist <= 1) return 80;
        if (dist === 2 && lowerQuery.length >= 5) return 40;
      }
    }
  }

  let qIdx = 0;
  let score = 0;
  for (let i = 0; i < lowerText.length && qIdx < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[qIdx]) {
      score += 5;
      qIdx++;
    }
  }
  if (qIdx === lowerQuery.length) {
    return Math.max(score, 10);
  }

  return 0;
}

export class FlashDatabase<T = any> implements IFlashDatabase<T> {
  name: string;
  raw: T[] = [];
  items: FlashItem<T>[] = [];
  filters: Record<string, any> = {};
  sortField: string | null = null;
  sortDir: 'asc' | 'desc' = 'asc';
  status: 'idle' | 'loading' | 'ready' | 'error' = 'idle';

  constructor(name: string, data: T[] = []) {
    this.name = name;
    if (data.length) this.load(data);
  }

  load(data: T[]): void {
    this.raw = data;
    this.items = data.map((item: any, idx) => {
      const searchText = item._search || (typeof item === 'object' ? Object.values(item).join(' ') : String(item));
      return {
        id: item.id !== undefined ? item.id : idx,
        raw: item,
        html: item.html || '',
        _searchText: searchText.toLowerCase(),
        fields: typeof item === 'object' ? { ...item } : {}
      };
    });
    this.status = 'ready';
  }

  query({ search = '', filters = {}, sortField = null, sortDir = 'asc', limit = 50, page = 1 }: FlashQueryParams = {}): FlashQueryResult<T> {
    const results: Array<{ item: FlashItem<T>; score: number }> = [];
    const queryTrim = (search || '').trim();

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      let filterPass = true;
      for (const [field, filterVal] of Object.entries(filters)) {
        if (filterVal === undefined || filterVal === null || filterVal === '' || filterVal === 'all') continue;
        const itemVal = item.fields[field];
        if (typeof filterVal === 'function') {
          if (!filterVal(itemVal, item)) { filterPass = false; break; }
        } else if (typeof filterVal === 'string') {
          if (String(itemVal).toLowerCase() !== filterVal.toLowerCase()) { filterPass = false; break; }
        } else if (itemVal !== filterVal) {
          filterPass = false;
          break;
        }
      }
      if (!filterPass) continue;

      let score = 1;
      if (queryTrim) {
        score = scoreMatch(item._searchText, queryTrim);
        if (score <= 0) continue;
      }

      results.push({ item, score });
    }

    if (sortField) {
      results.sort((a, b) => {
        const valA = a.item.fields[sortField];
        const valB = b.item.fields[sortField];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        const cmp = (typeof valA === 'number' && typeof valB === 'number')
          ? valA - valB
          : String(valA).localeCompare(String(valB));
        return sortDir === 'desc' ? -cmp : cmp;
      });
    } else if (queryTrim) {
      results.sort((a, b) => b.score - a.score);
    }

    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + limit);

    return {
      total,
      page,
      limit,
      results: paginated.map(r => r.item)
    };
  }
}

function getOrCreateDB<T = any>(name: string): FlashDatabase<T> {
  if (!databases[name]) {
    databases[name] = new FlashDatabase<T>(name);
  }
  return databases[name];
}

function executeSearch(config: any): void {
  const { dbName, targetEl, emptyHtml, limit, query, filters, sortField, sortDir } = config;
  const db = databases[dbName];
  if (!db || db.status !== 'ready') return;

  const { results, total } = db.query({
    search: query,
    filters: filters || {},
    sortField: sortField || db.sortField,
    sortDir: sortDir || db.sortDir,
    limit: limit || 50
  });

  if (results.length === 0) {
    targetEl.innerHTML = emptyHtml || '<tr><td colspan="100%" class="p-4 text-center text-muted-foreground text-sm">No matching records found.</td></tr>';
  } else {
    let htmlStr = '';
    for (let i = 0; i < results.length; i++) {
      htmlStr += results[i].html;
    }
    targetEl.innerHTML = htmlStr;
  }

  targetEl.dispatchEvent(new CustomEvent('flash:updated', {
    bubbles: true,
    detail: { total, renderedCount: results.length, dbName }
  }));
}

export const HxFlash: HxFlashAPI = {
  db<T = any>(name: string): IFlashDatabase<T> {
    return getOrCreateDB<T>(name);
  },
  load<T = any>(name: string, data: T[]): IFlashDatabase<T> {
    const db = getOrCreateDB<T>(name);
    db.load(data);
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('flash:ready', { detail: { dbName: name } }));
    }
    return db;
  },
  query<T = any>(name: string, options?: FlashQueryParams): FlashQueryResult<T> {
    const db = getOrCreateDB<T>(name);
    return db.query(options);
  }
};

if (typeof window !== 'undefined') {
  window.HxFlash = HxFlash;

  if (typeof (window as any).htmx !== 'undefined') {
    (window as any).htmx.defineExtension('flash', {
      onEvent: function (name: string, evt: any) {
        if (name === "htmx:afterProcessNode") {
          const elt = evt.detail.elt as HTMLElement;

          if (elt.hasAttribute && elt.hasAttribute('hx-flash-src')) {
            const src = elt.getAttribute('hx-flash-src')!;
            const dbName = elt.getAttribute('hx-flash-db') || 'default';
            const db = getOrCreateDB(dbName);

            if (db.status === 'idle') {
              db.status = 'loading';
              fetch(src)
                .then(res => res.json())
                .then(data => {
                  db.load(data);
                  console.log(`[htmx-flash] ⚡ Indexed ${data.length} records in-memory for DB: '${dbName}'`);
                  elt.dispatchEvent(new CustomEvent('flash:ready', { bubbles: true, detail: { dbName } }));
                })
                .catch(err => {
                  console.error(`[htmx-flash] Failed to fetch data from ${src}:`, err);
                  db.status = 'error';
                });
            }
          }

          if (elt.tagName === "INPUT" && elt.hasAttribute('hx-flash-search')) {
            const dbName = elt.getAttribute('hx-flash-db') || 'default';
            const targetSel = elt.getAttribute('hx-target')!;
            const limit = parseInt(elt.getAttribute('hx-flash-limit') || "50", 10);
            const emptyHtml = elt.getAttribute('hx-flash-empty');

            elt.addEventListener('input', (e: any) => {
              const target = document.querySelector(targetSel);
              if (!target) return;

              const query = e.target.value;
              executeSearch({
                dbName,
                targetEl: target,
                emptyHtml,
                limit,
                query
              });
            });
          }

          if (elt.hasAttribute && elt.hasAttribute('hx-flash-filter')) {
            const field = elt.getAttribute('hx-flash-filter')!;
            const dbName = elt.getAttribute('hx-flash-db') || 'default';
            const targetSel = elt.getAttribute('hx-target')!;

            elt.addEventListener('change', (e: any) => {
              const target = document.querySelector(targetSel);
              if (!target) return;

              const db = getOrCreateDB(dbName);
              db.filters[field] = e.target.value;

              executeSearch({
                dbName,
                targetEl: target,
                filters: db.filters
              });
            });
          }

          if (elt.hasAttribute && elt.hasAttribute('hx-flash-sort')) {
            const field = elt.getAttribute('hx-flash-sort')!;
            const dbName = elt.getAttribute('hx-flash-db') || 'default';
            const targetSel = elt.getAttribute('hx-target')!;

            elt.style.cursor = 'pointer';
            elt.addEventListener('click', () => {
              const target = document.querySelector(targetSel);
              if (!target) return;

              const db = getOrCreateDB(dbName);
              if (db.sortField === field) {
                db.sortDir = db.sortDir === 'asc' ? 'desc' : 'asc';
              } else {
                db.sortField = field;
                db.sortDir = 'asc';
              }

              executeSearch({
                dbName,
                targetEl: target,
                sortField: db.sortField,
                sortDir: db.sortDir,
                filters: db.filters
              });
            });
          }
        }
      }
    });
  }
}
