import React from 'react';
import ReactAST from '@zuze/react-ast';
import { resolver, astRenderer, context } from '../utils';
import home from '../asts/home.json';

const Home = () => (
  <ReactAST
    resolver={resolver}
    descriptor={home.MAIN}
    components={home}
    context={context}
  >
    {astRenderer}
  </ReactAST>
);

export { Home };
