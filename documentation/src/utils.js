import * as mui from '@material-ui/core';
import * as router from 'react-router-dom';
import React from 'react';
import { createModuleImporter } from '@zuze/react-ast';
import Interweave from 'interweave';
import Code from './components/Code';
import Tabs from './components/Tabs';
import WithStyles from './components/WithStyles';

export const delay = (by = 1000) => async (promise) => {
  const p = new Promise((resolve) => setTimeout(() => resolve(), by));
  const r = await promise;
  await p;
  return r;
};

const moduleImporter = createModuleImporter(
  async ({ module, component }) =>
    (await import(`./modules/${module}`))[component]
);

export const resolver = ({ module, component }) => {
  if (component === 'Code') return Code;
  if (component === 'Tabs') return Tabs;
  if (component === 'Interweave') return Interweave;
  if (component === 'LiveEditor')
    return moduleImporter({ module: 'live', component: 'Live' });

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
};

export const astRenderer = ({ render, descriptor, ...rest }) => {
  return descriptor.styles ? (
    <WithStyles {...rest} render={render} styles={descriptor.styles} />
  ) : (
    render()
  );
};

export const context = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/react-ast/' : ''
};