# Structure

**PLEASE NOTE: These JSON files are for *demonstrational purposes only***

This documentation site has been built with as few "real" components as possible (check out the [components directory](../components)) and has relied mainly on gluing together **raw** [material-ui](https://material-ui.com/), and [react-router-dom](https://reactrouter.com/web/guides/quick-start) components rendered directly via `<ReactAST/>`

This is **NOT** how you should aim to achieve `@zuze/react-ast` usage. 

The aim of this library is to encourage you to build your own **highly re-usable** components and "glue" those together using `<ReactAST/>`.

## Files

`main.json` is the entry point, `common.json` contains reusable variables and common component descriptor definitions (for consistent look and feel) that are made available to be interpolated into other files via the tiny [`<LazyAST/>`](../components/LazyAST.js) component.

The rest of the files are simply the routes.

