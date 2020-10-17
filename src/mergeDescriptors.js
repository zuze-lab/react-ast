// by default, we shallow merge descriptors,
// except for at the props key which is shallow merged
export default (first = {}, ...rest) =>
  rest.length
    ? rest.reduce(
        (acc, { props = {}, ...rest }) => ({
          ...acc,
          ...rest,
          props: { ...(acc.props || {}), ...props }
        }),
        first
      )
    : first;
