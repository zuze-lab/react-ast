import React from 'react';
import { mount } from 'enzyme';
import DynamicComponent from './DynamicComponent';

const MyTestComponent = ({ render, descriptor, getKey }) => {
  return render({ key: getKey() });
};

describe('DynamicComponent', () => {
  it('should work', () => {
    const descriptor = {
      component: 'div',
      children: [
        '{{user}}',
        {
          $cmp: {
            component: 'span',
            children: ['bill']
          }
        },
        {
          $cmp: '{{descriptor}}',
          props: {
            title: '{{user}}'
          }
        }
      ]
    };

    console.log(
      mount(
        <DynamicComponent
          descriptor={descriptor}
          context={{
            user: 'joe',
            descriptor: {
              component: 'div',
              children: ['{{user}}']
            }
          }}
        />
      ).html()
    );
  });
});
