import { createElement } from 'react';

/*

const SomeComp = (props) => {...return some jsx}

const useHookA = () => {
    const [state,setState] = useState();
    return state;
}

const useHookB = ({fromHookA}) => {
    ...
}

const App = () => (
    <HookComponent
        Component={SomeComp}
        hooks={[
            {
                use:useHookA,
                process:state => ({fromHookA:state})
            },
            {
                use:useHookB,
            }
        ]}
        {
            // could also use render or child as a function 

        }
        render={(props) => {...}}
    >
        {(props) => { ... }}
    </>
)


*/

const identity = (a) => a;
const processHooks = (hooks) =>
  hooks.reduce(
    (acc, { use, process = identity }) => ({ ...acc, ...process(use(acc)) }),
    {}
  );

const HookComponent = ({ hooks = [], render, children, Component }) =>
  (Component ? (props) => createElement(Component, props) : render || children)(
    processHooks(hooks)
  );

export default HookComponent;
