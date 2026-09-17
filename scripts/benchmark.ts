import { gzipSync } from 'zlib';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { 
  safeEvaluate, 
  safeExecuteAction, 
  HxBolt, 
  SparseMatrix 
} from '../src/index';
import { ColumnStore } from '../src/htmx-flash';
import { CalcEngine } from '../src/htmx-calc';

console.log('===============================================================');
console.log('  HTMXUI AUTOMATED PERFORMANCE & BENCHMARK SUITE');
console.log('===============================================================\n');

// 1. Bundle Size & Gzip Analysis
console.log('1. MICRO-ENGINE BUNDLE SIZES (GZIPPED & RAW):');
console.log('---------------------------------------------------------------');
const engines = [
  'htmx-bolt.js',
  'htmx-flash.js',
  'htmx-vibe.js',
  'htmx-calc.js',
  'htmx-form.js',
  'htmx-grid.js',
  'htmx-virtual.js',
  'htmx-offline.js',
  'htmx-a11y.js',
  'htmx-devtools.js',
  'htmx-sim.js'
];

let totalRaw = 0;
let totalGzip = 0;

engines.forEach(file => {
  const p = join(__dirname, '../public', file);
  if (existsSync(p)) {
    const raw = readFileSync(p);
    const gz = gzipSync(raw);
    totalRaw += raw.length;
    totalGzip += gz.length;
    console.log('  - ' + file.padEnd(20) + ': ' + (raw.length / 1024).toFixed(2).padStart(6) + ' KB raw | ' + (gz.length / 1024).toFixed(2).padStart(6) + ' KB gzip');
  }
});
console.log('---------------------------------------------------------------');
console.log('  TOTAL 11-ENGINE SUITE: ' + (totalRaw / 1024).toFixed(2).padStart(6) + ' KB raw | ' + (totalGzip / 1024).toFixed(2).padStart(6) + ' KB gzip');
console.log('  (Comparison: react-dom alone is ~130KB raw / ~42KB gzip)\n');

// 2. Zero-Eval Safe Parser Throughput
console.log('2. ZERO-EVAL PARSER & CLOSURE THROUGHPUT:');
console.log('---------------------------------------------------------------');
const testState = {
  items: [
    { id: 1, name: 'Item A', price: 150, qty: 2 },
    { id: 2, name: 'Item B', price: 75, qty: 4 },
    { id: 3, name: 'Item C', price: 300, qty: 1 }
  ],
  taxRate: 0.1,
  discount: 25
};

const iterations = 10000;
const startEval = performance.now();
for (let i = 0; i < iterations; i++) {
  safeEvaluate('items.reduce((sum, i) => sum + (i.price * i.qty), 0) * (1 + taxRate) - discount', testState);
}
const elapsedEval = performance.now() - startEval;
const opsPerSec = Math.round((iterations / elapsedEval) * 1000);
console.log('  - 10,000 Complex Reduce + Arithmetic Expressions: ' + elapsedEval.toFixed(2) + ' ms');
console.log('  - Throughput: ' + opsPerSec.toLocaleString() + ' ops/sec\n');

// 3. 2D Sparse Matrix O(1) Signal Cell Mutations
console.log('3. ATOMIC 2D SPARSE MATRIX (10,000 CELL MUTATIONS):');
console.log('---------------------------------------------------------------');
const matrix = new SparseMatrix(10000, 100);
const startMatrix = performance.now();
for (let r = 0; r < 100; r++) {
  for (let c = 0; c < 100; c++) {
    matrix.set(r, c, (r * 100 + c) * 1.5);
  }
}
const elapsedMatrix = performance.now() - startMatrix;
const matrixOpsSec = Math.round((10000 / elapsedMatrix) * 1000);
console.log('  - 10,000 Coordinate Cell Writes (O(1)): ' + elapsedMatrix.toFixed(2) + ' ms');
console.log('  - Throughput: ' + matrixOpsSec.toLocaleString() + ' writes/sec\n');

// 4. Memory Footprint (RAM)
console.log('4. HEAP MEMORY FOOTPRINT:');
console.log('---------------------------------------------------------------');
const memBefore = process.memoryUsage().heapUsed;
const memoryStore = HxBolt.matrix(50000, 50);
for (let i = 0; i < 20000; i++) {
  memoryStore.set(i % 1000, Math.floor(i / 1000), { value: i, timestamp: Date.now() });
}
const memAfter = process.memoryUsage().heapUsed;
const memDeltaKB = Math.round((memAfter - memBefore) / 1024);
console.log('  - Heap allocation for 20,000 sparse signal cells: ' + memDeltaKB + ' KB');
console.log('  - Average memory per cell: ' + (memDeltaKB / 20).toFixed(2) + ' bytes\n');

// 5. Columnar Store Search (TypedArray Indexing)
console.log('5. TYPEDARRAY COLUMNAR IN-MEMORY SEARCH (10,000 ROWS):');
console.log('---------------------------------------------------------------');
const colStore = new ColumnStore();
const prices = new Float64Array(10000);
const stock = new Int32Array(10000);
for (let i = 0; i < 10000; i++) {
  prices[i] = (i % 500) * 1.25;
  stock[i] = i % 50;
}
colStore.addColumn('price', 'float64', prices);
colStore.addColumn('stock', 'int32', stock);

const startSearch = performance.now();
let matchCount = 0;
for (let s = 0; s < 1000; s++) {
  const matches = colStore.filterRange('price', 100, 300);
  matchCount = matches.length;
}
const elapsedSearch = performance.now() - startSearch;
console.log('  - 1,000 Range Filter Queries across 10,000 rows: ' + elapsedSearch.toFixed(2) + ' ms');
console.log('  - Average query latency: ' + (elapsedSearch / 1000).toFixed(4) + ' ms');
console.log('  - Matched items per query: ' + matchCount + '\n');

// 6. Kahn's Formula DAG Topological Sort
console.log('6. KAHN DAG TOPOLOGICAL SORT (500 INTERLINKED FORMULAS):');
console.log('---------------------------------------------------------------');
const calc = new CalcEngine();
for (let i = 0; i < 500; i++) {
  if (i === 0) {
    calc.setCell('A1', '100');
  } else {
    calc.setCell('A' + (i + 1), '=A' + i + ' * 1.05');
  }
}
const startCalc = performance.now();
const finalVal = calc.getCell('A500');
const elapsedCalc = performance.now() - startCalc;
console.log('  - Evaluated 500-level deep dependency cascade: ' + elapsedCalc.toFixed(2) + ' ms');
console.log('  - Final computed result (A500): ' + (typeof finalVal === 'number' ? finalVal.toFixed(2) : finalVal) + '\n');

console.log('===============================================================');
console.log('  ALL BENCHMARKS COMPLETED SUCCESSFULLY');
console.log('===============================================================\n');
