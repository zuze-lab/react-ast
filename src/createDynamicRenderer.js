import { createElement } from 'react';
import { createParser } from './createParser';
import { mergeDescriptors, resolveComponent, stringifyPath } from './utils';

export const createDynamicRenderer = ({
  descriptor,
  ast = {},
  render,
  children = ({ render }) => render(),
  Component,
  resolver,
  cacheKey = 'component',
  cmpKey = '$cmp',
  merge = mergeDescriptors,
  interpolate = /\{\{(.+?)\}\}/g,
  context = {},
  contextKey = '$',
  initialPath = ['ROOT']
}) => {
  if (!resolver) throw new Error('A resolver function is required');

  const parse = createParser(
    (...args) => fn(...args),
    cmpKey,
    context,
    contextKey,
    ast,
    interpolate,
    merge
  );

  const fn = (resolved, path = initialPath) => {
    const key = stringifyPath(path);

    if (!resolved)
      throw new Error(`Failed to resolve component found at path ${key}`);

    const props = {
      descriptor: resolved,
      key,
      render: (innerProps = {}, descriptor = resolved) => {
        const final = parse(
          {
            ...descriptor,
            props: {
              key,
              children: descriptor.children,
              ...descriptor.props,
              ...innerProps
            },
            key
          },
          path
        );

        return createElement(
          resolveComponent(resolver, final, cacheKey, key),
          final.props
        );
      }
    };

    return Component
      ? createElement(Component, props)
      : (render || children)(props);
  };

  return fn(descriptor);
};
