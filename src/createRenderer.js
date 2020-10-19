import { createElement } from 'react';
import { identity } from './utils';

// createRenderer accepts a component resolver, a parse, and a render functions
// the render function is called with the an object containing descriptor and render
// Note: the render function must call the render function given to it (with optional props)
// in order to render the descriptor
export default ({
  render = ({ render }) => render(),
  resolver = ({ component }) => component,
  parse = identity
} = {}) => {
  const closure = (descriptor, ...rest) => {
    if (!descriptor) throw new Error(`A component descriptor was not provided`);
    return render(
      {
        descriptor,
        render: (innerProps = {}, modified = descriptor) => {
          const { props, ...final } = parse(
            {
              ...modified,
              props: {
                children: modified.children,
                ...modified.props,
                ...innerProps
              }
            },
            closure,
            ...rest
          );
          return createElement(resolver(final), props);
        }
      },
      ...rest
    );
  };

  return closure;
};
