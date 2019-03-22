
import {version} from '../package.json';
export {version};

// control
export * from './control/index';

// core
export * from './core/index';

// dom
export * from './dom/index';

// geometry
export * from './geometry/index';

// geo
export * from './geo/index';

// layer
export * from './layer/index';

// map
export * from './map/index';

import {freeze} from './core/Util';
Object.freeze = freeze;

// PATCH PATCH PATCH
import './windyPatches/Map.SingleClick';
import {TileLayerMulti, tileLayerMulti} from './windyPatches/TileLayer.Multi';

export {TileLayerMulti, tileLayerMulti};
