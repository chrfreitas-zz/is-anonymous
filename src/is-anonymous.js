(function() {

    class Browser {
        static isAnonymous(){

            return new Promise(function(resolve, reject){

                // Chrome
                if (isChrome()) {

                    var fs = window.RequestFileSystem || window.webkitRequestFileSystem;

                    fs(window.TEMPORARY, 100, function() {
                            resolve(false);
                        },
                        function() {
                            resolve(true);
                        });
                }

                // Firefox
                if (isFirefox()) {

                    var db;

                    try {
                        db = window.indexedDB.open('test');
                    } catch (e) {
                        resolve(true);
                    }

                    if (db.readyState === 'done') {
                        resolve(!db.result);
                    }

                    resolve(false);

                }

                // IE
                if (isIE() || isEdge()) {

                    try {
                        if (!window.indexedDB) {
                            resolve(true);
                        }
                    } catch (e) {
                        resolve(true);
                    }

                    resolve(false);

                }

                // Safari
                if (isSafari()) {

                    try {
                        window.localStorage.setItem('test', true);
                    } catch (e) {
                        resolve(true);
                    }

                    resolve(false);

                }

            });

        }
    }

    //https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    function isOpera() {
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    }

    function isFirefox() {
        return (typeof InstallTrigger !== 'undefined');
    }

    function isSafari() {
        return (/constructor/i.test(window.HTMLElement)) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    }

    function isIE() {
        return (false || (!!document.documentMode));
    }

    function isEdge() {
        return (!isIE && !!window.StyleMedia);
    }

    function isChrome() {
        return (!!window.chrome && !!window.chrome.webstore);
    }

    Browser.isAnonymous().then(function(response){
        console.log(response);
    });
})();
