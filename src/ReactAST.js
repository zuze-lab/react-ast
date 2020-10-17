import React from 'react';
import { get } from './utils';
import DynamicComponent from './DynamicComponent';

const ReactAST = ({
  components,
  context,
  contextKey = '$',
  root = 'MAIN',
  ...props
}) => (
  <DynamicComponent
    descriptor={components[root]}
    path={[root]}
    context={(path) => {
      const from = path[0] === contextKey ? context : components;
      const f = { [path]: get(from, from === context ? path.substr(1) : path) };
      console.log(path, f);
      return f;
    }}
    {...props}
  />
);

export default ReactAST;
