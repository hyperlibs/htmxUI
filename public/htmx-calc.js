// src/htmx-calc.ts
function cellToCoords(cell) {
  const match = cell.trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
  if (!match)
    return [0, 0];
  const colLetters = match[1];
  const rowNum = parseInt(match[2], 10) - 1;
  let colNum = 0;
  for (let i = 0;i < colLetters.length; i++) {
    colNum = colNum * 26 + (colLetters.charCodeAt(i) - 64);
  }
  return [rowNum, colNum - 1];
}
function coordsToCell(row, col) {
  let colStr = "";
  let c = col + 1;
  while (c > 0) {
    const rem = (c - 1) % 26;
    colStr = String.fromCharCode(65 + rem) + colStr;
    c = Math.floor((c - 1) / 26);
  }
  return `${colStr}${row + 1}`;
}
function expandRange(rangeStr) {
  const parts = rangeStr.trim().toUpperCase().split(":");
  if (parts.length !== 2)
    return [rangeStr.trim().toUpperCase()];
  const [startRow, startCol] = cellToCoords(parts[0]);
  const [endRow, endCol] = cellToCoords(parts[1]);
  const minR = Math.min(startRow, endRow);
  const maxR = Math.max(startRow, endRow);
  const minC = Math.min(startCol, endCol);
  const maxC = Math.max(startCol, endCol);
  const cells = [];
  for (let r = minR;r <= maxR; r++) {
    for (let c = minC;c <= maxC; c++) {
      cells.push(coordsToCell(r, c));
    }
  }
  return cells;
}

class CalcEngine {
  rawCells = new Map;
  computedCells = new Map;
  dependencies = new Map;
  dependents = new Map;
  boundMatrix = null;
  setCell(coord, rawValue) {
    const cellKey = typeof coord === "string" ? coord.trim().toUpperCase() : coordsToCell(coord[0], coord[1]);
    this.rawCells.set(cellKey, rawValue);
    const oldDeps = this.dependencies.get(cellKey);
    if (oldDeps) {
      for (const dep of oldDeps) {
        this.dependents.get(dep)?.delete(cellKey);
      }
      this.dependencies.delete(cellKey);
    }
    if (typeof rawValue === "string" && rawValue.startsWith("=")) {
      const deps = this.extractDependencies(rawValue.slice(1));
      this.dependencies.set(cellKey, deps);
      for (const dep of deps) {
        if (!this.dependents.has(dep))
          this.dependents.set(dep, new Set);
        this.dependents.get(dep).add(cellKey);
      }
    }
    this.recalculateCell(cellKey);
  }
  getCell(coord) {
    const cellKey = typeof coord === "string" ? coord.trim().toUpperCase() : coordsToCell(coord[0], coord[1]);
    return this.computedCells.get(cellKey);
  }
  getRaw(coord) {
    const cellKey = typeof coord === "string" ? coord.trim().toUpperCase() : coordsToCell(coord[0], coord[1]);
    return this.rawCells.get(cellKey);
  }
  extractDependencies(expr) {
    const deps = new Set;
    const expanded = expr.replace(/([A-Z]+\d+):([A-Z]+\d+)/gi, (m) => expandRange(m).join(" "));
    const cellRegex = /\b([A-Z]+)(\d+)\b/gi;
    let match;
    while ((match = cellRegex.exec(expanded)) !== null) {
      deps.add(match[0].toUpperCase());
    }
    return deps;
  }
  evaluate(formula) {
    if (!formula.startsWith("=")) {
      const num = Number(formula);
      return !isNaN(num) && formula.trim() !== "" ? num : formula;
    }
    let expr = formula.slice(1).trim();
    expr = expr.replace(/([A-Z]+\d+):([A-Z]+\d+)/gi, (m) => {
      return expandRange(m).join(", ");
    });
    const fnScope = {
      SUM: (...args) => args.flat(Infinity).reduce((acc, v) => acc + (Number(v) || 0), 0),
      AVERAGE: (...args) => {
        const flat = args.flat(Infinity).map(Number).filter((n) => !isNaN(n));
        return flat.length ? flat.reduce((a, b) => a + b, 0) / flat.length : 0;
      },
      AVG: (...args) => {
        const flat = args.flat(Infinity).map(Number).filter((n) => !isNaN(n));
        return flat.length ? flat.reduce((a, b) => a + b, 0) / flat.length : 0;
      },
      MIN: (...args) => Math.min(...args.flat(Infinity).map(Number).filter((n) => !isNaN(n))),
      MAX: (...args) => Math.max(...args.flat(Infinity).map(Number).filter((n) => !isNaN(n))),
      COUNT: (...args) => args.flat(Infinity).filter((v) => v !== undefined && v !== null && v !== "").length,
      PRODUCT: (...args) => args.flat(Infinity).reduce((acc, v) => acc * (Number(v) || 0), 1),
      MEDIAN: (...args) => {
        const flat = args.flat(Infinity).map(Number).filter((n) => !isNaN(n)).sort((a, b) => a - b);
        if (!flat.length)
          return 0;
        const mid = Math.floor(flat.length / 2);
        return flat.length % 2 !== 0 ? flat[mid] : (flat[mid - 1] + flat[mid]) / 2;
      },
      ROUND: (val, dec = 0) => {
        const p = Math.pow(10, dec);
        return Math.round(Number(val) * p) / p;
      },
      ABS: (val) => Math.abs(Number(val) || 0),
      SQRT: (val) => Math.sqrt(Number(val) || 0),
      POWER: (base, exp) => Math.pow(Number(base) || 0, Number(exp) || 0),
      IF: (cond, trueVal, falseVal) => cond ? trueVal : falseVal,
      CONCAT: (...args) => args.flat(Infinity).join("")
    };
    const cellRefs = this.extractDependencies(expr);
    const resolvedValues = {};
    for (const ref of cellRefs) {
      if (this.computedCells.has(ref)) {
        const val = this.computedCells.get(ref);
        if (val === "#CYCLE!" || val === "#ERROR!")
          return val;
        resolvedValues[ref] = typeof val === "number" ? val : Number(val) || 0;
      } else if (this.rawCells.has(ref)) {
        const raw = this.rawCells.get(ref);
        const val = typeof raw === "string" && raw.startsWith("=") ? this.evaluate(raw) : Number(raw) || 0;
        resolvedValues[ref] = val;
      } else {
        resolvedValues[ref] = 0;
      }
    }
    try {
      const scopeKeys = [...Object.keys(fnScope), ...Object.keys(resolvedValues)];
      const scopeVals = [...Object.values(fnScope), ...Object.values(resolvedValues)];
      const fn = new Function(...scopeKeys, `return (${expr})`);
      return fn(...scopeVals);
    } catch (e) {
      return "#ERROR!";
    }
  }
  detectCycle(startCell) {
    const visited = new Set;
    const recStack = new Set;
    const check = (node) => {
      visited.add(node);
      recStack.add(node);
      const neighbors = this.dependencies.get(node);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            if (check(neighbor))
              return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }
      recStack.delete(node);
      return false;
    };
    return check(startCell);
  }
  recalculateCell(startCell) {
    if (this.detectCycle(startCell)) {
      this.computedCells.set(startCell, "#CYCLE!");
      this.syncMatrixCell(startCell, "#CYCLE!");
      const dependents = this.getAllDependents(startCell);
      for (const d of dependents) {
        this.computedCells.set(d, "#CYCLE!");
        this.syncMatrixCell(d, "#CYCLE!");
      }
      return;
    }
    const raw = this.rawCells.get(startCell);
    let computed;
    if (typeof raw === "string" && raw.startsWith("=")) {
      computed = this.evaluate(raw);
    } else {
      const num = Number(raw);
      computed = !isNaN(num) && String(raw).trim() !== "" ? num : raw;
    }
    this.computedCells.set(startCell, computed);
    this.syncMatrixCell(startCell, computed);
    const order = this.getTopologicalOrder(startCell);
    for (const cell of order) {
      if (cell === startCell)
        continue;
      const cellRaw = this.rawCells.get(cell);
      let cellComputed;
      if (typeof cellRaw === "string" && cellRaw.startsWith("=")) {
        cellComputed = this.evaluate(cellRaw);
      } else {
        const num = Number(cellRaw);
        cellComputed = !isNaN(num) && String(cellRaw).trim() !== "" ? num : cellRaw;
      }
      this.computedCells.set(cell, cellComputed);
      this.syncMatrixCell(cell, cellComputed);
    }
  }
  getAllDependents(startCell) {
    const result = new Set;
    const queue = [startCell];
    while (queue.length > 0) {
      const curr = queue.shift();
      const deps = this.dependents.get(curr);
      if (deps) {
        for (const d of deps) {
          if (!result.has(d)) {
            result.add(d);
            queue.push(d);
          }
        }
      }
    }
    return result;
  }
  getTopologicalOrder(startCell) {
    const visited = new Set;
    const order = [];
    const visit = (cell) => {
      if (visited.has(cell))
        return;
      visited.add(cell);
      const deps = this.dependents.get(cell);
      if (deps) {
        for (const dep of deps) {
          visit(dep);
        }
      }
      order.push(cell);
    };
    visit(startCell);
    return order.reverse();
  }
  recalculate() {
    const allCells = Array.from(this.rawCells.keys());
    for (const cell of allCells) {
      const raw = this.rawCells.get(cell);
      if (typeof raw === "string" && raw.startsWith("=")) {
        if (this.detectCycle(cell)) {
          this.computedCells.set(cell, "#CYCLE!");
        } else {
          this.computedCells.set(cell, this.evaluate(raw));
        }
      } else {
        const num = Number(raw);
        this.computedCells.set(cell, !isNaN(num) && String(raw).trim() !== "" ? num : raw);
      }
      this.syncMatrixCell(cell, this.computedCells.get(cell));
    }
  }
  bindMatrix(matrix) {
    this.boundMatrix = matrix;
    matrix.subscribeAll((row, col, val) => {
      const coord = coordsToCell(row, col);
      if (this.rawCells.get(coord) !== val) {
        this.setCell(coord, val);
      }
    });
  }
  syncMatrixCell(cellKey, val) {
    if (this.boundMatrix) {
      const [r, c] = cellToCoords(cellKey);
      if (this.boundMatrix.get(r, c) !== val) {
        this.boundMatrix.set(r, c, val);
      }
    }
  }
  toObject() {
    const obj = {};
    for (const [k, v] of this.computedCells.entries()) {
      obj[k] = v;
    }
    return obj;
  }
  clear() {
    this.rawCells.clear();
    this.computedCells.clear();
    this.dependencies.clear();
    this.dependents.clear();
  }
}
var HxCalc = {
  createEngine: () => new CalcEngine,
  cellToCoords,
  coordsToCell,
  expandRange
};
if (typeof window !== "undefined") {
  window.HxCalc = HxCalc;
}
export {
  expandRange,
  coordsToCell,
  cellToCoords,
  HxCalc,
  CalcEngine
};
