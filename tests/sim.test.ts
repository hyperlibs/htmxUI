import { describe, test, expect } from 'bun:test';
import { 
  Boid, 
  GravitySimulation, 
  CollisionSimulation, 
  LifeSimulation, 
  SlimeSimulation, 
  Vec2 
} from '../src/index';

describe('HTMXUI Kinetic Simulations & Particle Physics Suite', () => {
  test('Vec2 basic vector algebra functions properly', () => {
    const v1 = new Vec2(3, 4);
    expect(v1.mag()).toBe(5);
    expect(v1.magSq()).toBe(25);

    const v2 = new Vec2(1, 2);
    v1.add(v2);
    expect(v1.x).toBe(4);
    expect(v1.y).toBe(6);

    v1.sub(v2);
    expect(v1.x).toBe(3);
    expect(v1.y).toBe(4);

    v1.normalize();
    expect(v1.mag()).toBeCloseTo(1.0, 5);
  });

  test('1. Boids: Swarm Intelligence flocking updates positions with Reynolds rules', () => {
    const boids: Boid[] = [
      new Boid(100, 100),
      new Boid(105, 102),
      new Boid(110, 104)
    ];

    const initialX = boids[0].pos.x;
    const initialY = boids[0].pos.y;

    boids[0].update(0.016, boids, 800, 600, { x: 0, y: 0, active: false, repel: false });

    // Position must move according to velocity
    expect(boids[0].pos.x).not.toBe(initialX);
    expect(boids[0].pos.y).not.toBe(initialY);
    expect(boids[0].vel.mag()).toBeLessThanOrEqual(boids[0].maxSpeed + 0.01);
  });

  test('2. N-Body Gravity: Calculates orbital gravitational attraction without singularities', () => {
    const sim = new GravitySimulation();
    sim.init(800, 600, 32);

    expect(sim.bodies.length).toBe(33); // 1 central + 32 orbiting bodies
    const central = sim.bodies[0];
    expect(central.isFixed).toBe(true);

    const orbiting = sim.bodies[1];
    const initialPos = orbiting.pos.clone();

    // Step physics forward 10 steps
    for (let i = 0; i < 10; i++) {
      sim.step(0.016, { x: 0, y: 0, active: false });
    }

    expect(orbiting.pos.x).not.toBe(initialPos.x);
    expect(orbiting.pos.y).not.toBe(initialPos.y);
    expect(Number.isFinite(orbiting.pos.x)).toBe(true);
    expect(Number.isFinite(orbiting.pos.y)).toBe(true);
  });

  test('3. Elastic Collisions: Resolves pairwise momentum transfer & arena boundaries', () => {
    const sim = new CollisionSimulation();
    sim.init(400, 300, 20);

    expect(sim.particles.length).toBe(20);

    for (let i = 0; i < 30; i++) {
      sim.step(0.016, 400, 300, { x: 0, y: 0, active: false });
    }

    // Ensure all particles remain bounded inside arena
    for (const p of sim.particles) {
      expect(p.pos.x).toBeGreaterThanOrEqual(0);
      expect(p.pos.x).toBeLessThanOrEqual(400);
      expect(p.pos.y).toBeGreaterThanOrEqual(0);
      expect(p.pos.y).toBeLessThanOrEqual(300);
    }
  });

  test('4. Conway Life: Evolves cellular automata grid according to 23/3 rules', () => {
    const sim = new LifeSimulation();
    sim.init(100, 100, 10);

    expect(sim.cols).toBe(10);
    expect(sim.rows).toBe(10);

    // Clear grid and place a 3-cell vertical blinker oscillator
    sim.grid.fill(0);
    sim.grid[1 * 10 + 2] = 1;
    sim.grid[2 * 10 + 2] = 1;
    sim.grid[3 * 10 + 2] = 1;

    // Advance generation
    sim.step(0.1, { x: 0, y: 0, active: false });

    // Vertical blinker should oscillate to horizontal
    expect(sim.grid[2 * 10 + 1]).toBe(1);
    expect(sim.grid[2 * 10 + 2]).toBe(1);
    expect(sim.grid[2 * 10 + 3]).toBe(1);
    expect(sim.grid[1 * 10 + 2]).toBe(0);
    expect(sim.grid[3 * 10 + 2]).toBe(0);
  });

  test('5. Slime Mould: Chemoattractant sensor agents navigate and deposit evaporating trails', () => {
    const sim = new SlimeSimulation();
    sim.init(100, 100, 50);

    expect(sim.agents.length).toBe(50);
    expect(sim.trailMap.length).toBe(10000);

    sim.step(0.016, { x: 50, y: 50, active: true });

    // Pheromone trail map should contain non-zero trail deposits
    let nonZeroTrails = 0;
    for (let i = 0; i < sim.trailMap.length; i++) {
      if (sim.trailMap[i] > 0) nonZeroTrails++;
    }
    expect(nonZeroTrails).toBeGreaterThan(0);
  });
});
