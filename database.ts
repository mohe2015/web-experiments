// https://developers.google.com/web/ilt/pwa/working-with-indexeddb
import { openDB, deleteDB, wrap, unwrap } from 'idb';

async function setupDatabase() {
  const db = await openDB('settings', 1)
}

setupDatabase()
