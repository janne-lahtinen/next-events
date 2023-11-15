import { MongoClient } from "mongodb"

export async function connectDatabase() {
  const mongoLoginName = process.env.MONGO_LOGIN_NAME
  const mongoPassWord = process.env.MONGO_PASSWORD
  const urlEnd = process.env.MONGO_URL_END

  const client = await MongoClient.connect(
    `mongodb+srv://${mongoLoginName}:${mongoPassWord}@cluster${urlEnd}`
  )
  return client
}

export async function insertDocument(client, collection, document) {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db()
  const documents = await db.collection(collection).find(filter).sort(sort).toArray()
  return documents
}