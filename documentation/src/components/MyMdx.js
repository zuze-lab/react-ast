import React, { useState, useEffect } from 'react';
import Mdx from '@mdx-js/runtime';
import { Typography, Link } from '@material-ui/core';

const headers = (type) => (props) => <Typography variant={type} {...props} />;

const components = {
  h1: headers('h1'),
  h2: headers('h2'),
  h3: headers('h3'),
  h4: headers('h4'),
  h5: headers('h5'),
  h6: headers('h6'),
  a: (props) => <Link {...props} />
};

const MyMDX = ({ source, loading = 'Loading Markdown', ...rest }) => {
  const [doc, setDoc] = useState();
  useEffect(() => {
    let canceled;
    (async () => {
      try {
        canceled ||
          setDoc(
            await (
              await window.fetch(
                (await import(`../docs/${source}.mdx`)).default
              )
            ).text()
          );
      } catch {
        canceled || window.alert(`Couldn't retrieve ${source}`);
      }
    })();
    return () => (canceled = true);
  }, [source]);

  return <Mdx components={components}>{doc}</Mdx>;
};

export default MyMDX;
