import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;
const MONGODB_DB = process.env.NEXT_PUBLIC_MONGODB_URI!;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongo() {
  if (client && db) {
    return {
      client: client,
      db: db,
    };
  }

  const mongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };

  client = new MongoClient(MONGODB_URI, mongoClientOptions);
  await client.connect();
  db = client.db(MONGODB_DB);

  // Mongodb Collections
  const CAnswer = db.collection('answer');
  const CQuiz = db.collection('quiz');
  const CUsers = db.collection('users');

  return {
    client,
    db,
    // Export collections
    CAnswer,
    CQuiz,
    CUsers,
  };
}
