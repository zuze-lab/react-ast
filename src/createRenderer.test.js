import React from 'react';
import { mount } from 'enzyme';
import createRenderer from '../src/createRenderer';

describe('createRenderer', () => {
  it('should work', () => {
    const Render = createRenderer();
    const descriptor = {
      component: 'div',
      props: { title: 'Some title' },
      children: ['test']
    };
    expect(mount(<Render {...descriptor} />).html()).toBe(
      '<div title="Some title">test</div>'
    );
  });
});
