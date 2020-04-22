// https://developers.google.com/web/ilt/pwa/working-with-indexeddb
import * as idb from 'idb';
import { IDBPDatabase } from 'idb';

async function test() {
  let db: IDBPDatabase = await idb.openDB('settings', 1)
  db.close()
}

test()