import React, { Suspense } from 'react';
import { mount } from 'enzyme';
import createImporter from './createImporter';

describe('createImporter', () => {
  it('should call the importer function', async () => {
    const first = 'test';
    const spy = jest.fn(() => ({}));
    const LazyCmp = createImporter(spy)(first);

    // don't call it until we render the component
    expect(spy).not.toHaveBeenCalled();
    mount(
      <Suspense fallback={<></>}>
        <LazyCmp someProp='a' />
      </Suspense>
    );
    expect(spy).toHaveBeenCalled();
  });
});
