import traverse from './traverse';
export default (key, merge) => (creator) => (descriptor, path) =>
  traverse(
    descriptor,
    (value, path) =>
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
