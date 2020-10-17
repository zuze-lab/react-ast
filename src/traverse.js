// traverses an entity with a transform function
// if the transform function returns a value
// OR the value is a leaf node

const isTraverseable = (w) =>
  !(
    !w ||
    typeof w === 'function' ||
    typeof w === 'number' ||
    typeof w === 'boolean' ||
    typeof w === 'string'
  );

const traverseArray = (arr, using) =>
  arr.reduce((acc, item, i) => {
    const next = using(item, i);
    return next !== item ? [...acc].splice(i, 1, next) : acc;
  }, arr);

const traverseObject = (o, using) =>
  Object.entries(o).reduce((acc, [k, v]) => {
    const key = using(k);
    const value = using(v, key);

    return key !== k || v !== value ? { ...acc, [key]: value } : acc;
  }, o);

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
