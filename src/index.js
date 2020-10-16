import { memo } from 'react';
import { createDynamicRenderer } from './createDynamicRenderer';
export { createModuleImporter, createComponentResolver } from './utils';
export default memo(createDynamicRenderer);
