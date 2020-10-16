import { memo } from 'react';
import { createRenderer } from './createRenderer';
export { createImporter, createComponentResolver } from './utils';
export default memo(createRenderer);
