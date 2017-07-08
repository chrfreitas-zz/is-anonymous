

class Browser {
    static isAnonymous(){

        // Chrome
        if (isChrome()) {

            var fs = window.RequestFileSystem || window.webkitRequestFileSystem;

            fs(window.TEMPORARY, 100, function() {
                    return false;
                },
                function() {
                    return true;
                });
        }

        // Firefox
        if (isFirefox()) {

            var db;

            try {
                db = window.indexedDB.open('test');
            } catch (e) {
                return true;
            }

            if (db.readyState === 'done') {
                return (!db.result);
            }

            return false;

        }

        // IE
        if (isIE() || isEdge()) {

            try {
                if (!window.indexedDB) {
                    return true;
                }
            } catch (e) {
                return true;
            }

            return false;

        }

        // Safari
        if (isSafari()) {

            try {
                window.localStorage.setItem('test', true);
            } catch (e) {
                return true;
            }

            return false;

        }

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

//export default Browser;
