import { createElement } from 'react';
import { identityFactory } from './utils';

export default ({
  Component,
  render = ({ render }) => render(),
  resolver = ({ component }) => component,
  parserCreator = identityFactory
} = {}) => {
  const parse = parserCreator((...args) => fn(...args));

  const fn = (descriptor) => {
    const props = {
      descriptor,
      render: (innerProps = {}) => {
        const final = parse({
          ...descriptor,
          props: {
            children: descriptor.children,
            ...descriptor.props,
            ...innerProps
          }
        });
        return createElement(resolver(final), final.props);
      }
    };

    return Component ? createElement(Component, props) : render(props);
  };

  return fn;
};
