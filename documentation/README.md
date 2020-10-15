## Documentation

The [documentation site](https://zuze-lab.github.io/react-ast/) was built using `@zuze-lab/react-ast`. You can find the ASTs used for the routes in the documentation in the `ast` directory.

**NOTE:** these ASTs are intended to be an example of what you **can do** - not what you **should do** - with @zuze-lab/react-ast.

The documentation site purposely uses **as few** userland components as possible. It's recommended to keep creating good, resuable building-block components and render those from the AST instead of rawly rendering components out of libraries.

This example was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).