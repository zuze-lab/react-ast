import React from 'react';
import ReactAST from '@zuze/react-ast';
import { resolver, astRenderer } from '../utils';
import ast from '../asts/getting-started.json';
import * as snippets from '../snippets/getting-started';

export default () => (
  <ReactAST
    resolver={resolver}
    descriptor={ast.MAIN}
    components={ast}
    context={{ snippets }}
  >
    {astRenderer}
  </ReactAST>
);
