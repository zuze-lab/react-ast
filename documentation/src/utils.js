import * as mui from '@material-ui/core';
import * as router from 'react-router-dom';
import React from 'react';
import { createImporter, createResolver } from '@zuze/react-ast';
import Interweave from 'interweave';
import Code from './components/Code';
import Tabs from './components/Tabs';
import WithStyles from './components/WithStyles';
import { LazyAST } from './components/LazyAST';
import { Snippet } from './components/Snippet';
import MyMdx from './components/MyMdx';

const moduleImporter = createImporter(
  async ({ module, component }) =>
    (await import(`./modules/${module}`))[component]
);

export const resolver = createResolver(
  ({ module, component }) => {
    if (component === 'Snippet') return Snippet;
    if (component === 'LazyAST') return LazyAST;
    if (component === 'Code') return Code;
    if (component === 'Tabs') return Tabs;
    if (component === 'Interweave') return Interweave;
    if (component === 'MDX') return MyMdx;

    switch (module) {
      case undefined:
        return component;
      case 'react':
        return React[component];
      case 'mui':
        return mui[component];
      case 'router':
        return router[component];
      default:
        return moduleImporter({ module, component });
    }
  },
  ({ module, component }) => `${module}${component}`
);

export const astRenderer = ({ render, descriptor, ...rest }) => {
  return descriptor.styles ? (
    <WithStyles {...rest} render={render} styles={descriptor.styles} />
  ) : (
    render()
  );
};

export const context = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/react-ast/' : '',
  GITHUB: 'https://github.com/zuze-lab/react-ast'
};
