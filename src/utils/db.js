const fs = require('fs');
const path = require('path');
const { Query } = require('mingo');

const COLLECTIONS_DIR = path.join(process.cwd(), 'db_collections');


function getFilePath(collectionName) {
  return path.join(COLLECTIONS_DIR, `${collectionName}.json`);
}

function loadCollection(collectionName) {
  const filePath = getFilePath(collectionName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveCollection(collectionName, data) {
  const filePath = getFilePath(collectionName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// --- Public API ---

function insert(collectionName, item) {
  const collection = loadCollection(collectionName);
  item.id = Date.now(); // simple unique ID
  collection.push(item);
  saveCollection(collectionName, collection);
  console.log(`[insert] Added to ${collectionName}:`, item);
}

function update(collectionName, query, update) {
  const collection = loadCollection(collectionName);
  const q = new Query(query);
  let updated = false;

  const updatedCollection = collection.map(item => {
    if (q.test(item)) {
      updated = true;
      return { ...item, ...update };
    }
    return item;
  });

  if (updated) {
    saveCollection(collectionName, updatedCollection);
    console.log(`[update] Updated ${collectionName} matching`, query);
  } else {
    console.log(`[update] No match in ${collectionName}`);
  }
}

function remove(collectionName, query) {
  const collection = loadCollection(collectionName);
  const q = new Query(query);
  const filtered = collection.filter(item => !q.test(item));

  if (filtered.length !== collection.length) {
    saveCollection(collectionName, filtered);
    console.log(`[delete] Removed item(s) from ${collectionName}`);
  } else {
    console.log(`[delete] No match to remove in ${collectionName}`);
  }
}

function find(collectionName, query) {
  const collection = loadCollection(collectionName);
  const q = new Query(query);
  return q.find(collection).all();
}


module.exports = {
  insert,
  update,
  remove,
  find
};
