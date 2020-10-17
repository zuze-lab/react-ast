import { lazy } from 'react';
// simple helper function to return a React.lazy component
// using the component returned from an await-ed importer function called with a descriptor
export default (importer) => (descriptor) =>
  lazy(async () => {
    try {
      return { default: await importer(descriptor) };
    } catch (err) {
      // rethrow a slightly nicer error
      throw new Error(`Failed to import lazy component`, descriptor);
    }
  });
