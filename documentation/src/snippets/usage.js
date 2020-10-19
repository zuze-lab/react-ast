// no reason why this can't be in the AST - it's just easier to write in JS
export default {
  imports: `
import React from 'react';
import ReactAST from '@zuze/react-ast'
`,
  code: `
const App = () => (
  <ReactAST 
    components={{
      MAIN:{
        component: 'div',
        props: { 
          title: 'I\\'m a div' 
        },
        children: [ 
          'Hello World!' 
        ]
      }
    }} 
    resolver={({component}) => component}
  />
)
`,
  live: `
render(<App/>)
`
};
