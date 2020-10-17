import { createElement } from 'react';
import mergeDescriptors from './mergeDescriptors';
import createRenderer from './createRenderer';
import { component, interpolation } from './parsers';

const DynamicComponent = ({
  descriptor,
  context,
  interpolate = /\{\{(.+?)\}\}/,
  cmpKey = '$cmp',
  merge = mergeDescriptors,
  Component,
  render,
  children = ({ render }) => render(),
  resolver,
  path = ['ROOT']
}) =>
  createRenderer({
    render: ({ render: innerRender, ...props }, path) => {
      const key = path.join('//');
      const next = {
        ...props,
        render: (props = {}) => innerRender({ key, ...props }),
        key
      };
      return Component
        ? createElement(Component, next)
        : (render || children)(next);
    },
    resolver,
    parse: (descriptor, creator, path) =>
      // interpolate the descriptor first - line 38
      // then, parse the interpolated descriptor for components
      component(
        cmpKey,
        merge,
        creator,
        interpolation(interpolate, context, descriptor, path),
        path
      )
  })(descriptor, path);

export default DynamicComponent;
