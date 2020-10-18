export const identity = (a) => a;
export const identityFactory = () => (a) => a;

export const get = (obj, path, def) => {
  const next = parts(path).reduce((acc, part) => (!acc ? acc : acc[part]), obj);
  return next === undefined ? def : next;
};

export const interpolate = (template, val, match) => {
  let shouldReplaceFull, found;

  const replaced = template.replace(match, (e, t) => {
    shouldReplaceFull = e === template;
    found = typeof val === 'function' ? val(t) : get(val, t);
    return shouldReplaceFull ? '' : found;
  });

  return shouldReplaceFull ? found : replaced;
};

const parts = (path) =>
  path.match(SPLIT_REGEX).map((part) => part.replace(CLEAN_QUOTES_REGEX, '$2'));

const SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g;
const CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/;
