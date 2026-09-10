/**
 * HTMXUI — Core TypeScript Definitions & Type Contracts
 * 
 * Type definitions for HTMXUI engines:
 * - HxBolt: Signal & Reactive State Engine
 * - HxFlash: In-Memory Fuzzy Search & Multi-Column Filter Engine
 * - HxForm: Declarative Validation & Form State Machine
 * - HxMotion: FLIP & Stagger Layout Animations
 * - HxA11y: WAI-ARIA Focus Trapping & Roving Tabindex
 */

declare global {
  interface Window {
    htmx?: any;
    HxBolt: HxBoltAPI;
    HxFlash: HxFlashAPI;
    HxForm?: HxFormAPI;
    HxVibe: HxVibeAPI;
    HxA11y: HxA11yAPI;
    HxSpatial?: HxSpatialAPI;
    HxVirtual?: any;
    HxGrid?: any;
    HxOffline?: any;
    HxDevTools?: any;
    HxCalc?: any;
    HTMXUI?: any;
    htmFX?: any;
  }
}

export interface HxSpatialAPI {
  mount(el: HTMLElement): void;
  focus(target: string | HTMLElement, options?: any): void;
  explode(target: string | HTMLElement, options?: any): void;
}

// -----------------------------------------------------------------------------
// HxBolt Types (Signals, State & Sparse Matrix)
// -----------------------------------------------------------------------------

export type ReactiveProxy<T extends object = Record<string, any>> = T & {
  __isProxy?: boolean;
  __raw?: T;
};

export interface ReactiveScope {
  $store: Record<string, any>;
  $refs: Record<string, HTMLElement>;
  $el: HTMLElement | null;
  $event: Event | null;
  [key: string]: any;
}

export interface TransitionPreset {
  enter: string;
  enterStart: string;
  enterEnd: string;
  leave: string;
  leaveStart: string;
  leaveEnd: string;
}

export interface ISparseMatrix<T = any> {
  rows: number;
  cols: number;
  get(row: number, col: number): T | undefined;
  set(row: number, col: number, value: T, flashClass?: string): void;
  batch(updates: Array<[number, number, T, string?]>): void;
  subscribe(row: number, col: number, callback: (val: T | undefined, flashClass?: string) => void): () => void;
  subscribeAll(callback: (row: number, col: number, val: T | undefined, flashClass?: string) => void): () => void;
  toObject(): Record<string, T>;
  clear(): void;
  size(): number;
}

export interface HxBoltAPI {
  store<T extends object = Record<string, any>>(name: string, initialValue?: T): ReactiveProxy<T>;
  getStore<T extends object = Record<string, any>>(name: string): ReactiveProxy<T> | undefined;
  getState<T extends object = Record<string, any>>(el: HTMLElement): ReactiveProxy<T> | undefined;
  matrix<T = any>(rows?: number, cols?: number, initialData?: Record<string, T> | Array<[number, number, T]>): ISparseMatrix<T>;
  streamBatch(callback: () => void, fps?: number): void;
  parseMicroDelta(deltaText: string, targetMatrix?: ISparseMatrix): Array<{ row: number; col: number; val: any; flashClass?: string }>;
  init(root: HTMLElement | Document): void;
  [key: string]: any;
}

// -----------------------------------------------------------------------------
// HxFlash Types (Fuzzy Search, Multi-Column & Columnar Store)
// -----------------------------------------------------------------------------

export interface FlashItem<T = any> {
  id: string | number;
  raw: T;
  html: string;
  _searchText: string;
  fields: Record<string, any>;
}

export interface FlashQueryParams {
  search?: string;
  filters?: Record<string, any | ((val: any, item: FlashItem) => boolean)>;
  sortField?: string | null;
  sortDir?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}

export interface FlashQueryResult<T = any> {
  total: number;
  page: number;
  limit: number;
  results: FlashItem<T>[];
}

export interface IFlashDatabase<T = any> {
  name: string;
  raw: T[];
  items: FlashItem<T>[];
  filters: Record<string, any>;
  sortField: string | null;
  sortDir: 'asc' | 'desc';
  status: 'idle' | 'loading' | 'ready' | 'error';
  load(data: T[]): void;
  query(params?: FlashQueryParams): FlashQueryResult<T>;
}

export type ColumnType = 'float64' | 'int32' | 'uint32' | 'string' | 'boolean';

export interface ColumnSchema {
  [columnName: string]: ColumnType;
}

export interface IColumnStore {
  length: number;
  capacity: number;
  addColumn(name: string, type: ColumnType, initialData?: ArrayLike<any>): void;
  get(column: string, rowIndex: number): any;
  set(column: string, rowIndex: number, value: any): void;
  filterRange(column: string, min: number, max: number): Uint32Array;
  filterEquals(column: string, value: any): Uint32Array;
  aggregate(column: string, op: 'sum' | 'avg' | 'min' | 'max' | 'count', indices?: Uint32Array | number[]): number;
  sort(column: string, dir?: 'asc' | 'desc'): Uint32Array;
  exportRow(rowIndex: number): Record<string, any>;
}

export interface HxFlashAPI {
  db<T = any>(name: string): IFlashDatabase<T>;
  load<T = any>(name: string, data: T[]): IFlashDatabase<T>;
  query<T = any>(name: string, options?: FlashQueryParams): FlashQueryResult<T>;
  createColumnStore(schema: ColumnSchema, initialCapacity?: number): IColumnStore;
}

// -----------------------------------------------------------------------------
// HxVirtual Types (1D & 2D Bi-Directional Windowing)
// -----------------------------------------------------------------------------

export interface VirtualScroll2DOptions {
  rowHeight: number | ((rowIdx: number) => number);
  colWidth: number | ((colIdx: number) => number);
  totalRows: number;
  totalCols: number;
  bufferRows?: number;
  bufferCols?: number;
  pinnedLeft?: number;
  pinnedRight?: number;
  pinnedTop?: number;
  pinnedBottom?: number;
  renderCell?: (row: number, col: number) => HTMLElement | string;
}

export interface IVirtualScroller2D {
  container: HTMLElement;
  totalRows: number;
  totalCols: number;
  update(): void;
  scrollTo(row: number, col: number): void;
  destroy(): void;
}

// -----------------------------------------------------------------------------
// HxForm Types (Validation, Transactions & Form State)
// -----------------------------------------------------------------------------

export type ValidatorFn = (value: any, param: string, form: HTMLFormElement) => boolean;

export interface FormState {
  valid: boolean;
  dirty: boolean;
  touched: Record<string, boolean>;
  errors: Record<string, string | null>;
  submitting: boolean;
}

export interface CellTransactionOptions {
  row: number;
  col: number;
  oldValue: any;
  newValue: any;
  endpoint?: string;
  headers?: Record<string, string>;
  onCommit?: (res: any) => void;
  onRollback?: (err: any) => void;
}

export interface ICellTransactionManager {
  commit(cellEl: HTMLElement | null, options: CellTransactionOptions): Promise<boolean>;
  undo(): boolean;
  redo(): boolean;
  canUndo(): boolean;
  canRedo(): boolean;
  clearHistory(): void;
}

export interface HxFormAPI {
  validators: Record<string, ValidatorFn>;
  messages: Record<string, string>;
  init(form: HTMLFormElement): void;
  cellTransaction: (cellEl: HTMLElement | null, options: CellTransactionOptions) => Promise<boolean>;
  cellTransactions: ICellTransactionManager;
}

// -----------------------------------------------------------------------------
// HxVibe Types (FLIP & Layout Animations)
// -----------------------------------------------------------------------------

export interface IFlipManager {
  positions: Map<string | HTMLElement, DOMRect>;
  record(parentEl: HTMLElement): void;
  play(parentEl: HTMLElement, duration?: number, easing?: string): void;
}

export interface HxVibeAPI {
  flip: IFlipManager;
  init(root: HTMLElement | Document): void;
}

// -----------------------------------------------------------------------------
// HxA11y Types (Accessibility & 2D Matrix Nav)
// -----------------------------------------------------------------------------

export interface CellRange {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface MatrixNavOptions {
  rows: number;
  cols: number;
  activeRow?: number;
  activeCol?: number;
  selectable?: boolean;
  onCellFocus?: (row: number, col: number, cellEl: HTMLElement | null) => void;
  onRangeSelect?: (range: CellRange) => void;
}

export interface HxA11yAPI {
  trapFocus(container: HTMLElement): () => void;
  initRovingTabindex(container: HTMLElement): void;
  initMatrixNav(container: HTMLElement, options?: Partial<MatrixNavOptions>): void;
  announce(message: string, priority?: 'polite' | 'assertive'): void;
  init(root: HTMLElement | Document): void;
}

// -----------------------------------------------------------------------------
// HxCalc Types (Zero-Dependency Reactive Formula Engine)
// -----------------------------------------------------------------------------

export interface CalcCellReference {
  row: number;
  col: number;
  label: string; // e.g., "A1"
}

export interface CalcRangeReference {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  label: string; // e.g., "A1:B10"
}

export interface ICalcEngine {
  setCell(coord: string | [number, number], rawValue: any): void;
  getCell(coord: string | [number, number]): any;
  getRaw(coord: string | [number, number]): any;
  evaluate(formula: string): any;
  recalculate(): void;
  bindMatrix(matrix: ISparseMatrix): void;
  toObject(): Record<string, any>;
  clear(): void;
}
