import * as Util from '../core/Util';
import {Map} from '../map/Map.js';

// Extends a L.Map with single click event
// https://github.com/Alpstein/leaflet-singleclick_0.7/
Map.addInitHook( function () {

    var that = this
    ,   h
    ;

    if (that.on)
    {
        that.on( 'click',    check_later );
        that.on( 'dblclick', function () { setTimeout( clear_h, 0 ); } );
    }

    function check_later( e )
    {
        clear_h();

        h = setTimeout( check, 500 );

        function check()
        {
            that.fire( 'singleclick', Util.extend( e, { type : 'singleclick' } ) );
        }
    }

    function clear_h()
    {
        if (h != null)
        {
            clearTimeout( h );
            h = null;
        }
    }

});
