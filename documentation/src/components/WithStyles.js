import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HookComponent from './HookComponent';

const WithStyles = ({ render, styles }) => (
  <HookComponent
    render={render}
    hooks={[
      {
        use: makeStyles(styles),
        process: (classes) => ({ className: classes.root, classes })
      }
    ]}
  />
);

export default WithStyles;
