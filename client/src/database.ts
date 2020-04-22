// https://developers.google.com/web/ilt/pwa/working-with-indexeddb
import * as idb from 'idb';
import { IDBPDatabase } from 'idb';

async function test() {
  let db1: IDBPDatabase = await idb.openDB('settings', 1)
  db1.close()
}

test()