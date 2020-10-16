# Structure

**PLEASE NOTE: These JSON files are for *demonstrational purposes only***

This documentation site has been built with as few "real" components as possible (check out the [components directory](../components)) and has relied mainly on gluing together **raw** [material-ui](https://material-ui.com/), and [react-router-dom](https://reactrouter.com/web/guides/quick-start) components rendered directly via `<ReactAST/>`

This is **NOT** how you should aim to achieve `@zuze/react-ast` usage. 

The aim of this library is to encourage you to build your own **highly re-usable** components and "glue" those together using `<ReactAST/>`.

## Files

`main.json` is the entry point, `common.json` contains common component descriptor definitions (for consistent look and feel)

The rest of the files are simply the routes.

You are encouraged to checkout out how they are parsed and rendered by looking at the tiny [`<LazyAST/>`](../components/LazyAST.js) component.

In short, the `MAIN` component from each file is given the `<ReactAST/>` as the `descriptor` prop and the rest of the file is passed as the `components` prop so they can be used for interpolation. 

