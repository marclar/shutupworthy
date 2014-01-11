'use strict';

//CSS to hide undesirable elements
var camo = '{display: none !important; position: absolute !important; top: -100000px !important; left: -100000px !important; }';

function appendStyle(css){
    var style = document.createElement("style");
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
};

//Manifest of domains and the actions to take on each
var domains = {

    //Amazon
    "amazon.com": {
        "hide": ["#cart-upsell"]
    },

    //Facebook
    "facebook.com": {
        "hide": ["#pagelet_ego_pane", ".ego_column"]
    },

    //Forbes
    "forbes.com": {
        "hide": [".forbes_flyer"]
    },

    //Google properties
    "google.com": {
        "run": function(){

            //Skip the stupid GA landing page
            if(document.location.pathname === '/analytics/'){
                document.location = 'https://www.google.com/analytics/web/?hl=en';
            }
        }
    },

    //Intercom
    "intercom.io": {
        "run": function(){

            //Define the polling function
            var checkForNewConversation = function(){

                var table = document.getElementById('conversationTable');
                if(table){

                    //Get the most recent id
                    var key = 'latestConversationId';
                    var latestId = document.querySelector('#conversationTable tbody tr').getAttribute('id');
                    chrome.storage.sync.get(key, function(obj){

                        if(obj[key] == latestId){

                            //Check again
                            setTimeout(checkForNewConversation, 5000);

                        }
                        else{

                            //Store the latest id
                            var latest = {};
                            latest[key] = latestId;
                            chrome.storage.sync.set(latest, function(){

                                //Open an alert
                                alert('New conversation!');

                                //Check again
                                setTimeout(checkForNewConversation, 5000);

                            });


                        }

                    });

                }

            };

            //Start polling
            checkForNewConversation();
        }

    },

    //Paypal
    "paypal.com": {
        "run": function(){
            if(document.location.pathname.indexOf("/clickthru/") > -1){
                document.location = "/cgi-bin/webscr?cmd=_account";
            }
        }
    },

    //Reddit
    "reddit.com": {
        "run": function(){
            var css = [];
            css.push('.res-nightmode .RES-keyNav-activeElement, .res-nightmode .RES-keyNav-activeElement .usertext-body, .res-nightmode .RES-keyNav-activeElement .usertext-body .md, .res-nightmode .RES-keyNav-activeElement .usertext-body .md p, .res-nightmode .commentarea .RES-keyNav-activeElement .noncollapsed, .res-nightmode .RES-keyNav-activeElement .noncollapsed .md, .res-nightmode .RES-keyNav-activeElement .noncollapsed .md p {');
            css.push('');
            css.push('  background-color: #000 !important;');
            css.push('');
            css.push('}');
            css.push('');
            css.push('');
            appendStyle(css.join('\n'));
        }
    },

    //Stackexchange
    "security.stackexchange.com": {"hide": ["#overlay-header"]},
    "serverfault.com": {"hide": ["#overlay-header"]},
    "stackexchange.com": {"hide": ["#overlay-header"]},
    "stackoverflow.com": {"hide": ["#overlay-header"]},

    //Tumblr
    "tumblr.com": {
        "hide": ["#tumblr_teaser_follow"]
    },

    //Upworthy
    "upworthy.com": {
        "hide": ["#slider", ".modal", ".modal-backdrop"]
    },

    //Washington Post
    "washingtonpost.com": {
        "hide": ["#single-next-article"]
    },

    //Wired
    "wired.com": {
        "hide": ["#post_nav"]
    },

    //Workflowy
    "workflowy.com": {
        "hide": ["#proPitchBottomRight", "#bottomLinks"]
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



