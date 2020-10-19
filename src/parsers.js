import { interpolate } from './utils';
import { traverse, isTraverseable } from './traverse';

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

const interpolation = (match, context, thing, path) => {
  const log = typeof context !== 'function';
  // if there is no context, don't both traversing
  return context
    ? // otherwise traverse and interpolate all strings
      // using the library
      traverse(thing, (v) => {
        if (typeof v !== 'string') return undefined;
        const next = interpolate(v, context, match);
        log && console.log(thing, v, next);
        if (next === undefined)
          throw new Error(`Failed to interpolate ${v} at ${path.join('//')}`);
        // recursively interpolate
        return isTraverseable(next) ||
          (typeof next === 'string' && next.match(match))
          ? interpolation(match, context, next, path)
          : next;
      })
    : thing;
};

export { interpolation, component };
