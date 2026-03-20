import { describe, expect, test } from 'vite-plus/test';
import type { StructPayload } from '../../src/types.js';
import { StructDecodeQueue } from '../../src/struct/struct-decode-queue.js';
import { StructRegistry } from '../../src/struct/struct-registry.js';

describe('calculate byte size', () => {
	test('bool value', () => {
		const registry = new StructRegistry(new StructDecodeQueue(() => {}));
		registry.register('MyStruct', 'bool value');

		expect(registry.getByteLength('MyStruct')).toBe(1);
	});

	test('double arr[4]', () => {
		const registry = new StructRegistry(new StructDecodeQueue(() => {}));
		registry.register('MyStruct', 'double arr[4]');

		expect(registry.getByteLength('MyStruct')).toBe(4 * 8);
	});

	test('enum {a=1, b=2} int8 val', () => {
		const registry = new StructRegistry(new StructDecodeQueue(() => {}));
		registry.register('MyStruct', 'enum {a=1, b=2} int8 val');

		expect(registry.getByteLength('MyStruct')).toBe(1);
	});

	test('nested structs', () => {
		const registry = new StructRegistry(new StructDecodeQueue(() => {}));
		registry.register('Inner', 'int16 i;int8 x');
		registry.register('Outer', 'char c; Inner s; bool b');

		expect(registry.getByteLength('Inner')).toBe(3);
		expect(registry.getByteLength('Outer')).toBe(1 + 3 + 1);
	});
});

describe('decode structs', () => {
	test('char array (string)', () => {
		const registry = new StructRegistry(new StructDecodeQueue(() => {}));
		registry.register('MyStruct', 'char string[4]');

		const buffer = new Uint8Array([0b01100001, 0b01100010, 0b01100011, 0b01100100]);
		expect(registry.decode('MyStruct', buffer)).toStrictEqual(new Map([['string', 'abcd']]));
	});

	test('nested structs', () => {
		const registry = new StructRegistry(new StructDecodeQueue(() => {}));
		registry.register('Inner', 'int16 i;\nint8 x;');
		registry.register('Outer', 'char c;\nInner s;\nbool b;');

		const buffer = new Uint8Array(5);
		const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

		view.setUint8(0, 'a'.charCodeAt(0));
		view.setInt16(1, 581, true);
		view.setUint8(3, 1);
		view.setUint8(4, 2);

		const inner: StructPayload = new Map([
			['i', 581],
			['x', 1],
		]);

		const outer: StructPayload = new Map<string, unknown>([
			['c', 'a'],
			['s', inner],
			['b', true],
		]) as StructPayload;

		expect(registry.decode('Outer', buffer)).toStrictEqual(outer);
	});
});
