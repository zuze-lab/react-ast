// traverses an entity with a transform function
// if the transform function returns a value
// OR the value is a leaf node

const isTraverseable = (w) =>
  w &&
  typeof w !== 'function' &&
  typeof w !== 'number' &&
  typeof w !== 'boolean' &&
  typeof w !== 'string';

const traverseArray = (arr, using) => {
  let transformed = false;
  const next = arr.map((item, i) => {
    const mapped = using(item, i);
    transformed = transformed || mapped !== item;
    return mapped;
  });
  return transformed ? next : arr;
};

const traverseObject = (o, using) => {
  let transformed = false;
  const next = Object.entries(o).reduce((acc, [k, v]) => {
    const key = using(k);
    const value = using(v, key);
    transformed = transformed || key !== k || v !== value;
    return { ...acc, [key]: value };
  }, {});
  return transformed ? next : o;
};

const traverse = (what, transform, path = []) => {
  const transformed = transform(what, path);
  return transformed !== undefined
    ? transformed
    : !isTraverseable(what)
    ? what
    : Array.isArray(what)
    ? traverseArray(what, (v, i) => traverse(v, transform, [...path, i]))
    : traverseObject(what, (v, key) =>
        traverse(v, transform, key === undefined ? path : [...path, key])
      );
};

export default traverse;
