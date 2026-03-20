export class StreamFinishedError extends Error {
	constructor(bytesRead: number) {
		super(`Reached end of stream after reading ${bytesRead} bytes`);
	}
}

export class InputStream {
	private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
	private bytesRead = 0;
	private buffer: Uint8Array = new Uint8Array();

	constructor(stream: ReadableStream<Uint8Array>) {
		this.reader = stream.getReader();
	}

	async readBytesAndAdvance(length: number): Promise<Uint8Array> {
		while (this.buffer.byteLength < length) {
			const chunk = await this.reader.read();

			if (chunk.done) {
				throw new StreamFinishedError(this.bytesRead);
			}

			const newBuffer = new Uint8Array(this.buffer.byteLength + chunk.value.byteLength);
			newBuffer.set(this.buffer);
			newBuffer.set(chunk.value, this.buffer.byteLength);
			this.buffer = newBuffer;
		}

		return this.readAndAdvanceFromBuffer(length);
	}

	private readAndAdvanceFromBuffer(length: number): Uint8Array {
		const result = this.buffer.slice(0, length);
		this.buffer = this.buffer.slice(length);
		this.bytesRead += length;
		return result;
	}
}
