import { traverse, get, stringifyPath } from './utils';

const createVarParser = (pattern, { context, components }, contextKey) => (
  descriptor,
  path
) =>
  traverse(
    descriptor,
    (v) => typeof v === 'string',
    (v, nextPath) => {
      let full;
      const replaced = v.replace(pattern, (e, t) => {
        const from = t[0] === contextKey ? context : components;
        const replacement = get(from, from === context ? t.substr(1) : t);
        if (replacement === undefined)
          throw new Error(
            `Could not perform interpolation of ${e} at path ${stringifyPath([
              ...path,
              ...nextPath
            ])}`
          );

        full = e === v ? replacement : null;
        return e === v ? '' : replacement;
      });

      return full || replaced;
    }
  );

const createRefParser = (creator, cmpKey, merge) => (descriptor, path) =>
  traverse(
    descriptor,
    (v) => v && v[cmpKey],
    (r, nextPath) =>
      creator(
        merge(
          ...Object.entries(r).reduce(
            (acc, [k, v]) =>
              k === cmpKey ? [v, ...acc] : [...acc, { [k]: v }],
            []
          )
        ),
        [...path, ...nextPath]
      )
  );

// parsers traverse descriptor objects and modify them
export const createParser = (
  creator,
  cmpKey,
  contextKey,
  context,
  pattern,
  merge
) => {
  // would be nicer to do this in a single traversal
  const varParser = createVarParser(pattern, context, contextKey);
  const refParser = createRefParser(creator, cmpKey, merge);
  return (descriptor, path) => refParser(varParser(descriptor, path), path);
};
