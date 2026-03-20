# wpilog

Read [WPILib data log (`.wpilog`)](https://docs.wpilib.org/en/stable/docs/software/telemetry/datalog.html) files in TypeScript & JavaScript.

## Install

```bash
npm install wpilog
```

## Usage

```ts
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { readRecords, decodeRecords } from 'wpilog';

const stream = Readable.toWeb(createReadStream('./example.wpilog'));

for await (const record of decodeRecords(readRecords(stream))) {
	console.log(record);
}
```

## Development

```bash
vp install
vp test
vp pack
```
