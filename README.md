# Windy's patched version of Leaflet library

Changes applied:

**Added:**
 * src/windyPatches/Map.SingleClick.js
 * src/windyPatches/TileLayer.Multi.js

**Patched**
A nasty hack enable to touch zoom with some specified
`x,y` point "locked" at its position. For instance weather picker
at Windy.com.

Looks ugly, no animation, but it works.

```js
var TouchZoom = Handler.extend({

	// ...

	// Patched by Windy
	_onTouchMove: function (e) {

		// ..

		if( map._zoomCenter ) {
			var myZoom_ = Math.round( this._zoom )

			// ..

			if( myZoom_ !== map.getZoom() ) {
				map.setZoomAround( map._zoomCenter, myZoom_, { animate: true });
			}
			preventDefault(e);
			return
		}

		// ..

	}
```

Another patch solves this issue https://github.com/Leaflet/Leaflet/issues/3575

```js
function setTransform(el, offset, scale) {
	var pos = (offset && offset.round()) || new Point(0, 0);

	// ...
}
```

This patch solves wrong detection of pointer Events browser in iOS. https://github.com/Leaflet/Leaflet/issues/6817

```js
// @property pointer: Boolean
// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
// 'false' for all iOS devices, that (as of version iOS13 support both, touch and poiter events)
export var pointer = !!(window.PointerEvent || msPointer) && (window.W && (window.W.target !== 'mobile'))
		&& !userAgentContains('iphone')
		&& !(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
```
