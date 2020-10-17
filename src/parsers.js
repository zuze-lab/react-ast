import { interpolate } from './utils';
import traverse from './traverse';

const component = (key, merge, creator, descriptor, path) =>
  traverse(
    descriptor,
    (value, path) =>
      // if the value being transformed has a property that is
      // supposed to be parsed into a dynamic component
      // then call the creator function and merge in any
      // other properties on this value according to merge
      value && value[key]
        ? creator(
            merge(
              ...Object.entries(value).reduce(
                (acc, [k, v]) =>
                  k === key ? [v, ...acc] : [...acc, { [k]: v }],
                []
              )
            ),
            path
          )
        : undefined,
    path
  );

const interpolation = (match, context, thing) =>
  // if there is no context, don't both traversing
  context
    ? // otherwise traverse and interpolate all strings
      // using the library
      traverse(thing, (v) =>
        typeof v === 'string' ? interpolate(v, context, match) : undefined
      )
    : thing;

export { interpolation, component };
