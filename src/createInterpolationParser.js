import { interpolate } from '@zuze/interpolate';
import traverse from './traverse';

export default (match, using) => () => (thing) =>
  traverse(thing, (v) =>
    typeof v === 'string' ? interpolate(v, using, { match }) : undefined
  );
