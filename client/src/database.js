// https://developers.google.com/web/ilt/pwa/working-with-indexeddb
import * as idb from 'idb';
async function test() {
    let db1 = await idb.openDB('settings', 1);
    db1.close();
}
test();
//# sourceMappingURL=database.js.map