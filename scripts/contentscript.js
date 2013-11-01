'use strict';


//CSS to hide undesirable elements
var camo = '{display: none !important; position: absolute !important; top: -100000px !important; left: -100000px !important; }';


//Manifest of domains and the actions to take on each
var domains = {

    //Paypal
    'facebook.com': {
        hide: ['#pagelet_ego_pane']
    },

    //Paypal
    'paypal.com': {
        run: function(){
            if(document.location.pathname.indexOf('/clickthru/') > -1){
                document.location = '/cgi-bin/webscr?cmd=_account';
            }
        }
    },

    //Upworthy
    'upworthy.com': {
        hide: ['#slider', '.modal', '.modal-backdrop']
    }

};










//Get the domain we're on
var domain = (function(parts){
    return parts.slice(parts.length - 2).join('.');
})(document.location.host.split('.'));

//If the domain is listed, perform actions
if(domains[domain]){
    var props = domains[domain];

    //If there are elements to hide,
    if(props.hide){
        var style = (function(el){
            el.setAttribute('id', 'suw');
            el.setAttribute('type', 'text/css');
            return el;
        })(document.createElement('style'));
        style.innerHTML = props.hide.join(',') + camo;
        document.body.appendChild(style);
    }

    //If there's a run method,
    if(props.run){
        props.run();
    }

}



