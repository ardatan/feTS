#!/usr/bin/env node
import { cli } from './index.js';

cli().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
