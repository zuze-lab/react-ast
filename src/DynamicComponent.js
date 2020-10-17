import { memo } from 'react';
import mergeDescriptors from './mergeDescriptors';
import createRenderer from './createRenderer';

const DynamicComponent = ({
  descriptor,
  context, // can be a function - if undefined then no interpolation parser
  interpolate = /\{\{(.+?)\}\}/,
  cmpKey = '$key',
  merge = mergeDescriptors,
  Component,
  render,
  children,
  resolver
}) => {
  // create the parsers as necessary
  // then call createRenderer with the parsers and the pass-thru props
  // then call the return function
  const renderer = createRenderer();
};

const m = memo(DynamicComponent);
