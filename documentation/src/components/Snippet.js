import React, { useState, useEffect } from 'react';
import { Live } from './Live';

export const Snippet = ({ source, loading = 'Loading Snippet', ...rest }) => {
  const [snippet, setSnippet] = useState();
  useEffect(() => {
    let canceled;
    (async () => {
      try {
        const { code, imports, live } = (
          await import(`../snippets/${source}`)
        ).default;
        canceled || setSnippet({ code, imports, live });
      } catch {
        canceled || window.alert(`Couldn't retrieve snippet ${source}`);
      }
    })();
    return () => (canceled = true);
  }, [source]);

  return snippet ? <Live {...snippet} {...rest} /> : loading;
};
