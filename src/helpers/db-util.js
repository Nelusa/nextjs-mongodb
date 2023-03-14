import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort) //nový komentář bude první v poli (bude se tedy zobrazovat nahoře)
    .toArray(); //takto získáme všechny komentáře jako pole, přičemž používáme sort pro seřazení komentářů

  return documents;
}
