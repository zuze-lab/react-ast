# @zuze/react-ast: For creating highly configurable react applications


[![NPM](https://img.shields.io/npm/v/@zuze/react-ast.svg)](https://www.npmjs.com/package/@zuze/react-ast) 
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/react-ast/badge.svg)](https://coveralls.io/github/zuze-lab/react-ast)
[![Build Status](https://travis-ci.org/zuze-lab/react-ast.svg)](https://travis-ci.org/zuze-lab/react-ast)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/@zuze/react-ast)](https://bundlephobia.com/result?p=@zuze/react-ast)

## Check out the 📕 [official documentation](https://zuze-lab.github.io/react-ast/) 📕

## What's this?

A pretty straightforward recursive renderer with a tiny amount of syntactic sugar (using `$cmp` and interpolation!) to compile building block components into complete react applications. Used to develop low-code application frameworks OR to quickly deploy to "hotspots" in existing applications where you need maximum configurability.

## Why?

Building high quality, highly reusable components is the best approach to [react](https://reactjs.org/) (or [any](https://angular.io/) [other](https://vuejs.org/) [component-based](https://flutter.dev/) [UI framework](https://svelte.dev/)).

`@zuze/react-ast` was built with the goal of having non-technical users build multiple, complete applications using [low code](https://en.wikipedia.org/wiki/Low-code_development_platform) concepts. 

The rest of this README is geared towards technical users and how to implement `@zuze/react-ast`. After implementing `@zuze/react-ast`, you'll need to create your own documentation (hopefully we can help with that too!) about what components are available for your non-technical users to configure and how they can be configured.



## Install

```bash
# npm
npm install @zuze/react-ast

# yarn
yarn add @zuze/react-ast
```

## Usage

### Simple Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAST from '@zuze/react-ast'

const App = () => (
  <ReactAST 
    components={{
      MAIN: {
        component: 'h1',
        children: ['Hello World']
      }
    }}
  />
);

ReactDOM.render(<App/>, document.getElementById('root'));
```

### Nesting Components

Creating components dynamically is done with the special key `$cmp` in your JSON (configurable via the `cmpKey` prop).

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAST from '@zuze/react-ast'

const App = () => (
  <ReactAST 
    components={{
      MAIN: {
        component: 'h1',
        children: [
          'Please click on this ',
          {
            $cmp: {
              component: 'a'
              props: {
                href: 'https://www.google.com'
              },
              children:['link to Google']
            }
          }
        ]
      }
    }}
  />
);

ReactDOM.render(<App/>, document.getElementById('root'));

// Output <h1>Please click on this <a href="https://www.google.com">link to google</a></h1>
```


## Props

- `components: { [key: string]: ComponentDescriptor }` - A map of `ComponentDescriptors`
- `root: = 'MAIN'` - The key of the `ComponentDescriptor` to start rendering
- `resolver: ComponentResolver` - Given a `ComponentDescriptor`, return a Component
- `Component?: ReactElement` - Render a descriptor using a Component
- `render?: Renderer` - Render a descriptor using a function
- `children?: Renderer` - Alternate way to render a descriptor using a function
  
### Advanced Props
- `cmpKey = '$cmp'` - Object key the will yield dynamic components.
- `merge?: (...ComponentDescriptors) => ComponentDescriptor` - merge function used to combine `ComponentDescriptors` when using interpolated `$cmp`'s - see [merging](#merging).
- `interpolate: RegExp = /\{\{(.+?)\}\}/g` - Pattern which will be used to interpolate variables
- `context: {[key: string]: any} = {}` - Context that can be used for interpolation patterns - e.g. `{{some_string}}`
- `contextKey: string = $` - When interpolating, do it from `context` - e.g. `{{$string_from_context}}`

## Interpolation and Context

Interpolation and context is at the very core of `@zuze/react-ast`. Simply, it works like this:

```jsx
const App = () => (
   <ReactAST 
      components={{
        MAIN: {
          component: 'div',
          children: [ 'Hi {{$user}}!' ]
        }
      }} 
      context={{
        user:'joe'
      }}
  />
);

// outputs <div>Hi joe!</div>
```

Interpolation is not just for strings. You can interpolate functions:

```js


const App = () => (
   <ReactAST 
      components={{
        MAIN: {
          component: 'div',
          props: {
            onClick: '{{$showAlert}}'
          },
          children: [ 'Hi {{$user}}!' ]
        }        
      }} 
      context={{
        user: 'joe'
        showAlert: () => {
          alert('clicked');
        }
      }}
  />
);

// outputs <div>Hi joe!</div>
```

... arrays:

```js

const App = () => (
   <ReactAST 
      components={{
        MAIN: {
          component: 'div',
          children: '{{$friends}}'
        }
      }} 
      context={{
        friends: ['joe','bill','sam']
      }}
  />
);

// outputs <div>joebillsam</div>
```

...full objects:

```jsx

const App = () => (
   <ReactAST 
      components={{
        MAIN: {
          component: 'div',
          children: [ 
            'Hi {{$user}}!',
            {
              $cmp: '{{ANOTHER_DIV}}'
            }
          ]
        },
        ANOTHER_DIV: {
          component: 'div',
          children: ['Im another div']
        }
      }}
  />
);

// outputs <div>Hi joe! <div>Im another div</div></div>
```

... which can be used to create composable dynamic components (🎉🎉🎉):

```jsx
const App = () => (
   <ReactAST 
      components={{
        MAIN: {
          component: 'div',
          children: [ 
            {
              $cmp: '{{TITLE_CMP}}',
              children: ['Hi {{$user}}!']
            }
          ]
        }
        TITLE_CMP: {
          component: 'h1',
          props: {
            title: 'Im a heading'
          }
        }
      }}
      context={{
        user: 'joe'
      }}
  />
);

// outputs <div><h1 title="Im a heading">Hi joe!</h1></div>
```

### Merging

When combining component descriptors in the way detailed above, the `merge` prop is used. By default, component descriptors are just shallow merged with the exception of the `props` key. `props` will be merged one level deep:

```js
// example
const App = () => (
   <ReactAST 
      components={{
        MAIN: {
          component: 'div'
          children: [
            {
              $cmp: "SECOND",
              props: {
                propA: 'New A',
                propB: 'New B',
              }
            },
            {
              $cmp: "SECOND",
              props: {
                propD: 'New D',
              },
              children: ['Child 1','Child 2']
            }      
          ]
        },
        SECOND: {
          component: 'span',
          props: {
            propA: 'Original A',
            propD: 'Original D',
          },
          children: ['Original Child']
        }
      }}
  />
);

/*

<div>
  <span propA="New A" propB="New B" propD="Original D">Original Child</span>
  <span propA="OriginalA" propD="New D">Child1Child2</span>
</div>

*/

```


## Types

### ComponentMap

A ComponentMap is a key-value map of `ComponentDescriptor`s. The string `keys` are referred to as `ComponentIdentifier`s

```js
{
  [key: string]: ComponentDescriptor
}

// example
<ReactAST
  components={{
    MAIN: {
      component:'div',
      children:[ 
        { 
          $cmp: '{{OTHER_COMPONENT}}}' 
        } 
      ]    
    },
    OTHER_COMPONENT: {
      component: 'span',
      children: [ 'Hello World!' ]
    }
  }}
/>

// output
// <span>Hello World!</span>
```

### ComponentDescriptor

Only `props` and `children` are treated as special keys in a `ComponentDescriptor`. It is encouraged to use `component` and `module`, but as long as your [`resolver`](#componentresolver) can return a component given a `ComponentDescriptor`, then naming isn't critical.

```js
{
  component: string,
  props?: { [key: string]: any },
  children?: any[],
  [key: string]: any
}

// example of a host component (no module)
<ReactAST
  components={{
    MAIN: {
      component: 'span',
      props: { 
        title: 'My Span Title' 
      },
      children: [ 'Hello world!' ]
    }
  }}
/>

// output
// <span title="My Span Title">Hello World!</span>
```


### DynamicComponents

A DynamicComponent is simply a resolved `ComponentDescriptor` to a React Component. They are created using the `$cmp` keyword (configurable using the `cmpKey` prop).

```js
{
  $cmp: ComponentDescriptor
}



<ReactAST
  components={{
    MAIN: {
      component: 'div',
      children: [
        {
          $cmp: {
            component: 'span',
            props: {
              title: 'My Span Title',
            },
            children: [ 'Hello World!' ]
          }
        }
      ]
    }
  }}
/>

// Output
// <div><span title="My Span Title">Hello World</span></div>

```

### ComponentResolver

So far, we've just been rendering HTML, pretty useless stuff. Let's supercharge our capabilities with a `ComponentResolver`

`ComponentResolver: (descriptor: ComponentDescriptor) => ReactElement`

Very simple, a `ComponentResolver` is passed the `ComponentDescriptor` and returns a React component.


```js
// type
// (descriptor: ComponentDescriptor) => ReactElement;

// example using a module property on the component descriptor
import * as mui from `@material-ui/core`;

const resolver = ({component}) => {
  if(component === 'MuiButton') return mui.Button;
  throw new Error(`Component ${component} could not be found!`);
}

<ReactAST
  resolver={resolver}
  components={{
    MAIN: {
      component: 'MuiButton',
      props: {
        variant: 'contained'
      },
      children: [ 'Click Me!' ]
    }
  }}
/>

```

A highly useful pattern is to specify a `module` property on your component descriptor:

```js
// example using a module property on the component descriptor
import * as mui from `@material-ui/core`;

const resolver = ({module,component}) => {
  if(module !== 'mui') throw new Error(`Component ${component} could not be found!`);
  return mui[component];
}

<ReactAST
  resolver={resolver}
  components={{
    MAIN: {
      component: 'Button',
      module:'mui',
      props: {
        variant: 'contained'
      },
      children: [ 'Click Me!' ]
    }
  }}
/>
```

#### Code Splitting with Module Resolvers

To set up your [create-react-app](https://github.com/facebook/create-react-app) for code splitting, all you need to do is put a `jsconfig.json` file in your base directory and put this in it:

```js
{
  "baseUrl": "src"
}
```

Now you can use a [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) in your resolver:

```js
import { createImporter, createComponentResolver } from '@zuze/react-ast';
const importer = createImporter(({ component }) => import(`./components/${component}`));
// the `resolver` prop
const resolver = createComponentResolver(importer);
```


**NOTE**: In order to tell webpack what bundles need to be generated, it's critical that the dynamic import have a fixed prefix - hence `./components/${component}`. If we just did `import(component)` - webpack would not be able to determine what bundles need to be generated.

**NOTE 2**: It is **necessary** to wrap your resolver in `createComponentResolver` when dynamically importing components. [find out why](#createComponentResolver)

### Renderer

```js
({ render: (props = {}) => any, descriptor: ComponentDescriptor, key: string }) => any
```

A `Renderer` - given as either a `Component` or the `render` or `children` prop - is used when extra processing that can't be encoded in the AST may need to be happen. For those familiar with [material-ui](https://material-ui.com/), an example might be a `theme`:

```js
import * as mui from `@material-ui/core`;
const resolver = ({module,component}) => {
  if(module !== 'mui') 
    throw new Error('Can only use components exported by material-ui');
  return mui[component];
}

const { ThemeProvider } = mui;

<ReactAST
  components={{
    MAIN: {
      component: 'Button',
      module: 'mui',
      props: {
      	variant: 'contained',
      },
      children: [ 'Hello World MUI Button!' ],
      theme: {
      	colors: {
      		primary: 'red'
      	}
      }
    }
  }}
  render={({
  	render,
    descriptor,
    key
  }) => <ThemeProvider key={key} theme={descriptor.theme}>{render()}</ThemeProvider>}
/>
```

**NOTE:** If you are wrapping the output of the render function in another component, like above, you'll need to pass in the `key` parameter to avoid warnings in development about not supplying keys.

You can additionally pass props to the `render` function that will end up in the component described in the AST:

```js
<ReactAST
  components={{
    MAIN: {
      component: 'Button',
      module: 'mui',
      props: {
        variant: 'contained',
      },
      children: [ 'Hello World MUI Button!' ]
    }
  }}
  render={({render}) => render({onPress:() => alert('Pressed')})}  
/>
```

As a `Component` (example using [material-ui/styles solution](https://material-ui.com/styles/basics/#adapting-the-hook-api)):

```js
import { makeStyles } from '@material-ui/styles';

const UseStylesCmp = ({useStyles,children,...rest}) => children({
  ...rest,
  classes:useStyles()
})

const MyRendererComponent = ({key,render,descriptor}) => {
  // when using a Component as a renderer, you can use hooks/state/context!
  const someProps = useSomeCustomHook(descriptor);
  return (
    <UseStylesCmp 
      {...someProps} 
      useStyles={makeStyles(descriptor.styles)}
    >{render}</UseStyles>
}

<ReactAST
  components={{
    MAIN: {
      component: 'Button',
      module: 'mui',
      props: {
        variant: 'contained',
      },
      styles: {
        root: {
          background: 'blue'
        }
      },
      children: [ 'Hello World MUI Button!' ]
    }
  }}
  Component={MyRendererComponent}
/>


```

### `createComponentResolver`

It's **critical** that the same component is always returned from the `resolver` given the same descriptor. Otherwise, components will be unmounted and state will be lost. `createComponentResolver` maintains an internal `cache` that can be configured by supplying the second parameter to `createComponentResolver`

```js
createComponentResolver(resolver: Resolver, cacheFn: (descriptor) => string = ({component}) => component)
```

The `cacheFn` function accepts a `ComponentDescriptor` and must return a `string`. By default it uses the `component` field.

It's only necessary to use this function if you are dynamically importing components using `createImporter` because the importer creates a [`React.lazy`](https://reactjs.org/docs/code-splitting.html#reactlazy) component. This **same** `React.lazy` component instance must always be returned.

`createImporter` (and `React.lazy`) is just **one way** to utilize code-splitting, but it's not the only way. We utilize code splitting in our [LazyAST](https://github.com/zuze-lab/react-ast/blob/main/documentation/src/components/LazyAST.js) and [Snippet](https://github.com/zuze-lab/react-ast/blob/main/documentation/src/components/Snippet.js) components for our documentation site without using `React.lazy`

## License

MIT © [akmjenkins](https://github.com/akmjenkins)
