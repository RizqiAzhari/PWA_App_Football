let dbPromised = idb.open("list-klub", 1, (upgradeDb) => {
    let articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

const bookmarkTerkini = (teams) => {
    dbPromised
        .then( (db) => {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            //console.log(teams);
            store.put(teams);
            return tx.complete;
        })
        .then( () => {
            console.log("Klub berhasil di bookmark");
        });
}

const getAll = () => {
    return new Promise( (resolve, reject) => {
        dbPromised
            .then( (db) => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then( (teams) => {
                resolve(teams);
            })
            .catch( (error) => {
                reject(error);
            });
    });
}

const getById = (id) => {
    return new Promise( (resolve, reject) => {
        dbPromised
            .then( (db) => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            })
            .then( (teams) => {
                resolve(teams);
            });
    });
}

const deleteById = (teams) => {
    return new Promise( (resolve, reject) => {
        dbPromised.
            then( (db) => {
                let tx = db.transaction('teams', 'readwrite');
                let store = tx.objectStore('teams');
                //console.log(teams);
                store.delete(teams.id);
                return tx.complete;
                //return tx.store.delete(id);
            }).then( () => {
                console.log('Klub dihapus');
            });
    });
}