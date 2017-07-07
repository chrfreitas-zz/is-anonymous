(function(){

    var $q    = $injector.get('$q');
    var defer = $q.defer();

    // Chrome
    if (this.chrome()) {

        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;

        fs(window.TEMPORARY, 100, function() {
                defer.resolve(false);
            },
            function() {
                defer.resolve(true);
            });
    }

    // Firefox
    if (this.firefox()) {

        var db;

        try {
            db = window.indexedDB.open('test');
        } catch (e) {
            defer.resolve(true);
        }

        if (db.readyState === 'done') {
            defer.resolve(!db.result);
        }

        defer.resolve(false);

    }

    // IE
    if (this.ie() || this.edge()) {

        try {
            if (!window.indexedDB) {
                defer.resolve(true);
            }
        } catch (e) {
            defer.resolve(true);
        }

        defer.resolve(false);

    }

    // Safari
    if (this.safari()) {

        try {
            window.localStorage.setItem('test', true);
        } catch (e) {
            defer.resolve(true);
        }

        defer.resolve(false);

    }

    return defer.promise;

})()
