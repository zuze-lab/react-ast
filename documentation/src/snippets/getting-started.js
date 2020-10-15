// these strings are just easier to write in JS files
const usage = `
import React from 'react';
import ReactAST from '@zuze/react-ast'
const App = () => (
  <ReactAST 
    descriptor={{
      component:'div',
      props: { title: 'I\\'m a div' },
      children: [ 'Hello World!' ]
    }} 
    resolver={({component}) => component}
  />
)
`;

const usageFull = {
  imports: `
import React from 'react';
import ReactAST from '@zuze/react-ast'  
  `,
  code: `
const App = () => (
  <ReactAST 
    descriptor={{
      component:'div',
      props: { title: 'I\\'m a div' },
      children: [ 'Hello World!' ]
    }} 
    resolver={({component}) => component}
  />
)    
  `,
  live: `
render(<App/>)
  `
};

export { usage, usageFull };
