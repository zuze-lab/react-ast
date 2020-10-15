import { traverse, get, stringifyPath } from './utils';

const createVarParser = (pattern, { context, components }, contextKey) => (
  descriptor,
  path
) =>
  traverse(
    descriptor,
    (v) => typeof v === 'string' && pattern.test(v),
    (v, nextPath) => {
      let fullReplacement;
      // if the pattern matches the string completely, then just replace
      const matched = v.match(pattern);

      // if the template is equal to a single interpolation point - e.g. '{full.name}'
      // then set a flag to return the full entity retrieved from the getter (full entity could be an array, object, or something else)
      const replaceFull = matched.length === 1 && matched[0] === v;

      console.log(context, components);
      // interpolation function
      const replaced = v.replace(pattern, (e, t) => {
        const from = t[0] === contextKey ? context : components;
        fullReplacement = get(from, from === context ? t.substr(1) : t, null);
        if (fullReplacement === null)
          throw new Error(
            `Could not perform interpolation of ${e} at path ${stringifyPath([
              ...path,
              ...nextPath
            ])}`
          );
        return replaceFull ? '' : fullReplacement;
      });

      return replaceFull ? fullReplacement : replaced;
    }
  );

const createRefParser = (dynamicCreator, cmpKey, merge, ast) => (
  descriptor,
  path
) =>
  traverse(
    descriptor,
    (v) => v && v[cmpKey],
    (r, nextPath) =>
      dynamicCreator(
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
  dynamicCreator,
  cmpKey,
  contextKey,
  context,
  pattern,
  merge
) => {
  // would be nicer to do this in a single traversal
  const varParser = createVarParser(pattern, context, contextKey);
  const refParser = createRefParser(dynamicCreator, cmpKey, merge, context);
  return (descriptor, path) => refParser(varParser(descriptor, path), path);
};