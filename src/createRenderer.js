import { createElement } from 'react';
import { identity } from './utils';

// createRenderer accepts a component resolver, a parserCreator, and a render functions
// the render function is called with the an object containing descriptor and render
// Note: the render function must call the render function given to it (with optional props)
// in order to render the descriptor
export default ({
  render = ({ render }) => render(),
  resolver = ({ component }) => component,
  parse = identity
} = {}) => {
  const closure = (descriptor, ...rest) =>
    render(
      {
        descriptor,
        render: (innerProps = {}) => {
          const { props, ...final } = parse(
            {
              ...descriptor,
              props: {
                children: descriptor.children,
                ...descriptor.props,
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

  return closure;
};
