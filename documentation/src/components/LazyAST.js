import React, { useState, useEffect } from 'react';
import ReactAST from '@zuze/react-ast';
import { resolver, context, astRenderer } from '../utils';
import common from '../asts/common';

export const LazyAST = ({ source, loading = null }) => {
  const [props, setProps] = useState();
  useEffect(() => {
    let canceled;
    (async () => {
      try {
        const components = (await import(`../asts/${source}.json`)).default;
        if (canceled) return;
        // NOTE - pass the MAIN component as the descriptor prop
        // and pass the rest of the components as the components prop
        // We will also pass the common components json file to allow
        // reuse of common component definitions using interpolation
        setProps({ root: 'MAIN', components: { ...components, common } });
      } catch (err) {
        console.log(err);
        if (canceled) return;
        window.alert(
          `An error occurred when trying to retrieve and render ${source}.json`
        );
      }
    })();
    return () => (canceled = true);
  }, [source]);

  return props ? (
    <ReactAST {...props} resolver={resolver} context={context}>
      {astRenderer}
    </ReactAST>
  ) : (
    loading
  );
};
