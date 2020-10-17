import { lazy } from 'react';
export default (importer) => (descriptor) =>
  lazy(async () => {
    try {
      return { default: await importer(descriptor) };
    } catch (err) {
      // rethrow a slightly nicer error
      throw new Error(`Failed to import lazy component`, descriptor);
    }
  });
