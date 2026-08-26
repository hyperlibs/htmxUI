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
    HxVirtual?: any;
    HxGrid?: any;
  }
}

// -----------------------------------------------------------------------------
// HxBolt Types (Signals & State)
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

export interface HxBoltAPI {
  store<T extends object = Record<string, any>>(name: string, initialValue?: T): ReactiveProxy<T>;
  getStore<T extends object = Record<string, any>>(name: string): ReactiveProxy<T> | undefined;
  getState<T extends object = Record<string, any>>(el: HTMLElement): ReactiveProxy<T> | undefined;
  init(root: HTMLElement | Document): void;
}

// -----------------------------------------------------------------------------
// HxFlash Types (Fuzzy Search & Multi-Column Filters)
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

export interface HxFlashAPI {
  db<T = any>(name: string): IFlashDatabase<T>;
  load<T = any>(name: string, data: T[]): IFlashDatabase<T>;
  query<T = any>(name: string, options?: FlashQueryParams): FlashQueryResult<T>;
}

// -----------------------------------------------------------------------------
// HxForm Types (Validation & Form State)
// -----------------------------------------------------------------------------

export type ValidatorFn = (value: any, param: string, form: HTMLFormElement) => boolean;

export interface FormState {
  valid: boolean;
  dirty: boolean;
  touched: Record<string, boolean>;
  errors: Record<string, string | null>;
  submitting: boolean;
}

export interface HxFormAPI {
  validators: Record<string, ValidatorFn>;
  messages: Record<string, string>;
  init(form: HTMLFormElement): void;
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
// HxA11y Types (Accessibility & Focus)
// -----------------------------------------------------------------------------

export interface HxA11yAPI {
  trapFocus(container: HTMLElement): () => void;
  initRovingTabindex(container: HTMLElement): void;
  announce(message: string, priority?: 'polite' | 'assertive'): void;
  init(root: HTMLElement | Document): void;
}
