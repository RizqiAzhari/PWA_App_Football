var dbPromised = idb.open("list-klub", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

function bookmarkTerkini(teams) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            //console.log(teams);
            store.add(teams);
            return tx.complete;
        })
        .then(function () {
            console.log("Klub berhasil di bookmark.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function deleteById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.
            then(function (db) {
                var tx = db.transaction('teams', 'readwrite');
                var store = tx.objectStore('teams');
                store.delete(id);
                return tx.complete;
            }).then(function () {
                console.log('Club deleted');
            });
    });
}