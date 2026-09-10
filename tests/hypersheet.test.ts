import { describe, it, expect } from "bun:test";
import { HxBolt, SparseMatrix, streamBatch, parseMicroDelta, runWithEffect } from "../src/htmx-bolt";
import { HxFlash, ColumnStore } from "../src/htmx-flash";
import { VirtualScroller2D } from "../src/htmx-virtual";
import { initMatrixNav } from "../src/htmx-a11y";
import { cellTransaction, cellTransactions } from "../src/htmx-form";
import { HxCalc, CalcEngine, cellToCoords, coordsToCell, expandRange } from "../src/htmx-calc";

// Mock DOM elements for Bun test environment
class MockClassList {
  private set = new Set<string>();
  add(...classes: string[]) { for (const c of classes) this.set.add(c); }
  remove(...classes: string[]) { for (const c of classes) this.set.delete(c); }
  contains(c: string) { return this.set.has(c); }
  toggle(c: string) { if (this.set.has(c)) this.set.delete(c); else this.set.add(c); }
}

class MockHTMLElement {
  tagName = "DIV";
  style: Record<string, string> = {};
  attributes = new Map<string, string>();
  classList = new MockClassList();
  children: MockHTMLElement[] = [];
  parentNode: MockHTMLElement | null = null;
  textContent = "";
  value = "";
  scrollTop = 0;
  scrollLeft = 0;
  clientHeight = 400;
  clientWidth = 800;
  private listeners = new Map<string, Function[]>();

  constructor(tagName = "DIV") {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, val: string) {
    this.attributes.set(name, String(val));
  }
  getAttribute(name: string) {
    return this.attributes.get(name) || null;
  }
  hasAttribute(name: string) {
    return this.attributes.has(name);
  }
  removeAttribute(name: string) {
    this.attributes.delete(name);
  }
  appendChild(child: any) {
    if (child && child.nodeType === 11) {
      for (const ch of child.children) {
        this.children.push(ch);
        ch.parentNode = this;
      }
    } else if (child) {
      this.children.push(child);
      child.parentNode = this;
    }
    return child;
  }
  addEventListener(evt: string, cb: Function) {
    if (!this.listeners.has(evt)) this.listeners.set(evt, []);
    this.listeners.get(evt)!.push(cb);
  }
  dispatchEvent(event: any) {
    const list = this.listeners.get(event.type || event);
    if (list) {
      for (const cb of list) cb(event);
    }
    return true;
  }
  focus() {}
  querySelector(sel: string): any {
    for (const ch of this.children) {
      if (ch.tagName === sel.toUpperCase()) return ch;
      const found = ch.querySelector(sel);
      if (found) return found;
    }
    return null;
  }
  querySelectorAll(sel: string): any[] {
    const res: any[] = [];
    for (const ch of this.children) {
      res.push(ch);
      res.push(...ch.querySelectorAll(sel));
    }
    return res;
  }
  get innerHTML() {
    return this.textContent;
  }
  set innerHTML(val: string) {
    this.textContent = val;
    this.children = [];
  }
}

if (typeof globalThis.document === "undefined") {
  (globalThis as any).document = {
    createElement: (tag: string) => new MockHTMLElement(tag),
    createDocumentFragment: () => {
      const frag = new MockHTMLElement("FRAGMENT");
      (frag as any).nodeType = 11;
      return frag;
    },
    addEventListener: () => {},
    dispatchEvent: () => {}
  };
}

describe("1. HxBolt: Atomic 2D Sparse Matrix Signals", () => {
  it("creates a sparse matrix and reads/writes cell values in O(1) time", () => {
    const matrix = HxBolt.matrix(100000, 16384);
    matrix.set(42, 10, 1337.5);
    matrix.set(99999, 500, "Hyperlibs");

    expect(matrix.get(42, 10)).toBe(1337.5);
    expect(matrix.get(99999, 500)).toBe("Hyperlibs");
    expect(matrix.get(0, 0)).toBeUndefined();
    expect(matrix.size()).toBe(2);
  });

  it("triggers fine-grained signal subscriptions on mutated cell only", async () => {
    const matrix = new SparseMatrix();
    let cellAValue: any;
    let cellBValue: any;
    let cellARuns = 0;
    let cellBRuns = 0;

    runWithEffect(() => {
      cellARuns++;
      cellAValue = matrix.get(0, 0);
    });

    runWithEffect(() => {
      cellBRuns++;
      cellBValue = matrix.get(1, 1);
    });

    expect(cellARuns).toBe(1);
    expect(cellBRuns).toBe(1);

    // Mutate cell (0, 0) only
    matrix.set(0, 0, 999);
    await new Promise(r => queueMicrotask(r));

    expect(cellAValue).toBe(999);
    expect(cellARuns).toBe(2);
    // Cell B should NOT have re-evaluated
    expect(cellBRuns).toBe(1);
  });

  it("supports atomic multi-cell batch updates and cell subscriber callbacks", () => {
    const matrix = new SparseMatrix();
    let notificationVal: any = null;
    let flashCls: string | undefined;

    const unsubscribe = matrix.subscribe(5, 5, (val, flash) => {
      notificationVal = val;
      flashCls = flash;
    });

    matrix.batch([
      [1, 1, 10],
      [2, 2, 20],
      [5, 5, 50, "hs-flash-green"]
    ]);

    expect(matrix.get(1, 1)).toBe(10);
    expect(matrix.get(2, 2)).toBe(20);
    expect(matrix.get(5, 5)).toBe(50);
    expect(notificationVal).toBe(50);
    expect(flashCls).toBe("hs-flash-green");

    unsubscribe();
    matrix.set(5, 5, 100);
    expect(notificationVal).toBe(50); // Unsubscribed
  });
});

describe("2. HxBolt: 60fps RAF Stream Batching", () => {
  it("queues rapid stream updates and flushes via streamBatch", async () => {
    let executed = 0;
    streamBatch(() => { executed++; }, 60);
    streamBatch(() => { executed++; }, 60);
    streamBatch(() => { executed++; }, 60);

    // Wait for microtask/timer
    await new Promise(r => setTimeout(r, 40));
    expect(executed).toBeGreaterThan(0);
  });
});

describe("3. HxVirtual 2D: Bi-Directional Windowing with Pinned Columns", () => {
  it("initializes 2D virtual scroller with row and column dimensions", () => {
    const container = document.createElement("div") as any;
    container.style.width = "800px";
    container.style.height = "400px";

    const scroller = new VirtualScroller2D(container, {
      totalRows: 100000,
      totalCols: 1000,
      rowHeight: 30,
      colWidth: 100,
      pinnedLeft: 2,
      pinnedRight: 1
    });

    expect(scroller.totalRows).toBe(100000);
    expect(scroller.totalCols).toBe(1000);
    expect(scroller.pinnedLeft).toBe(2);
    expect(scroller.pinnedRight).toBe(1);

    scroller.scrollTo(100, 50);
    expect(container.scrollTop).toBe(3000);
    expect(container.scrollLeft).toBe(5000);
  });
});

describe("4. HxFlash: Columnar Store & TypedArray Queries", () => {
  it("creates TypedArray column store and performs sub-millisecond range filters", () => {
    const store = HxFlash.createColumnStore({
      id: "int32",
      price: "float64",
      active: "boolean"
    }, 1000);

    // Populate 1,000 rows
    for (let i = 0; i < 1000; i++) {
      store.set("id", i, i + 1);
      store.set("price", i, (i * 1.5));
      store.set("active", i, i % 2 === 0);
    }

    expect(store.length).toBe(1000);
    expect(store.get("price", 10)).toBe(15);
    expect(store.get("active", 2)).toBe(true);
    expect(store.get("active", 3)).toBe(false);

    // Filter price in range [100, 200]
    const matching = store.filterRange("price", 100, 200);
    expect(matching.length).toBeGreaterThan(0);
    for (let j = 0; j < matching.length; j++) {
      const idx = matching[j];
      const p = store.get("price", idx);
      expect(p).toBeGreaterThanOrEqual(100);
      expect(p).toBeLessThanOrEqual(200);
    }

    // Aggregations
    const sumPrice = store.aggregate("price", "sum", matching);
    const avgPrice = store.aggregate("price", "avg", matching);
    const minPrice = store.aggregate("price", "min", matching);
    const maxPrice = store.aggregate("price", "max", matching);

    expect(sumPrice).toBeGreaterThan(0);
    expect(avgPrice).toBeGreaterThanOrEqual(minPrice);
    expect(maxPrice).toBeGreaterThanOrEqual(avgPrice);
  });

  it("sorts columnar data with TypedArray indices", () => {
    const store = new ColumnStore({ val: "float64" }, 5);
    store.set("val", 0, 50);
    store.set("val", 1, 10);
    store.set("val", 2, 90);
    store.set("val", 3, 30);
    store.set("val", 4, 70);

    const ascIndices = store.sort("val", "asc");
    expect(Array.from(ascIndices)).toEqual([1, 3, 0, 4, 2]);

    const descIndices = store.sort("val", "desc");
    expect(Array.from(descIndices)).toEqual([2, 4, 0, 3, 1]);
  });
});

describe("5. HxA11y: 2D Matrix Navigation & Excel Range Selection", () => {
  it("initializes 2D roving navigation and fires range select event", () => {
    const container = document.createElement("div") as any;
    let selectedRange: any = null;

    initMatrixNav(container, {
      rows: 10,
      cols: 10,
      onRangeSelect: (range) => {
        selectedRange = range;
      }
    });

    expect(selectedRange).not.toBeNull();
    expect(selectedRange.startRow).toBe(0);
    expect(selectedRange.startCol).toBe(0);
  });
});

describe("6. HxForm: Cell Transaction Engine & Undo/Redo", () => {
  it("commits optimistic cell transaction and tracks undo/redo stack", async () => {
    const cellEl = document.createElement("div") as any;
    cellEl.textContent = "Old Value";

    const committed = await cellTransaction(cellEl, {
      row: 5,
      col: 2,
      oldValue: "Old Value",
      newValue: "New Value"
    });

    expect(committed).toBe(true);
    expect(cellEl.textContent).toBe("New Value");
    expect(cellTransactions.canUndo()).toBe(true);

    // Undo
    const undone = cellTransactions.undo();
    expect(undone).toBe(true);
    expect(cellEl.textContent).toBe("Old Value");
    expect(cellTransactions.canRedo()).toBe(true);

    // Redo
    const redone = cellTransactions.redo();
    expect(redone).toBe(true);
    expect(cellEl.textContent).toBe("New Value");
  });
});

describe("7. HyperStream: Micro-Delta Protocol", () => {
  it("parses delta stream strings (Δrow:col:val:flashClass) into sparse matrix", () => {
    const matrix = HxBolt.matrix();
    const streamPayload = `
      Δ0:0:AAPL:hs-flash-green
      Δ0:1:242.80:hs-flash-green
      Δ1:0:TSLA:hs-flash-red
      Δ1:1:198.40:hs-flash-red
    `;

    const deltas = parseMicroDelta(streamPayload, matrix);
    expect(deltas.length).toBe(4);
    expect(matrix.get(0, 0)).toBe("AAPL");
    expect(matrix.get(0, 1)).toBe(242.8);
    expect(matrix.get(1, 0)).toBe("TSLA");
    expect(matrix.get(1, 1)).toBe(198.4);
  });
});

describe("8. HxCalc: Reactive Formula Engine with Topological DAG", () => {
  it("converts coordinates and expands ranges correctly", () => {
    expect(cellToCoords("A1")).toEqual([0, 0]);
    expect(cellToCoords("B3")).toEqual([2, 1]);
    expect(cellToCoords("Z100")).toEqual([99, 25]);
    expect(coordsToCell(0, 0)).toBe("A1");
    expect(coordsToCell(2, 1)).toBe("B3");

    const range = expandRange("A1:B2");
    expect(range).toEqual(["A1", "B1", "A2", "B2"]);
  });

  it("evaluates arithmetic expressions and standard spreadsheet functions", () => {
    const engine = HxCalc.createEngine();
    engine.setCell("A1", 10);
    engine.setCell("A2", 20);
    engine.setCell("A3", 30);
    engine.setCell("B1", "=SUM(A1:A3)");
    engine.setCell("B2", "=AVERAGE(A1:A3)");
    engine.setCell("B3", "=A1 * 2 + A2");

    expect(engine.getCell("B1")).toBe(60);
    expect(engine.getCell("B2")).toBe(20);
    expect(engine.getCell("B3")).toBe(40);

    // Mutating A1 should topologically trigger recalculation of B1, B2, B3
    engine.setCell("A1", 50);
    expect(engine.getCell("B1")).toBe(100);
    expect(engine.getCell("B2")).toBe(33.333333333333336);
    expect(engine.getCell("B3")).toBe(120);
  });

  it("detects circular dependencies and reports #CYCLE!", () => {
    const engine = HxCalc.createEngine();
    engine.setCell("A1", "=B1 + 1");
    engine.setCell("B1", "=A1 + 1");

    expect(engine.getCell("A1")).toBe("#CYCLE!");
    expect(engine.getCell("B1")).toBe("#CYCLE!");
  });
});
