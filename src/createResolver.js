// helper function to resolve a component to a react component
// AND keep a local cache (necessary when using async importer)
// by default we just return the `component` property of the descriptor
export default (
  resolver,
  cacheFn = ({ component }) => component,
  cache = {}
) => (descriptor) => {
  const k = cacheFn(descriptor);
  return cache[k] || (cache[k] = resolver(descriptor));
};
