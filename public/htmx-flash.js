// src/htmx-flash.ts
var databases = {};
function levenshtein(a, b) {
  if (a.length === 0)
    return b.length;
  if (b.length === 0)
    return a.length;
  const matrix = [];
  for (let i = 0;i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0;j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1;i <= b.length; i++) {
    for (let j = 1;j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1] + 1);
      }
    }
  }
  return matrix[b.length][a.length];
}
function scoreMatch(text, query) {
  if (!query)
    return 100;
  if (!text)
    return 0;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  if (lowerText === lowerQuery)
    return 1000;
  if (lowerText.startsWith(lowerQuery))
    return 500;
  const words = lowerText.split(/\s+/);
  for (const w of words) {
    if (w.startsWith(lowerQuery))
      return 300;
  }
  const subIdx = lowerText.indexOf(lowerQuery);
  if (subIdx !== -1) {
    return 150 - subIdx;
  }
  if (lowerQuery.length >= 3) {
    for (const w of words) {
      if (Math.abs(w.length - lowerQuery.length) <= 2) {
        const dist = levenshtein(w, lowerQuery);
        if (dist <= 1)
          return 80;
        if (dist === 2 && lowerQuery.length >= 5)
          return 40;
      }
    }
  }
  let qIdx = 0;
  let score = 0;
  for (let i = 0;i < lowerText.length && qIdx < lowerQuery.length; i++) {
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

class FlashDatabase {
  name;
  raw = [];
  items = [];
  filters = {};
  sortField = null;
  sortDir = "asc";
  status = "idle";
  constructor(name, data = []) {
    this.name = name;
    if (data.length)
      this.load(data);
  }
  load(data) {
    this.raw = data;
    this.items = data.map((item, idx) => {
      const searchText = item._search || (typeof item === "object" ? Object.values(item).join(" ") : String(item));
      return {
        id: item.id !== undefined ? item.id : idx,
        raw: item,
        html: item.html || "",
        _searchText: searchText.toLowerCase(),
        fields: typeof item === "object" ? { ...item } : {}
      };
    });
    this.status = "ready";
  }
  query({ search = "", filters = {}, sortField = null, sortDir = "asc", limit = 50, page = 1 } = {}) {
    const results = [];
    const queryTrim = (search || "").trim();
    for (let i = 0;i < this.items.length; i++) {
      const item = this.items[i];
      let filterPass = true;
      for (const [field, filterVal] of Object.entries(filters)) {
        if (filterVal === undefined || filterVal === null || filterVal === "" || filterVal === "all")
          continue;
        const itemVal = item.fields[field];
        if (typeof filterVal === "function") {
          if (!filterVal(itemVal, item)) {
            filterPass = false;
            break;
          }
        } else if (typeof filterVal === "string") {
          if (String(itemVal).toLowerCase() !== filterVal.toLowerCase()) {
            filterPass = false;
            break;
          }
        } else if (itemVal !== filterVal) {
          filterPass = false;
          break;
        }
      }
      if (!filterPass)
        continue;
      let score = 1;
      if (queryTrim) {
        score = scoreMatch(item._searchText, queryTrim);
        if (score <= 0)
          continue;
      }
      results.push({ item, score });
    }
    if (sortField) {
      results.sort((a, b) => {
        const valA = a.item.fields[sortField];
        const valB = b.item.fields[sortField];
        if (valA === valB)
          return 0;
        if (valA === undefined || valA === null)
          return 1;
        if (valB === undefined || valB === null)
          return -1;
        const cmp = typeof valA === "number" && typeof valB === "number" ? valA - valB : String(valA).localeCompare(String(valB));
        return sortDir === "desc" ? -cmp : cmp;
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
      results: paginated.map((r) => r.item)
    };
  }
}
function getOrCreateDB(name) {
  if (!databases[name]) {
    databases[name] = new FlashDatabase(name);
  }
  return databases[name];
}
function executeSearch(config) {
  const { dbName, targetEl, emptyHtml, limit, query, filters, sortField, sortDir } = config;
  const db = databases[dbName];
  if (!db || db.status !== "ready")
    return;
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
    let htmlStr = "";
    for (let i = 0;i < results.length; i++) {
      htmlStr += results[i].html;
    }
    targetEl.innerHTML = htmlStr;
  }
  targetEl.dispatchEvent(new CustomEvent("flash:updated", {
    bubbles: true,
    detail: { total, renderedCount: results.length, dbName }
  }));
}

class ColumnStore {
  length = 0;
  capacity = 0;
  schema = {};
  columns = new Map;
  constructor(schema = {}, initialCapacity = 1000) {
    this.schema = schema;
    this.capacity = initialCapacity;
    this.length = 0;
    for (const [colName, colType] of Object.entries(schema)) {
      this.addColumn(colName, colType);
    }
  }
  ensureCapacity(needed) {
    if (needed <= this.capacity)
      return;
    const newCap = Math.max(needed, this.capacity * 2, 100);
    this.capacity = newCap;
    for (const [, col] of this.columns.entries()) {
      if (col.type === "float64") {
        const next = new Float64Array(newCap);
        next.set(col.data);
        col.data = next;
      } else if (col.type === "int32") {
        const next = new Int32Array(newCap);
        next.set(col.data);
        col.data = next;
      } else if (col.type === "uint32") {
        const next = new Uint32Array(newCap);
        next.set(col.data);
        col.data = next;
      } else if (col.type === "boolean") {
        const next = new Uint8Array(newCap);
        next.set(col.data);
        col.data = next;
      }
    }
  }
  addColumn(name, type, initialData) {
    let data;
    const count = initialData ? initialData.length : this.capacity;
    if (count > this.capacity)
      this.capacity = count;
    if (type === "float64") {
      data = new Float64Array(this.capacity);
      if (initialData)
        data.set(initialData);
    } else if (type === "int32") {
      data = new Int32Array(this.capacity);
      if (initialData)
        data.set(initialData);
    } else if (type === "uint32") {
      data = new Uint32Array(this.capacity);
      if (initialData)
        data.set(initialData);
    } else if (type === "boolean") {
      data = new Uint8Array(this.capacity);
      if (initialData) {
        for (let i = 0;i < initialData.length; i++)
          data[i] = initialData[i] ? 1 : 0;
      }
    } else {
      data = initialData ? Array.from(initialData) : [];
    }
    this.columns.set(name, { type, data });
    this.schema[name] = type;
    if (initialData && initialData.length > this.length) {
      this.length = initialData.length;
    }
  }
  get(column, rowIndex) {
    const col = this.columns.get(column);
    if (!col || rowIndex < 0 || rowIndex >= this.length)
      return;
    if (col.type === "boolean")
      return Boolean(col.data[rowIndex]);
    return col.data[rowIndex];
  }
  set(column, rowIndex, value) {
    if (rowIndex >= this.capacity) {
      this.ensureCapacity(rowIndex + 1);
    }
    if (rowIndex >= this.length) {
      this.length = rowIndex + 1;
    }
    const col = this.columns.get(column);
    if (!col)
      return;
    if (col.type === "float64" || col.type === "int32" || col.type === "uint32") {
      col.data[rowIndex] = Number(value) || 0;
    } else if (col.type === "boolean") {
      col.data[rowIndex] = value ? 1 : 0;
    } else {
      col.data[rowIndex] = String(value);
    }
  }
  filterRange(column, min, max) {
    const col = this.columns.get(column);
    if (!col)
      return new Uint32Array(0);
    const matches = [];
    const len = this.length;
    const data = col.data;
    for (let i = 0;i < len; i++) {
      const v = data[i];
      if (v >= min && v <= max) {
        matches.push(i);
      }
    }
    return new Uint32Array(matches);
  }
  filterEquals(column, value) {
    const col = this.columns.get(column);
    if (!col)
      return new Uint32Array(0);
    const matches = [];
    const len = this.length;
    const data = col.data;
    const target = col.type === "boolean" ? value ? 1 : 0 : value;
    for (let i = 0;i < len; i++) {
      if (data[i] === target) {
        matches.push(i);
      }
    }
    return new Uint32Array(matches);
  }
  aggregate(column, op, indices) {
    const col = this.columns.get(column);
    if (!col)
      return 0;
    const data = col.data;
    const len = indices ? indices.length : this.length;
    if (len === 0)
      return 0;
    if (op === "count")
      return len;
    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0;i < len; i++) {
      const idx = indices ? indices[i] : i;
      const v = Number(data[idx]) || 0;
      sum += v;
      if (v < min)
        min = v;
      if (v > max)
        max = v;
    }
    if (op === "sum")
      return sum;
    if (op === "avg")
      return sum / len;
    if (op === "min")
      return min === Infinity ? 0 : min;
    if (op === "max")
      return max === -Infinity ? 0 : max;
    return 0;
  }
  sort(column, dir = "asc") {
    const col = this.columns.get(column);
    const indices = new Uint32Array(this.length);
    for (let i = 0;i < this.length; i++)
      indices[i] = i;
    if (!col)
      return indices;
    const data = col.data;
    const isAsc = dir === "asc";
    const arr = Array.from(indices);
    arr.sort((a, b) => {
      const valA = data[a];
      const valB = data[b];
      if (valA === valB)
        return 0;
      if (valA < valB)
        return isAsc ? -1 : 1;
      return isAsc ? 1 : -1;
    });
    return new Uint32Array(arr);
  }
  exportRow(rowIndex) {
    const obj = {};
    for (const [name, col] of this.columns.entries()) {
      if (col.type === "boolean") {
        obj[name] = Boolean(col.data[rowIndex]);
      } else {
        obj[name] = col.data[rowIndex];
      }
    }
    return obj;
  }
}
var HxFlash = {
  db(name) {
    return getOrCreateDB(name);
  },
  load(name, data) {
    const db = getOrCreateDB(name);
    db.load(data);
    if (typeof document !== "undefined") {
      document.dispatchEvent(new CustomEvent("flash:ready", { detail: { dbName: name } }));
    }
    return db;
  },
  query(name, options) {
    const db = getOrCreateDB(name);
    return db.query(options);
  },
  createColumnStore(schema, initialCapacity = 1000) {
    return new ColumnStore(schema, initialCapacity);
  }
};
if (typeof window !== "undefined") {
  window.HxFlash = HxFlash;
  if (typeof window.htmx !== "undefined") {
    window.htmx.defineExtension("flash", {
      onEvent: function(name, evt) {
        if (name === "htmx:afterProcessNode") {
          const elt = evt.detail.elt;
          if (elt.hasAttribute && elt.hasAttribute("hx-flash-src")) {
            const src = elt.getAttribute("hx-flash-src");
            const dbName = elt.getAttribute("hx-flash-db") || "default";
            const db = getOrCreateDB(dbName);
            if (db.status === "idle") {
              db.status = "loading";
              fetch(src).then((res) => res.json()).then((data) => {
                db.load(data);
                console.log(`[htmx-flash] ⚡ Indexed ${data.length} records in-memory for DB: '${dbName}'`);
                elt.dispatchEvent(new CustomEvent("flash:ready", { bubbles: true, detail: { dbName } }));
              }).catch((err) => {
                console.error(`[htmx-flash] Failed to fetch data from ${src}:`, err);
                db.status = "error";
              });
            }
          }
          if (elt.tagName === "INPUT" && elt.hasAttribute("hx-flash-search")) {
            const dbName = elt.getAttribute("hx-flash-db") || "default";
            const targetSel = elt.getAttribute("hx-target");
            const limit = parseInt(elt.getAttribute("hx-flash-limit") || "50", 10);
            const emptyHtml = elt.getAttribute("hx-flash-empty");
            elt.addEventListener("input", (e) => {
              const target = document.querySelector(targetSel);
              if (!target)
                return;
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
          if (elt.hasAttribute && elt.hasAttribute("hx-flash-filter")) {
            const field = elt.getAttribute("hx-flash-filter");
            const dbName = elt.getAttribute("hx-flash-db") || "default";
            const targetSel = elt.getAttribute("hx-target");
            elt.addEventListener("change", (e) => {
              const target = document.querySelector(targetSel);
              if (!target)
                return;
              const db = getOrCreateDB(dbName);
              db.filters[field] = e.target.value;
              executeSearch({
                dbName,
                targetEl: target,
                filters: db.filters
              });
            });
          }
          if (elt.hasAttribute && elt.hasAttribute("hx-flash-sort")) {
            const field = elt.getAttribute("hx-flash-sort");
            const dbName = elt.getAttribute("hx-flash-db") || "default";
            const targetSel = elt.getAttribute("hx-target");
            elt.style.cursor = "pointer";
            elt.addEventListener("click", () => {
              const target = document.querySelector(targetSel);
              if (!target)
                return;
              const db = getOrCreateDB(dbName);
              if (db.sortField === field) {
                db.sortDir = db.sortDir === "asc" ? "desc" : "asc";
              } else {
                db.sortField = field;
                db.sortDir = "asc";
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
export {
  HxFlash,
  FlashDatabase,
  ColumnStore
};
