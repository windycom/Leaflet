import * as Util from '../core/Util';
import {TileLayer} from '../layer/tile/TileLayer.js';

export var TileLayerMulti = TileLayer.extend({
	_tileDefs: [],

	initialize: function (tileDefs, options) {
		TileLayer.prototype.initialize.call(this, undefined, options);
		var zoom = this.options.minZoom;
		for (var maxZoom in tileDefs) {
			var tileDef = this._fixTileDef(tileDefs[maxZoom]);

			for (;zoom <= maxZoom; zoom++) {
				this._tileDefs[zoom] = tileDef;
			}
		}
	},
	_fixTileDef: function(tileDef){
		var tdef = L.extend({}, {
			subdomains: L.TileLayer.prototype.options.subdomains
		}, tileDef);
		if (typeof tdef.subdomains === 'string') {
			tdef.subdomains = tdef.subdomains.split('');
		}
		return tdef;
	},
	_getSubdomain: function (tilePoint, subdomains) {
		var index = (tilePoint.x + tilePoint.y) % subdomains.length;
		return subdomains[index];
	},
	setUrl: function() {},
	getTileUrl: function (tilePoint) {
		var zoom = this._getZoomForUrl(),
			tileDef = this._tileDefs[zoom];
		// this._adjustTilePoint(tilePoint);

		return Util.template(tileDef.url, L.extend({
			s: this._getSubdomain(tilePoint, tileDef.subdomains),
			z: zoom,
			x: tilePoint.x,
			y: tilePoint.y
		}, this.options));
	}
});

export function tileLayerMulti(defs, options) {
	return new TileLayerMulti(defs,options);
}
