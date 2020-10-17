export default (resolver, cacheFn = ({ component }) => component) => {
  const cache = {};
  return (descriptor) => {
    const k = cacheFn(descriptor);
    return cache[k] || (cache[k] = resolver(descriptor));
  };
};
