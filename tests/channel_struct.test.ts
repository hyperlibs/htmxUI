import { describe, test, expect } from 'bun:test';
import { HxBolt, getOrCreateChannel, defineStructSchema, validateStruct } from '../src/index';

describe('HxBolt Concurrency: Channels & Structs', () => {
  test('channel send and recv pub/sub message propagation', () => {
    const ch = getOrCreateChannel<number>('telemetry');
    let receivedVal = 0;
    const unsub = ch.recv((val) => {
      receivedVal = val;
    });

    ch.send(42);
    expect(receivedVal).toBe(42);

    ch.send(100);
    expect(receivedVal).toBe(100);

    unsub();
    ch.send(200);
    expect(receivedVal).toBe(100);
  });

  test('global HxBolt.send and HxBolt.recv helper', () => {
    let message = '';
    const unsub = HxBolt.recv('chat', (msg: string) => {
      message = msg;
    });

    HxBolt.send('chat', 'Hello HTMXUI!');
    expect(message).toBe('Hello HTMXUI!');
    unsub();
  });

  test('struct schema definition and type validation', () => {
    defineStructSchema('User { name: string, active: bool, age: int, balance: float }');

    const validResult = validateStruct(
      { name: 'Ada Lovelace', active: true, age: 36, balance: 150.75 },
      'User'
    );
    expect(validResult.valid).toBe(true);
    expect(validResult.errors.length).toBe(0);

    const invalidResult = validateStruct(
      { name: 123, active: 'not-a-bool', age: 36.5, balance: 'invalid' },
      'User'
    );
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors.length).toBe(4);
  });

  test('inline struct signature validation', () => {
    const result = validateStruct(
      { id: 'ORD-991', total: 49.99 },
      'Order { id: string, total: float }'
    );
    expect(result.valid).toBe(true);
  });
});
