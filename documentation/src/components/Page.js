import React from 'react';
import { withStyles } from '@material-ui/core';

const Page = ({ classes, header, footer, children }) => (
  <div>
    <div className={classes.root}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{children}</div>
      <div className={classes.footer}>{footer}</div>
    </div>
  </div>
);

export default withStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: theme.palette.background.default
  },

  header: {
    flex: '0 0 auto'
  },

  footer: {
    flex: '0 0 auto'
  },

  content: {
    flex: '1 0 auto'
  }
}))(Page);
