import { lazy } from 'react';
export const isPlain = (w) =>
  !w ||
  typeof w === 'function' ||
  typeof w === 'number' ||
  typeof w === 'boolean' ||
  typeof w === 'string';

export const stringifyPath = (path) => path.join('//');

export const createModuleImporter = (importer) => (descriptor) =>
  lazy(async () => ({ default: await importer(descriptor) }));

export const mergeDescriptors = (first, ...rest) =>
  rest.reduce(
    (acc, { props, ...rest }) => ({
      ...acc,
      ...rest,
      props: { ...acc.props, ...(props || {}) }
    }),
    first
  );

export const traverse = (what, test, then, path = []) =>
  test(what)
    ? then(what, path)
    : isPlain(what)
    ? what
    : Array.isArray(what)
    ? what.map((w, i) => traverse(w, test, then, [...path, i]))
    : Object.entries(what).reduce(
        (acc, [k, v]) => ({
          ...acc,
          [traverse(k, test, then, path)]: traverse(v, test, then, [...path, k])
        }),
        {}
      );

// Component Cache - TO DO: this is global and ugly - we should fix it
const cache = {};

export const resolveComponent = (resolver, descriptor, cacheKey, fallback) => {
  const k = descriptor[cacheKey] || fallback;
  return cache[k] || (cache[k] = resolver(descriptor));
};

export const get = (obj, path, def) => {
  const next = parts(path).reduce((acc, part) => (!acc ? acc : acc[part]), obj);
  return next === undefined ? def : next;
};

const parts = (path) =>
  path.match(SPLIT_REGEX).map((part) => part.replace(CLEAN_QUOTES_REGEX, '$2'));

const SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g;
const CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/;
