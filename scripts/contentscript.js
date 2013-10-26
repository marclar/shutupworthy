'use strict';

var bogeys = ['#slider', '.modal', '.modal-backdrop'];

var camo = '{display: none !important; position: absolute !important; top: -100000px !important; left: -100000px !important; }';

var style = (function(el){
    el.setAttribute('id', 'suw');
    el.setAttribute('type', 'text/css');
    return el;
})(document.createElement('style'));

style.innerHTML = bogeys.join(',') + camo;

document.body.appendChild(style);

