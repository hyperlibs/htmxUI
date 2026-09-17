(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __moduleCache = /* @__PURE__ */ new WeakMap;
  var __toCommonJS = (from) => {
    var entry = __moduleCache.get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      }));
    __moduleCache.set(from, entry);
    return entry;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: (newValue) => all[name] = () => newValue
      });
  };

  // src/htmx-sim.ts
  var exports_htmx_sim = {};
  __export(exports_htmx_sim, {
    Vec2: () => Vec2,
    SlimeSimulation: () => SlimeSimulation,
    SimCanvasRunner: () => SimCanvasRunner,
    LifeSimulation: () => LifeSimulation,
    HxSim: () => HxSim,
    GravitySimulation: () => GravitySimulation,
    CollisionSimulation: () => CollisionSimulation,
    Boid: () => Boid
  });

  class Vec2 {
    x;
    y;
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
    set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
    mult(n) {
      this.x *= n;
      this.y *= n;
      return this;
    }
    div(n) {
      if (n !== 0) {
        this.x /= n;
        this.y /= n;
      }
      return this;
    }
    magSq() {
      return this.x * this.x + this.y * this.y;
    }
    mag() {
      return Math.sqrt(this.magSq());
    }
    normalize() {
      const m = this.mag();
      if (m !== 0)
        this.div(m);
      return this;
    }
    limit(max) {
      if (this.magSq() > max * max) {
        this.normalize();
        this.mult(max);
      }
      return this;
    }
    heading() {
      return Math.atan2(this.y, this.x);
    }
    dist(v) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      return Math.hypot(dx, dy);
    }
    clone() {
      return new Vec2(this.x, this.y);
    }
  }

  class Boid {
    pos;
    vel;
    acc = new Vec2;
    maxSpeed = 3.5;
    maxForce = 0.08;
    color = "#38bdf8";
    constructor(x, y) {
      this.pos = new Vec2(x, y);
      const angle = Math.random() * Math.PI * 2;
      this.vel = new Vec2(Math.cos(angle) * this.maxSpeed, Math.sin(angle) * this.maxSpeed);
    }
    update(dt, boids, width, height, pointer) {
      this.acc.set(0, 0);
      const sep = this.separate(boids);
      const ali = this.align(boids);
      const coh = this.cohesion(boids);
      sep.mult(1.6);
      ali.mult(1);
      coh.mult(1.1);
      this.acc.add(sep);
      this.acc.add(ali);
      this.acc.add(coh);
      if (pointer.active) {
        const mouseVec = new Vec2(pointer.x, pointer.y);
        const d = this.pos.dist(mouseVec);
        if (d < 250 && d > 0) {
          let steer = mouseVec.clone().sub(this.pos);
          if (pointer.repel) {
            steer.mult(-1);
          }
          steer.normalize().mult(this.maxSpeed).sub(this.vel).limit(this.maxForce * 3);
          this.acc.add(steer);
        }
      }
      this.vel.add(this.acc.clone().mult(dt * 60));
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel.clone().mult(dt * 60));
      if (this.pos.x < 0)
        this.pos.x = width;
      if (this.pos.x > width)
        this.pos.x = 0;
      if (this.pos.y < 0)
        this.pos.y = height;
      if (this.pos.y > height)
        this.pos.y = 0;
    }
    separate(boids) {
      const desiredSeparation = 24;
      const steer = new Vec2;
      let count = 0;
      for (const other of boids) {
        const d = this.pos.dist(other.pos);
        if (d > 0 && d < desiredSeparation) {
          const diff = this.pos.clone().sub(other.pos).normalize().div(d);
          steer.add(diff);
          count++;
        }
      }
      if (count > 0) {
        steer.div(count);
        if (steer.mag() > 0) {
          steer.normalize().mult(this.maxSpeed).sub(this.vel).limit(this.maxForce * 1.5);
        }
      }
      return steer;
    }
    align(boids) {
      const neighbordist = 50;
      const sum = new Vec2;
      let count = 0;
      for (const other of boids) {
        const d = this.pos.dist(other.pos);
        if (d > 0 && d < neighbordist) {
          sum.add(other.vel);
          count++;
        }
      }
      if (count > 0) {
        sum.div(count).normalize().mult(this.maxSpeed);
        const steer = sum.sub(this.vel).limit(this.maxForce);
        return steer;
      }
      return new Vec2;
    }
    cohesion(boids) {
      const neighbordist = 50;
      const sum = new Vec2;
      let count = 0;
      for (const other of boids) {
        const d = this.pos.dist(other.pos);
        if (d > 0 && d < neighbordist) {
          sum.add(other.pos);
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        const desired = sum.sub(this.pos).normalize().mult(this.maxSpeed);
        return desired.sub(this.vel).limit(this.maxForce);
      }
      return new Vec2;
    }
    draw(ctx) {
      const angle = this.vel.heading();
      const speedPct = this.vel.mag() / this.maxSpeed;
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(angle);
      ctx.fillStyle = speedPct > 0.8 ? "#38bdf8" : speedPct > 0.4 ? "#818cf8" : "#c084fc";
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-5, -3.5);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-5, 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  class GravitySimulation {
    bodies = [];
    G = 1.2;
    softeningSq = 120;
    init(width, height, count = 128) {
      this.bodies = [];
      const cx = width / 2;
      const cy = height / 2;
      this.bodies.push({
        pos: new Vec2(cx, cy),
        vel: new Vec2(0, 0),
        mass: 8000,
        radius: 9,
        color: "#fbbf24",
        isFixed: true
      });
      for (let i = 0;i < count; i++) {
        const radius = 40 + Math.random() * (Math.min(width, height) * 0.42);
        const angle = Math.random() * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const vMag = Math.sqrt(this.G * 8000 / radius) * (0.92 + Math.random() * 0.16);
        const vx = -Math.sin(angle) * vMag;
        const vy = Math.cos(angle) * vMag;
        const mass = 1 + Math.random() * 8;
        const r = Math.max(1.8, Math.sqrt(mass) * 1.5);
        const color = mass > 6 ? "#f43f5e" : mass > 3 ? "#38bdf8" : "#a78bfa";
        this.bodies.push({ pos: new Vec2(x, y), vel: new Vec2(vx, vy), mass, radius: r, color });
      }
    }
    step(dt, pointer) {
      const len = this.bodies.length;
      for (let i = 0;i < len; i++) {
        const b1 = this.bodies[i];
        if (b1.isFixed)
          continue;
        let fx = 0;
        let fy = 0;
        for (let j = 0;j < len; j++) {
          if (i === j)
            continue;
          const b2 = this.bodies[j];
          const dx = b2.pos.x - b1.pos.x;
          const dy = b2.pos.y - b1.pos.y;
          const distSq = dx * dx + dy * dy + this.softeningSq;
          const dist = Math.sqrt(distSq);
          const force = this.G * b2.mass / distSq;
          fx += dx / dist * force;
          fy += dy / dist * force;
        }
        if (pointer.active) {
          const dx = pointer.x - b1.pos.x;
          const dy = pointer.y - b1.pos.y;
          const distSq = dx * dx + dy * dy + 400;
          const force = this.G * 3000 / distSq;
          fx += dx / Math.sqrt(distSq) * force;
          fy += dy / Math.sqrt(distSq) * force;
        }
        b1.vel.x += fx * dt * 60;
        b1.vel.y += fy * dt * 60;
        b1.pos.x += b1.vel.x * dt * 60;
        b1.pos.y += b1.vel.y * dt * 60;
      }
    }
    draw(ctx) {
      for (const b of this.bodies) {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.pos.x, b.pos.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        if (b.isFixed) {
          ctx.strokeStyle = "rgba(251, 191, 36, 0.3)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(b.pos.x, b.pos.y, b.radius + 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  }

  class CollisionSimulation {
    particles = [];
    restitution = 0.94;
    init(width, height, count = 75) {
      this.particles = [];
      for (let i = 0;i < count; i++) {
        const radius = 5 + Math.random() * 10;
        const x = radius + Math.random() * (width - radius * 2);
        const y = radius + Math.random() * (height - radius * 2);
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        const colors = ["#38bdf8", "#818cf8", "#34d399", "#f472b6", "#fbbf24"];
        const color = colors[i % colors.length];
        this.particles.push({
          pos: new Vec2(x, y),
          vel: new Vec2(Math.cos(angle) * speed, Math.sin(angle) * speed),
          radius,
          mass: radius * radius,
          color,
          flash: 0
        });
      }
    }
    step(dt, width, height, pointer) {
      const len = this.particles.length;
      for (let i = 0;i < len; i++) {
        const p = this.particles[i];
        p.pos.x += p.vel.x * dt * 60;
        p.pos.y += p.vel.y * dt * 60;
        if (p.flash > 0)
          p.flash -= dt * 4;
        if (p.pos.x - p.radius < 0) {
          p.pos.x = p.radius;
          p.vel.x = -p.vel.x * this.restitution;
          p.flash = 1;
        } else if (p.pos.x + p.radius > width) {
          p.pos.x = width - p.radius;
          p.vel.x = -p.vel.x * this.restitution;
          p.flash = 1;
        }
        if (p.pos.y - p.radius < 0) {
          p.pos.y = p.radius;
          p.vel.y = -p.vel.y * this.restitution;
          p.flash = 1;
        } else if (p.pos.y + p.radius > height) {
          p.pos.y = height - p.radius;
          p.vel.y = -p.vel.y * this.restitution;
          p.flash = 1;
        }
        if (pointer.active) {
          const d = p.pos.dist(new Vec2(pointer.x, pointer.y));
          if (d < 120 && d > 0) {
            const push = p.pos.clone().sub(new Vec2(pointer.x, pointer.y)).normalize().mult(0.8);
            p.vel.add(push);
          }
        }
      }
      for (let i = 0;i < len; i++) {
        for (let j = i + 1;j < len; j++) {
          const p1 = this.particles[i];
          const p2 = this.particles[j];
          const dx = p2.pos.x - p1.pos.x;
          const dy = p2.pos.y - p1.pos.y;
          const dist = Math.hypot(dx, dy);
          const minDist = p1.radius + p2.radius;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minDist - dist) * 0.5;
            p1.pos.x -= nx * overlap;
            p1.pos.y -= ny * overlap;
            p2.pos.x += nx * overlap;
            p2.pos.y += ny * overlap;
            const kx = p1.vel.x - p2.vel.x;
            const ky = p1.vel.y - p2.vel.y;
            const p = 2 * (nx * kx + ny * ky) / (p1.mass + p2.mass);
            p1.vel.x -= p * p2.mass * nx * this.restitution;
            p1.vel.y -= p * p2.mass * ny * this.restitution;
            p2.vel.x += p * p1.mass * nx * this.restitution;
            p2.vel.y += p * p1.mass * ny * this.restitution;
            p1.flash = 1;
            p2.flash = 1;
          }
        }
      }
    }
    draw(ctx) {
      for (const p of this.particles) {
        ctx.fillStyle = p.flash > 0.2 ? "#ffffff" : p.color;
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class LifeSimulation {
    cols = 80;
    rows = 45;
    grid = new Uint8Array(0);
    nextGrid = new Uint8Array(0);
    ages = new Uint16Array(0);
    cellSize = 10;
    tickTimer = 0;
    tickInterval = 0.06;
    init(width, height, cellSize = 10) {
      this.cellSize = cellSize;
      this.cols = Math.floor(width / cellSize);
      this.rows = Math.floor(height / cellSize);
      const size = this.cols * this.rows;
      this.grid = new Uint8Array(size);
      this.nextGrid = new Uint8Array(size);
      this.ages = new Uint16Array(size);
      for (let i = 0;i < size; i++) {
        if (Math.random() < 0.18) {
          this.grid[i] = 1;
          this.ages[i] = 1;
        }
      }
    }
    step(dt, pointer) {
      if (pointer.active) {
        const c = Math.floor(pointer.x / this.cellSize);
        const r = Math.floor(pointer.y / this.cellSize);
        for (let dr = -1;dr <= 1; dr++) {
          for (let dc = -1;dc <= 1; dc++) {
            const col = (c + dc + this.cols) % this.cols;
            const row = (r + dr + this.rows) % this.rows;
            const idx = row * this.cols + col;
            this.grid[idx] = 1;
            this.ages[idx] = 1;
          }
        }
      }
      this.tickTimer += dt;
      if (this.tickTimer < this.tickInterval)
        return;
      this.tickTimer = 0;
      const cols = this.cols;
      const rows = this.rows;
      for (let r = 0;r < rows; r++) {
        const rUp = (r - 1 + rows) % rows;
        const rDown = (r + 1) % rows;
        for (let c = 0;c < cols; c++) {
          const cLeft = (c - 1 + cols) % cols;
          const cRight = (c + 1) % cols;
          const neighbors = this.grid[rUp * cols + cLeft] + this.grid[rUp * cols + c] + this.grid[rUp * cols + cRight] + this.grid[r * cols + cLeft] + this.grid[r * cols + cRight] + this.grid[rDown * cols + cLeft] + this.grid[rDown * cols + c] + this.grid[rDown * cols + cRight];
          const idx = r * cols + c;
          const alive = this.grid[idx];
          if (alive === 1) {
            if (neighbors === 2 || neighbors === 3) {
              this.nextGrid[idx] = 1;
              this.ages[idx] = Math.min(65535, this.ages[idx] + 1);
            } else {
              this.nextGrid[idx] = 0;
              this.ages[idx] = 0;
            }
          } else {
            if (neighbors === 3) {
              this.nextGrid[idx] = 1;
              this.ages[idx] = 1;
            } else {
              this.nextGrid[idx] = 0;
              this.ages[idx] = 0;
            }
          }
        }
      }
      this.grid.set(this.nextGrid);
    }
    draw(ctx) {
      const cols = this.cols;
      const rows = this.rows;
      const size = this.cellSize;
      for (let r = 0;r < rows; r++) {
        for (let c = 0;c < cols; c++) {
          const idx = r * cols + c;
          if (this.grid[idx]) {
            const age = this.ages[idx];
            ctx.fillStyle = age > 20 ? "#10b981" : age > 8 ? "#38bdf8" : age > 3 ? "#818cf8" : "#f43f5e";
            ctx.fillRect(c * size, r * size, size - 1, size - 1);
          }
        }
      }
    }
  }

  class SlimeSimulation {
    agents = [];
    trailMap = new Float32Array(0);
    width = 0;
    height = 0;
    sensorAngle = 0.45;
    sensorDist = 9;
    moveSpeed = 2.2;
    decay = 0.96;
    init(width, height, count = 600) {
      this.width = width;
      this.height = height;
      this.trailMap = new Float32Array(width * height);
      this.agents = [];
      const cx = width / 2;
      const cy = height / 2;
      for (let i = 0;i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * (Math.min(width, height) * 0.35);
        this.agents.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          angle: angle + Math.PI,
          color: i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#e879f9" : "#34d399"
        });
      }
    }
    sense(agent, sensorOffsetAngle) {
      const angle = agent.angle + sensorOffsetAngle;
      const sx = Math.floor(agent.x + Math.cos(angle) * this.sensorDist);
      const sy = Math.floor(agent.y + Math.sin(angle) * this.sensorDist);
      if (sx < 0 || sx >= this.width || sy < 0 || sy >= this.height)
        return 0;
      return this.trailMap[sy * this.width + sx];
    }
    step(dt, pointer) {
      const len = this.trailMap.length;
      for (let i = 0;i < len; i++) {
        this.trailMap[i] *= this.decay;
      }
      if (pointer.active) {
        const px = Math.floor(pointer.x);
        const py = Math.floor(pointer.y);
        for (let dy = -15;dy <= 15; dy++) {
          for (let dx = -15;dx <= 15; dx++) {
            const x = px + dx;
            const y = py + dy;
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
              this.trailMap[y * this.width + x] = 5;
            }
          }
        }
      }
      for (const a of this.agents) {
        const sCenter = this.sense(a, 0);
        const sLeft = this.sense(a, -this.sensorAngle);
        const sRight = this.sense(a, this.sensorAngle);
        if (sCenter > sLeft && sCenter > sRight) {} else if (sCenter < sLeft && sCenter < sRight) {
          a.angle += (Math.random() - 0.5) * 0.4;
        } else if (sLeft > sRight) {
          a.angle -= this.sensorAngle * 0.5;
        } else if (sRight > sLeft) {
          a.angle += this.sensorAngle * 0.5;
        } else {
          a.angle += (Math.random() - 0.5) * 0.2;
        }
        a.x += Math.cos(a.angle) * this.moveSpeed * dt * 60;
        a.y += Math.sin(a.angle) * this.moveSpeed * dt * 60;
        if (a.x < 0)
          a.x = this.width - 1;
        if (a.x >= this.width)
          a.x = 0;
        if (a.y < 0)
          a.y = this.height - 1;
        if (a.y >= this.height)
          a.y = 0;
        const idx = Math.floor(a.y) * this.width + Math.floor(a.x);
        if (idx >= 0 && idx < len) {
          this.trailMap[idx] = Math.min(1, this.trailMap[idx] + 0.35);
        }
      }
    }
    draw(ctx) {
      for (const a of this.agents) {
        ctx.fillStyle = a.color;
        ctx.fillRect(a.x - 1, a.y - 1, 2.5, 2.5);
      }
    }
  }

  class SimCanvasRunner {
    canvas;
    ctx;
    type = "boids";
    config;
    boids = [];
    gravitySim = new GravitySimulation;
    collisionSim = new CollisionSimulation;
    lifeSim = new LifeSimulation;
    slimeSim = new SlimeSimulation;
    running = false;
    lastTime = performance.now();
    pointer = { x: 0, y: 0, active: false, repel: false };
    ticks = 0;
    fps = 60;
    fpsTimer = performance.now();
    frameCount = 0;
    constructor(canvas, cfg = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d", { alpha: false }) || canvas.getContext("2d");
      this.config = {
        type: canvas.getAttribute("hx-sim") || cfg.type || "boids",
        count: parseInt(canvas.getAttribute("hx-sim-count") || String(cfg.count || 120), 10),
        speed: parseFloat(canvas.getAttribute("hx-sim-speed") || String(cfg.speed || 1)),
        interactive: canvas.getAttribute("hx-sim-interactive") !== "false",
        trails: canvas.getAttribute("hx-sim-trails") === "true" || cfg.trails === true,
        ...cfg
      };
      this.type = this.config.type || "boids";
      this.setupResize();
      this.setupInput();
      this.reset();
      this.start();
    }
    setupResize() {
      const resize = () => {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = Math.floor(rect.width * dpr);
        this.canvas.height = Math.floor(rect.height * dpr);
        this.ctx.scale(dpr, dpr);
        this.reset();
      };
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(resize).observe(this.canvas);
      }
      resize();
    }
    setupInput() {
      const getCoords = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      };
      this.canvas.addEventListener("mousemove", (e) => {
        const c = getCoords(e);
        this.pointer.x = c.x;
        this.pointer.y = c.y;
      });
      this.canvas.addEventListener("mousedown", (e) => {
        const c = getCoords(e);
        this.pointer.x = c.x;
        this.pointer.y = c.y;
        this.pointer.active = true;
        this.pointer.repel = e.button === 2;
      });
      window.addEventListener("mouseup", () => {
        this.pointer.active = false;
        this.pointer.repel = false;
      });
      this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    setPreset(type, count) {
      this.type = type;
      if (count)
        this.config.count = count;
      this.reset();
    }
    reset() {
      const rect = this.canvas.getBoundingClientRect();
      const w = rect.width || 800;
      const h = rect.height || 500;
      const count = this.config.count || 120;
      if (this.type === "boids") {
        this.boids = [];
        for (let i = 0;i < count; i++) {
          this.boids.push(new Boid(Math.random() * w, Math.random() * h));
        }
      } else if (this.type === "gravity") {
        this.gravitySim.init(w, h, count);
      } else if (this.type === "collision") {
        this.collisionSim.init(w, h, count);
      } else if (this.type === "life") {
        this.lifeSim.init(w, h, 8);
      } else if (this.type === "slime") {
        this.slimeSim.init(Math.floor(w), Math.floor(h), count * 4);
      }
    }
    start() {
      if (this.running)
        return;
      this.running = true;
      this.lastTime = performance.now();
      const loop = (time) => {
        if (!this.running)
          return;
        const dt = Math.min((time - this.lastTime) / 1000, 0.05) * (this.config.speed || 1);
        this.lastTime = time;
        this.step(dt);
        this.render();
        this.frameCount++;
        if (time - this.fpsTimer > 500) {
          this.fps = Math.round(this.frameCount * 1000 / (time - this.fpsTimer));
          this.frameCount = 0;
          this.fpsTimer = time;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
    stop() {
      this.running = false;
    }
    step(dt) {
      const rect = this.canvas.getBoundingClientRect();
      const w = rect.width || 800;
      const h = rect.height || 500;
      this.ticks++;
      if (this.type === "boids") {
        for (const b of this.boids) {
          b.update(dt, this.boids, w, h, this.pointer);
        }
      } else if (this.type === "gravity") {
        this.gravitySim.step(dt, this.pointer);
      } else if (this.type === "collision") {
        this.collisionSim.step(dt, w, h, this.pointer);
      } else if (this.type === "life") {
        this.lifeSim.step(dt, this.pointer);
      } else if (this.type === "slime") {
        this.slimeSim.step(dt, this.pointer);
      }
    }
    render() {
      const rect = this.canvas.getBoundingClientRect();
      const w = rect.width || 800;
      const h = rect.height || 500;
      if (this.config.trails || this.type === "gravity" || this.type === "slime") {
        this.ctx.fillStyle = "rgba(10, 15, 30, 0.22)";
        this.ctx.fillRect(0, 0, w, h);
      } else {
        this.ctx.fillStyle = "#070b14";
        this.ctx.fillRect(0, 0, w, h);
      }
      if (this.type === "boids") {
        for (const b of this.boids)
          b.draw(this.ctx);
      } else if (this.type === "gravity") {
        this.gravitySim.draw(this.ctx);
      } else if (this.type === "collision") {
        this.collisionSim.draw(this.ctx);
      } else if (this.type === "life") {
        this.lifeSim.draw(this.ctx);
      } else if (this.type === "slime") {
        this.slimeSim.draw(this.ctx);
      }
    }
    getStats() {
      let entityCount = 0;
      if (this.type === "boids")
        entityCount = this.boids.length;
      else if (this.type === "gravity")
        entityCount = this.gravitySim.bodies.length;
      else if (this.type === "collision")
        entityCount = this.collisionSim.particles.length;
      else if (this.type === "life")
        entityCount = this.lifeSim.cols * this.lifeSim.rows;
      else if (this.type === "slime")
        entityCount = this.slimeSim.agents.length;
      return {
        type: this.type,
        entityCount,
        simHz: 120,
        renderFps: this.fps,
        tickCount: this.ticks
      };
    }
  }
  var activeRunners = new WeakMap;
  var HxSim = {
    mount(canvas, config) {
      if (activeRunners.has(canvas))
        return activeRunners.get(canvas);
      const runner = new SimCanvasRunner(canvas, config);
      activeRunners.set(canvas, runner);
      return runner;
    },
    getRunner(canvas) {
      const el = typeof canvas === "string" ? document.querySelector(canvas) : canvas;
      if (el && activeRunners.has(el))
        return activeRunners.get(el);
      return;
    },
    init(root = document) {
      const canvases = root.querySelectorAll("canvas[hx-sim]");
      canvases.forEach((c) => HxSim.mount(c));
    }
  };
  if (typeof window !== "undefined") {
    window.HxSim = HxSim;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => HxSim.init());
    } else {
      HxSim.init();
    }
  }
})();
