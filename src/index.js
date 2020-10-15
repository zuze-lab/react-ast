import { memo } from 'react';
import { createDynamicRenderer } from './createDynamicRenderer';
export { createModuleImporter } from './utils';
export default memo(createDynamicRenderer);
