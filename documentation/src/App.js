import React from 'react';
import ReactAST from '@zuze/react-ast';
import { resolver, astRenderer, context } from './utils';
import skeleton from './asts/skeleton.json';

const App = () => {
  return (
    <>
      <ReactAST
        resolver={resolver}
        descriptor={skeleton.MAIN}
        components={skeleton}
        context={context}
      >
        {astRenderer}
      </ReactAST>
    </>
  );
};

export default App;
