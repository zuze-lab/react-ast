import React from 'react';
const TestSpanComponent = (props) => (
  <>
    This is my test component!
    <span {...props} />
  </>
);

export { TestSpanComponent };
